const db = require("../db/queries");
const {matchedData, validationResult, body} = require("express-validator");

exports.usersListGet = async (req, res)=> {
    const users = await db.getUsers();

    res.render("index", {
        title: "Users List",
        users,
    });
};

exports.usersCreateGet = (req, res) => {

    res.render("createUser", {
        title: "Create User",
    });
};

exports.usersSearchGet = async (req, res) => {
    const {search_query} = req.query;

    const users = await db.searchUsers(search_query);

    res.render("search", {
        title: "Search Results",
        users,
        search_query,
    })

}


const validateUser = [
  body("firstName").notEmpty().trim()
    .isAlpha().withMessage(`First name should contain only letters`)
    .isLength({ min: 1, max: 10 }).withMessage(`First name must be between 1 and 10 characters`),
  body("lastName").notEmpty().trim()
    .isAlpha().withMessage(`Last name should contain only letters`)
    .isLength({ min: 1, max: 10 }).withMessage(`Last name must be between 1 and 10 characters`),
    body("email").notEmpty().trim()
    .notEmpty().withMessage('please provide mail address')
    .isEmail().withMessage('please provide valid mail address'),
    body("age").trim()
    .optional({checkFalsy: true})
    .isInt({min:18, max:120}).withMessage('must be 18+'),
    body('bio')
    .optional({checkFalsy: true})
    .isLength({max:200}).withMessage("Bio can't exceed 200 characters"),
];

exports.usersCreatePost = [
    validateUser,
    async (req, res) => {
        const errors= validationResult(req);
        
        if(!errors.isEmpty()) {
            return res.render("createUser",{
                title: "Create User",
                errors: errors.array(),
            });
        }

        const {firstName, lastName, email, age, bio} = matchedData(req);

        await db.addUser({firstName, lastName, email, age, bio});
        res.redirect("/");
    },
];

exports.usersUpdateGet = async(req, res) => {
    const userId = req.params.id;
    const user = await db.getUserById(userId);

    if(!user){
        return res.status(404).send("User not found");
    }

    res.render("updateUser", {
        title: "Update User",
        user,
    })


}

exports.usersUpdatePost = [
    validateUser,
    async (req,res) => {
        const errors= validationResult(req);
        
        if(!errors.isEmpty()) {
            return res.render("updateUser",{
                title: "Update User",
                errors: errors.array(),
            });
        }

        const {firstName, lastName, email, age, bio} = matchedData(req);

        await db.updateUser(req.params.id, {firstName, lastName, email, age, bio});

        res.redirect("/");

    }
];

exports.usersDeletePost = async (req, res) => {
    const userId = req.params.id; 

    if(!userId){
        return res.status(404).send("User not found");
    }

    await db.deleteUser(userId);
    res.redirect("/");
}