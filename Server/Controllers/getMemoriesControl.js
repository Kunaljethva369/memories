// const Memories = require('../Schema/Schema');
const Recipes = require('../Schema/recipeSchema');
const LoginRegister = require('../Schema/Schema');

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
                // const recipeData = 
                console.log(LoginRegister.recipes);
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

// const addRecipecontrol = async (req, res) => {
//     const email = req.body;
//     LoginRegister.findOne({ email: email })
//         .populate('recipes')
//         .exec((err, user) => {
//             if (err) {
//                 console.log('Error:', err);
//                 res.status(500).send(err);
//             } else if (!user) {
//                 console.log('User not found');
//                 res.status(404).send('User not found');
//             } else {
//                 const recipeData = LoginRegister.recipes.map((recipe) => {
//                     return {
//                         id: recipe.id,
//                         title: recipe.title,
//                         subTitle: recipe.subTitle,
//                         message: recipe.message,
//                         image: recipe.image,
//                     };
//                 });
//                 console.log('Recipe data:', recipeData);
//                 res.send(recipeData);
//             }
//         });
//     // res.setHeader('Content-Type', 'application/json');
//     // const newRecipes = new LoginRegister({
//     //     recipes: {
//     //         id: req.body.id,
//     //         title: req.body.title,
//     //         subTitle: req.body.subTitle,
//     //         message: req.body.message,
//     //         image: req.body.image
//     //     }
//     // });
//     // const recipesData = await newRecipes.save();
//     // if (recipesData) {
//     //     res.status(200).send({ message: "Recipe is Stored" });
//     // }
//     // else {
//     //     res.status(401).send({ message: "Error Occoured" });
//     // }
// }

// const deleteRecipecontrol = async (req, res) => {
//     try {
//         const id = req.params.id
//         await Memories.deleteOne({ id });
//         res.status(200).send({ message: "Deleted Recipe" });
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

module.exports = { getRecipesControl, RegisterUser, LoginUser }