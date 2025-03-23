const Device = require('./models/Device');
const cron = require('node-cron');

// Function to track energy usage
const trackEnergyUsage = async (deviceId, usageTime) => {
    try {
        const device = await Device.findById(deviceId);
        if (device) {
            // Simulate energy usage tracking logic
            device.settings.usageTime = (device.settings.usageTime || 0) + usageTime;
            await device.save();
        }
    } catch (error) {
        console.error('Error tracking energy usage:', error);
    }
};

// Function to check for device malfunctions
const checkDeviceMalfunctions = async () => {
    console.log('Checking for device malfunctions...');
    const devices = await Device.find();
    devices.forEach(device => {
        // Simulate malfunction detection logic
        if (device.status === 'On' && device.settings.usageTime > 24) {
            console.log(`Alert: Device ${device.name} has been on for more than 24 hours.`);
            // Here you could implement further alerting logic, e.g., sending notifications
        }
    });
};

// Schedule the malfunction check to run every hour
cron.schedule('0 * * * *', async () => {
    console.log('Checking for device malfunctions...');
    await checkDeviceMalfunctions();
});

module.exports = { trackEnergyUsage, checkDeviceMalfunctions };
