const express = require('express');
const router = express.Router();
const { randomRecipes, getRecipesControl, addRecipecontrol, deleteRecipecontrol, RegisterUser, LoginUser, editRecipe } = require('../Controllers/getMemoriesControl');

router.route('/randonrecipes').get(randomRecipes);
router.route('/regsiterUser').post(RegisterUser);
router.route('/loginUser').post(LoginUser);
router.route('/getRecipes').post(getRecipesControl);
router.route('/addRecipe').post(addRecipecontrol);
router.route('/deleterecpie').delete(deleteRecipecontrol);
router.route('/edit').put(editRecipe);

module.exports = router;