const express = require('express');
const router = express.Router();
const { getRecipesControl, addRecipecontrol, deleteRecipecontrol, loginUser } = require('../Controllers/getMemoriesControl');

router.route('/login').post(loginUser);
router.route('/getrecipes').get(getRecipesControl);
router.route('/addrecpie').post(addRecipecontrol);
router.route('/deleterecpie/:id').delete(deleteRecipecontrol);

module.exports = router;