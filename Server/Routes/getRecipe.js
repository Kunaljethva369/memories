const express = require('express');
const router = express.Router();
const { RegisterUser } = require('../Controllers/getMemoriesControl');

router.route('/registerUser').post(RegisterUser);
// router.route('/getrecipes').get(getRecipesControl);
// router.route('/addrecpie').post(addRecipecontrol);
// router.route('/deleterecpie/:id').delete(deleteRecipecontrol);

module.exports = router;