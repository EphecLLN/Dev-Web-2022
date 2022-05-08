const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

const users = require('./routes/user');
const products = require('./routes/product');

const PORT = process.env.PORT || 3001;
const corsOptions = {
    origin: "http://localhost:3001"
}
const app = express();
app.use(cors(corsOptions));

//permet le parsing de data du type json
app.use(express.json());

//permet le parsing d'url de type x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

/* API */

// CALL API INDEX
app.get("/", (req, res)=>{
    res.json({ message: "Hi! This is the API!" });
});

app.use('/users', users);
app.use('/products', products);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});