'use strict';


const express = require('express');

const PORT = process.env.PORT || 3333;

const app = express();

const FLOWER_LIST = {
    flower1: {
        name: 'rose',
        color: 'blanc',
        price: 3.5
    },
    flower2: {
        name: 'coquelicot',
        color: 'rouge',
        price: 2.5
    },
    flower3: {
        name: 'lilas',
        color: 'violet',
        price: 4.5
    }
};

app.get('/test', (req, res) => {
    res.json({message: 'hello world'})
});

app.get('/flowerlist', (req, res) => {
    res.json(FLOWER_LIST)
});

app.get('/orderhistory', (req, res) => {
    res.json({message: 'you haven\'t placed any order yet'})
});

app.get('/cart', (req, res) => {
    res.json({message: 'your cart is empty'})
});

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
});
