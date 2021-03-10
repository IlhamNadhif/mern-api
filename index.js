const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const multer = require('multer')
const path = require('path')

const app = express()
const authRoutes = require('./src/routes/auth')
const blogRoutes = require('./src/routes/blog')
const port = 8002

mongoose.connect('mongodb://localhost/mern-blog', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/v1/auth', authRoutes);
app.use('/v1/blog', blogRoutes);

app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
        message: message,
        data: data
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})