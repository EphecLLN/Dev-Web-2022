'use strict';


const EXPRESS = require('express');
const APP = EXPRESS();

APP.get('/flowerlist', (req, res) => {
    res.send('flower list')
});

APP.get('/orderhistory', (req, res) => {
    res.send('order history')
});

APP.get('/cart', (req, res) => {
    res.send('your cart is empty')
});

APP.listen(8080, () => {
    console.log('listening')
});
