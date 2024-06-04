const express = require('express');
const app = express()

app.get('/test' , (req, res) => {
    res.json('test ok')
    console.log('it works')
})

app.listen(3000 , () => {
    console.log('app listens on port 3000');
})