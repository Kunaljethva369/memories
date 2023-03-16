// const Memories = require('../Schema/Schema');
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
            password
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

// const getRecipesControl = async (req, res) => {
//     Memories.find((err, docs) => {
//         if (!err) {
//             res.send(docs);
//         } else {
//             console.log('Failed to retrieve the Course List: ' + err);
//         }
//     });
// }

// const addRecipecontrol = async (req, res) => {
//     res.setHeader('Content-Type', 'application/json');
//     const memories = new Memories({
//         id: req.body.id,
//         title: req.body.title,
//         subTitle: req.body.subTitle,
//         message: req.body.message,
//         image: req.body.image
//     });
//     const memoriesData = await memories.save();
//     if (memoriesData) {
//         res.status(200).send({ message: "Recipe is Stored" });
//     }
//     else {
//         res.status(401).send({ message: "Error Occoured" });
//     }
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

module.exports = { RegisterUser }