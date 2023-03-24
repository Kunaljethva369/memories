// const Memories = require('../Schema/Schema');
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

        // const salt = await bcrypt.genSalt(10);
        // user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}

const LoginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await LoginRegister.findOne({ email: email });
    console.log(email, password);
    if (user) {
        const match = password;
        if (match == user.password) {
            res.status(200).send({ message: "Login Success" });
        } else {
            console.log("password");
            res.status(201).send({ message: 'Invalid email or password' });
        }
    } else {
        res.status(201).send({ message: 'Invalid email or password' });
    }
}

const getRecipesControl = async (req, res) => {
    // Recipes.findOne({ email: req.body.email }, (err, user) => {
    //     if (err) {
    //         console.log('Error:', err);
    //     } else if (!user) {
    //         console.log('User not found');
    //     } else {
    //         const userData = user.recipes;
    //         console.log('User data:', userData);
    //         res.send(userData);
    //     }
    // });
    LoginRegister.findOne({ email: req.body.email })
        .populate('recipes')
        .exec((err, user) => {
            if (err) {
                console.log('Error:', err);
                res.status(500).send(err);
            } else if (!user) {
                console.log('User not found');
                res.status(404).send('User not found');
            } else {
                console.log("recipes inside");
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
                // const recipeData = 
                // console.log(LoginRegister);
                // .map((recipe) => {
                //     return {
                //         id: recipe.id,
                //         title: recipe.title,
                //         subTitle: recipe.subTitle,
                //         message: recipe.message,
                //         image: recipe.image,
                //     };
                // });
                // console.log('Recipe data:', recipeData);
                // res.send(recipeData);
            }
        });
}

const addRecipecontrol = async (req, res) => {
    const email = req.body.emailid;
    LoginRegister.findOne({ email: email }, (err, user) => {
        if (err) {
            console.log('Error:', err);
            // Handle the error appropriately (e.g. return an HTTP 500 error response)
        } else if (!user) {
            console.log('User not found Add');
            // Handle the error appropriately (e.g. return an HTTP 404 error response)
        } else {
            // Create a new recipe object
            // console.log("User");
            const newRecipe = new Recipes({
                id: req.body.id,
                email: req.body.emailid,
                title: req.body.title,
                subTitle: req.body.subTitle,
                message: req.body.message,
                image: req.body.image
            });

            // Add the new recipe object to the user's `recipes` array
            // user.recipes.push(newRecipe);

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

            // Save the updated user document to the database
            // user.save((err, updatedUser) => {
            //     if (err) {
            //         console.log('Error:', err);
            //         // Handle the error appropriately (e.g. return an HTTP 500 error response)
            //     } else {
            //         console.log('Recipe added successfully');
            //         // Handle the success appropriately (e.g. return an HTTP 200 success response)
            //     }
            // });
        }
    });
    // In
    // LoginRegister.findOne({ email: email })
    //     .populate('recipes')
    //     .exec((err, user) => {
    //         if (err) {
    //             console.log('Error:', err);
    //             res.status(500).send(err);
    //         } else if (!user) {
    //             console.log('User not found');
    //             res.status(404).send('User not found');
    //         } else {
    //             const recipeData = LoginRegister.recipes.map((recipe) => {
    //                 return {
    //                     id: recipe.id,
    //                     title: recipe.title,
    //                     subTitle: recipe.subTitle,
    //                     message: recipe.message,
    //                     image: recipe.image,
    //                 };
    //             });
    //             console.log('Recipe data:', recipeData);
    //             res.send(recipeData);
    //         }
    //     });
    // res.setHeader('Content-Type', 'application/json');
    // const newRecipes = new LoginRegister({
    //     recipes: {
    //         id: req.body.id,
    //         title: req.body.title,
    //         subTitle: req.body.subTitle,
    //         message: req.body.message,
    //         image: req.body.image
    //     }
    // });
    // const recipesData = await newRecipes.save();
    // if (recipesData) {
    //     res.status(200).send({ message: "Recipe is Stored" });
    // }
    // else {
    //     res.status(401).send({ message: "Error Occoured" });
    // }
}

const deleteRecipecontrol = async (req, res) => {
    const { recipeId, userEmail } = req.body;

    // First, find the user by email and populate the recipes array
    LoginRegister.findOne({ email: userEmail })
        .populate('recipes')
        .exec((err, user) => {
            if (err) {
                console.log('Error:', err);
                res.status(500).send(err);
            } else if (!user) {
                console.log('User not found');
                res.status(404).send('User not found');
            } else {
                // Find the recipe to be deleted in the user's recipes array
                const recipeToDelete = user.recipes.find(recipe => recipe.id === recipeId);
                if (!recipeToDelete) {
                    console.log('Recipe not found');
                    res.status(404).send('Recipe not found');
                } else {
                    // Remove the recipe from the user's recipes array
                    const updatedRecipes = user.recipes.filter(recipe => recipe.id !== recipeId);
                    user.recipes = updatedRecipes;

                    // Save the updated user document
                    user.save((err, updatedUser) => {
                        if (err) {
                            console.log('Error:', err);
                            res.status(500).send(err);
                        } else {
                            console.log('Recipe deleted successfully');
                            res.send('Recipe deleted successfully');
                        }
                    });

                    // Delete the recipe document from the Recipe collection
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
    // try {
    //     const id = req.params.id
    //     await .deleteOne({ id });
    //     res.status(200).send({ message: "Deleted Recipe" });
    // }
    // catch (err) {
    //     console.log(err);
    // }
}

const randomRecipes = (req, res) => {
    fs.readFile('randomRecipes.json', 'utf-8', (err, data) => {
        if (err) throw err;
        res.status(201).send({ "recipes": JSON.parse(data) });
    });
}

module.exports = { randomRecipes, getRecipesControl, addRecipecontrol, deleteRecipecontrol, RegisterUser, LoginUser }