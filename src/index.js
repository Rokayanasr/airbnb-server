const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config();
const app = express()
const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10);

const User = require('./models/User');

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ['http://localhost:5174','http://localhost:5173']
}))

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
    res.json('test ok');
    console.log('it works');
})

app.post('/register', async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const user = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, salt)
        });
        res.json(user)
        console.log(req.body);
    } catch (error) {
        res.status(422).json(error)
    }
});

app.listen(3300 , () => {
    console.log('app listens on port 3300');
})