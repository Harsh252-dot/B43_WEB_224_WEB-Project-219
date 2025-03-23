const express = require('express');
const Device = require('../models/Device');
const router = express.Router();
const { trackEnergyUsage } = require('../energyTracking');

// Create a new device
router.post('/', async (req, res) => {
    const { name, type, user, usageTime } = req.body;
    const newDevice = new Device({ name, type, user });

    try {
        await newDevice.save();
        // Track energy usage
        await trackEnergyUsage(newDevice._id, usageTime);
        res.status(201).json(newDevice);
    } catch (error) {
        res.status(400).json({ error: 'Device creation failed' });
    }
});

// Get all devices for a user
router.get('/:userId', async (req, res) => {
    try {
        const devices = await Device.find({ user: req.params.userId });
        res.json(devices);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve devices' });
    }
});

// Update a device
router.put('/:id', async (req, res) => {
    const { usageTime } = req.body;
    try {
        const updatedDevice = await Device.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        // Track energy usage
        await trackEnergyUsage(updatedDevice._id, usageTime);
        res.json(updatedDevice);
    } catch (error) {
        res.status(400).json({ error: 'Device update failed' });
    }
});

// Delete a device
router.delete('/:id', async (req, res) => {
    try {
        await Device.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: 'Device deletion failed' });
    }
});

module.exports = router;
