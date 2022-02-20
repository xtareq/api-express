
const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_KEY || "ilovetocodingandcreatingcontents"


function authenticate(req, res, next){

    try {
        const token = req.headers.authorization.split(" ")[1]
        const payload = jwt.verify(token,secretKey)
        req.userId = payload.user
        next()
    } catch (error) {
        return res.status(401).json({
            message:"Unauthorized!"
        })
    }

}

module.exports = {authenticate}