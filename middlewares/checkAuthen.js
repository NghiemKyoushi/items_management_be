const UsersDB = require("../models/usersSchema");
const JWT = require("jsonwebtoken");


const checkAdminAuthority = (req, res, next) => {
    if (!req.cookies.token) {
        res.status(406).json({
            message: "cookies not included !"
        })
    } else {
        JWT.verify(req.cookies.token, process.env.JWT_SCECRET, async function (err, decoded) {
            if (err) {
                res.status(406).json({
                    message: "wrong token"
                })
            }
            const product = await UsersDB.findOne({ _id: decoded.sub })
            if (product && product.authority != "admin") {
                res.status(403).json({
                    message: "account not authorized"
                })
            } else if (product === null) {
                res.status(403).json({
                    message: "account not existed"
                })
            } else if (product && product.authority === "admin") {
                next();
            }

        })
    }
}

const checkCustomerAuthority = (req, res, next) => {
    if (!req.cookies.token) {
        res.status(406).json({
            message: "cookies not included !"
        })
    } else {
        JWT.verify(req.cookies.token, process.env.JWT_SCECRET, async function (err, decoded) {
            if (err) {
                res.status(406).json({
                    message: "wrong token"
                })
            }
            const user = await UsersDB.findOne({ _id: decoded.sub })
            if (user) {
                next();
            } else {
                res.status(403).json({
                    message: "account not authorized"
                })
            }
        })
    }
}


module.exports = checkAdminAuthority
module.exports = checkCustomerAuthority