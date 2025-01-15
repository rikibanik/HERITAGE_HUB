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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieparser());
connecttoDB();
app.set('view engine', 'ejs');


app.get('/',(req,res)=>{
    res.render('admin');
});
app.get('/add-venue',(req,res)=>{
    res.render('index');
});

app.use('/venue',venueRoutes);
app.use('/admin',adminRoutes);
app.use('/user',userRoutes);
module.exports = app;