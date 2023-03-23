const express = require('express');
const router = express.Router();
const { getRecipesControl, addRecipecontrol, RegisterUser, LoginUser } = require('../Controllers/getMemoriesControl');

router.route('/regsiterUser').post(RegisterUser);
router.route('/loginUser').post(LoginUser);
router.route('/getRecipes').post(getRecipesControl);
router.route('/addRecipe').post(addRecipecontrol);
// router.route('/deleterecpie/:id').delete(deleteRecipecontrol);

module.exports = router;