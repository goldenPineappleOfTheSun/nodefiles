const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8080;

const app = express()
    .get('/', (req, res) => {
        res.send('hi');
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))