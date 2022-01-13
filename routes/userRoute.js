const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { check, validationResult } = require("express-validator");

router.post("/signUp", [
    check('username', 'This username must be 3+ characters long')
    .exists()
    .isLength({min: 3}),
    check('password', "This username must be 6+ characters long")
    .exists()
    .isLength({min: 6})

],userController.signUp);

router.post("/login", [
    check('username', 'This username must be 3+ characters long')
    .exists()
    .isLength({min: 3}),
    check('password', "This username must be 6+ characters long")
    .exists()
    .isLength({min: 6})

],userController.login);


module.exports = router;
