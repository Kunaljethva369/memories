const mongoose = require('mongoose');

const LoginRegisterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    recipes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }]
});


// const MemoriesShcema = new mongoose.Schema({
//     id: {
//         type: String,
//         required: true,
//     },
//     title: {
//         type: String,
//         required: true,
//     },
//     subTitle: {
//         type: String,
//         required: true,
//     },
//     message: {
//         type: String,
//         required: true,
//     },
//     image: {
//         type: String,
//         required: true,
//     }
// });

// const Memories = mongoose.model('Memories', MemoriesShcema);

const LoginRegister = mongoose.model('Login', LoginRegisterSchema);
// const Recipes = mongoose.model('Recipe', RecipesSchema);

// module.exports = Memories;
module.exports = LoginRegister;