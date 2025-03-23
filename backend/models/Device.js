const mongoose = require('mongoose');

const DeviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, default: 'Off' },
    settings: { type: Object, default: {} },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Device', DeviceSchema);
