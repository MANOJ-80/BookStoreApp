const express = require('express');
require('dotenv').config()
const app = express();
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
}


// swy8dlfb5kKyr4wN

main()
    .then(() => console.log("mongoDB connected successfully!"))
    .catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});