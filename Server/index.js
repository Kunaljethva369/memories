const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const all_router = require('./Routes/getRecipe');
const PORT = process.env.PORT || 3001;
const url = `mongodb+srv://root:root@cluster0.vpd5igb.mongodb.net/?retryWrites=true&w=majority`;

const app = express();

app.use(
    cors({
        origin: "*",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

app.use(bodyParser.json({ limit: '150mb' }));

app.use(bodyParser.urlencoded({
    limit: '150mb',
    extended: true
}));

app.use('/recipe', all_router);

mongoose.connect(url, (err, db) => {
    if (err) throw err;
    console.log("DB IS CONNECTED");
});

app.listen(PORT, () => { console.log(`App is Lisiting on PORT ${PORT}`) });
