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

const LoginRegister = mongoose.model('Login', LoginRegisterSchema);

module.exports = LoginRegister;