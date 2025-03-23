const express = require('express');
const Routine = require('../models/Routine');
const router = express.Router();

// Create a new routine
router.post('/', async (req, res) => {
    const { name, actions, user, schedule } = req.body;
    const newRoutine = new Routine({ name, actions, user, schedule });

    try {
        await newRoutine.save();
        res.status(201).json(newRoutine);
    } catch (error) {
        res.status(400).json({ error: 'Routine creation failed' });
    }
});

// Get all routines for a user
router.get('/:userId', async (req, res) => {
    try {
        const routines = await Routine.find({ user: req.params.userId });
        res.json(routines);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve routines' });
    }
});

// Update a routine
router.put('/:id', async (req, res) => {
    try {
        const updatedRoutine = await Routine.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedRoutine);
    } catch (error) {
        res.status(400).json({ error: 'Routine update failed' });
    }
});

// Delete a routine
router.delete('/:id', async (req, res) => {
    try {
        await Routine.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: 'Routine deletion failed' });
    }
});

module.exports = router;
