const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/smart_home', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const authRoutes = require('./routes/auth');
const deviceRoutes = require('./routes/device');
const routineRoutes = require('./routes/routine');



// Authentication routes
app.use('/api/auth', authRoutes);

app.use('/api/devices', deviceRoutes);

app.use('/api/routines', routineRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Smart Home Management API');
});




// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
