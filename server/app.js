const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cookieparser = require('cookie-parser');
const cors = require('cors');
const app = express();
const connecttoDB = require('./db/db');
const venueRoutes = require('./routes/venueRoutes');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const authorRoutes = require('./routes/authorRoutes')
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes')
const setEnvVariables = require('./utils/awsSecrets');
app.use(cors({
    origin: (origin, callback) => {
        callback(null, true);
    },
    credentials: true, // Allow cookies and credentials
}));
require('events').EventEmitter.defaultMaxListeners = 100; // Set it to 100




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());
connecttoDB();
if (process.env.ENV == 'production') {
    setEnvVariables();
}
// const buildpath = path.join(_dirname, "../client/dist");
// app.use(express.static(buildpath));
// -----------------------------------------
const authMiddleware = require('./middleware/authMiddleware');
const Venue = require('./db/models/venueModel');

app.get('/', (req, res) => {
    res.json({ message: 'API is running' });
});

app.get('/venues', authMiddleware.authAdmin, async (req, res) => {
    try {
        const venues = await Venue.find();
        res.json({ venues });
    } catch (err) {
        res.status(500).json({ message: 'Server error while fetching venues' });
    }
});
// -----------------------------------------
// eventNames.apply(assert function authRoutes controller)


app.use('/venue', venueRoutes);
app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/author', authorRoutes);
app.use('/auth', authRoutes)
app.use('/order', orderRoutes);
module.exports = app;