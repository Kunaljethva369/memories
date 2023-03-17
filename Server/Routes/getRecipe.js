const express = require('express');
const router = express.Router();
const { getRecipesControl, RegisterUser, LoginUser } = require('../Controllers/getMemoriesControl');

router.route('/registerUser').post(RegisterUser);
router.route('/loginUser').post(LoginUser);
router.route('/getrecipes').post(getRecipesControl);
// router.route('/addrecpie').post(addRecipecontrol);
// router.route('/deleterecpie/:id').delete(deleteRecipecontrol);

module.exports = router;