const {body} = require("express-validator")

const userCreateValidation = () => {
    return [
        body("name")
            .isString()
            .withMessage("Name is required.")
            .isLength({ min: 3 })
            .withMessage("Name must have at least 3 characters"),
        body("email")
            .isString()
            .withMessage("Email is required.")
            .isEmail()
            .withMessage("Insert an valid email."),
        body("password")
            .isString()
            .withMessage("Password is required.")
            .isLength({ min:5 })
            .withMessage("Password must have as least 5 characters."),
        body("confirmPassword")
            .isString()
            .withMessage("Password confirmation is required.")
            .custom((value, {req}) => {
                if(value != req.body.password) {
                    throw new Error("Passwords doesn't match.");
                }
                return true;
            }),
    ]
};

const loginValidation = () => {
    return [
        body("email")
            .isString()
            .withMessage("Email is required.")
            .isEmail()
            .withMessage("Insert an valid email."),
        body("password")
            .isString()
            .withMessage("Password is required.")
    ]
};

const userUpdateValidation = () => {
    return [
        body("name")
            .optional()
            .isLength({min:3})
            .withMessage("Name must have at least 3 characters."),
        body("password")
            .optional()
            .isLength({min: 5})
            .withMessage("Password must have at least 5 characters."),
    ]
}

module.exports = {
    userCreateValidation,
    loginValidation,
    userUpdateValidation,
}