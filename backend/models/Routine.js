const mongoose = require('mongoose');

const RoutineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    actions: { type: Array, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    schedule: { type: Date, required: true }
});

module.exports = mongoose.model('Routine', RoutineSchema);
