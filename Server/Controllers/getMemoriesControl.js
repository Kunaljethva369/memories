const Recipes = require('../Schema/recipeSchema');
const LoginRegister = require('../Schema/Schema');
const fs = require('fs');

const RegisterUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await LoginRegister.findOne({ email });
        if (user) {
            return res.status(201).json({ message: 'User already exists' });
        }
        user = new LoginRegister({
            name,
            email,
            password,
        });

        await user.save();
        res.json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}

const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await LoginRegister.findOne({ email: email });
        if (user) {
            const match = password;
            if (match == user.password) {
                res.status(200).send({ message: "Login Success" });
            } else {
                res.status(201).send({ message: 'Invalid email or password' });
            }
        } else {
            res.status(201).send({ message: 'Invalid email or password' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}

const getRecipesControl = async (req, res) => {
    try {
        LoginRegister.findOne({ email: req.body.email })
            .populate('recipes')
            .exec((err, user) => {
                if (err) {
                    res.status(500).send(err);
                } else if (!user) {
                    res.status(404).send('User not found');
                } else {
                    const recipeData = user.recipes.map((recipe) => {
                        return {
                            id: recipe.id,
                            title: recipe.title,
                            subTitle: recipe.subTitle,
                            message: recipe.message,
                            image: recipe.image,
                        };
                    });
                    res.send(recipeData);
                }
            });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}

const addRecipecontrol = async (req, res) => {
    try {
        const email = req.body.emailid;
        LoginRegister.findOne({ email: email }, (err, user) => {
            if (err) {
                console.log('Error:', err);
            } else if (!user) {
                console.log('User not found Add');
            } else {
                const newRecipe = new Recipes({
                    id: req.body.id,
                    email: req.body.emailid,
                    title: req.body.title,
                    subTitle: req.body.subTitle,
                    message: req.body.message,
                    image: req.body.image
                });

                newRecipe.save((err, recipe) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('Error creating new recipe. Please try again.');
                    } else {
                        user.recipes.push(recipe._id);
                        user.save((err) => {
                            if (err) {
                                console.error(err);
                                res.status(500).send(err);
                            } else {
                                res.status(200).send({ message: "Recipe is Stored" });
                            }
                        });
                    }
                });
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}

const deleteRecipecontrol = async (req, res) => {
    try {
        const { recipeId, userEmail } = req.body;
        LoginRegister.findOne({ email: userEmail })
            .populate('recipes')
            .exec((err, user) => {
                if (err) {
                    res.status(500).send(err);
                } else if (!user) {
                    res.status(404).send('User not found');
                } else {
                    const recipeToDelete = user.recipes.find(recipe => recipe.id === recipeId);
                    if (!recipeToDelete) {
                        res.status(404).send('Recipe not found');
                    } else {
                        const updatedRecipes = user.recipes.filter(recipe => recipe.id !== recipeId);
                        user.recipes = updatedRecipes;
                        user.save((err, updatedUser) => {
                            if (err) {
                                res.status(500).send(err);
                            } else {
                                res.send('Recipe deleted successfully');
                            }
                        });
                        Recipes.deleteOne({ _id: recipeToDelete._id }, (err) => {
                            if (err) {
                                console.log('Error:', err);
                            } else {
                                console.log('Recipe document deleted successfully');
                            }
                        });
                    }
                }
            });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
}

const randomRecipes = (req, res) => {
    fs.readFile('randomRecipes.json', 'utf-8', (err, data) => {
        if (err) throw err;
        res.status(201).send({ "recipes": JSON.parse(data) });
    });
}

const editRecipe = async (req, res) => {
    try {
        const id = req.body.id;
        const data = await Recipes.findOne({ id: id });
        data.id = req.body.id;
        data.email = req.body.emailid;
        data.title = req.body.title;
        data.subTitle = req.body.subTitle;
        data.message = req.body.message;
        data.image = req.body.image;
        await data.save();
        res.status(200).send({ message: 'Data updated successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
}

module.exports = { randomRecipes, getRecipesControl, addRecipecontrol, deleteRecipecontrol, RegisterUser, LoginUser, editRecipe }