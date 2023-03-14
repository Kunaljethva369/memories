const Memories = require('../Schema/Schema');

const loginUser = async (req, res) => {

}

const getRecipesControl = async (req, res) => {
    Memories.find((err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    });
}

const addRecipecontrol = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const memories = new Memories({
        id: req.body.id,
        title: req.body.title,
        subTitle: req.body.subTitle,
        message: req.body.message,
        image: req.body.image
    });
    const memoriesData = await memories.save();
    if (memoriesData) {
        res.status(200).send({ message: "Recipe is Stored" });
    }
    else {
        res.status(401).send({ message: "Error Occoured" });
    }
}

const deleteRecipecontrol = async (req, res) => {
    try {
        const id = req.params.id
        await Memories.deleteOne({ id });
        res.status(200).send({ message: "Deleted Recipe" });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = { getRecipesControl, addRecipecontrol, deleteRecipecontrol, loginUser }