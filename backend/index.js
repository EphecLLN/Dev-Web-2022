const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get('/', (req, res) => {
    res.json({ message: "Home Page" });
});

app.get("/api", (req, res)=>{
    res.json({ message: "Hi! This is the server!" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});