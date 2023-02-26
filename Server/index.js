const express = require('express');
const mongoose = require('mongoose');
const Memories = require('./Schema');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const url = `mongodb+srv://root:root@cluster0.vpd5igb.mongodb.net/?retryWrites=true&w=majority`
const app = express();
app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

mongoose.connect(url, (err, db) => {
    if (err) throw err;
    console.log("DB IS CONNECTED");
});


app.get('/getMemories', function (req, res, next) {
    Memories.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    })
});

app.post('/memories', async (req, res) => {
    try {
        const { title, subTitle, message, image } = req.body;
        const memories = new Memories({ title, subTitle, message, image });
        const memoriesData = await memories.save();
        if (memoriesData) {
            res.status(200).send("Memories Stored");
        }
        else {
            res.status(422).send("Memories Fade Away");
        }
    }
    catch (err) {
        console.log(err);
    }
});

app.listen(PORT, () => { `App is Lisiting on PORT ${PORT}` });