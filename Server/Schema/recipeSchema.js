const mongoose = require('mongoose');

const RecipesSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
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

const Recipes = mongoose.model('Recipe', RecipesSchema);

module.exports = Recipes;