const express = require('express');
const mongoose = require('mongoose');
const Memories = require('./Schema');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;
const url = `mongodb+srv://root:root@cluster0.vpd5igb.mongodb.net/?retryWrites=true&w=majority`;

const app = express();

app.use(
    cors({
        origin: "https://incomparable-nougat-89f78a.netlify.app/",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

app.use(bodyParser.json({ limit: '150mb' }));

app.use(bodyParser.urlencoded({
    limit: '150mb',
    extended: true
}));

mongoose.connect(url, (err, db) => {
    if (err) throw err;
    console.log("DB IS CONNECTED");
});

app.get('/getMemories', (req, res) => {
    Memories.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    });
});

app.post("/memories", async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const memories = new Memories({
        id: req.body.id,
        title: req.body.title,
        subTitle: req.body.subTitle,
        message: req.body.message,
        image: req.body.image
    });
    const memoriesData = await memories.save();
    if (memoriesData) {
        res.status(200).send({ message: "Memories Stored" });
    }
    else {
        res.status(401).send({ message: "Error Occoured" });
    }
});

app.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id
        await Memories.deleteOne({ id });
        res.status(200).send({ message: "Deleted Memories" });
    }
    catch (err) {
        console.log(err);
    }
});

app.listen(PORT, () => { console.log(`App is Lisiting on PORT ${PORT}`) });