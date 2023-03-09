const mongoose = require('mongoose');

const MemoriesShcema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subTitle: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    }
});

const Memories = mongoose.model('Memories', MemoriesShcema);

module.exports = Memories;