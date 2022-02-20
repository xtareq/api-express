const db = require("../models")

const {makeHash, checkHash} = require('ex-helpers')
const jwt = require('jsonwebtoken')
const secretKey = process.env.JWT_KEY || "ilovetocodingandcreatingcontents"


const authController = {}

authController.login = async (req, res) => {

    try {
        const body = req.body

        //validate our fields
        if(!body.username || body.username == ""){
            return res.status(400).json({
                message:"Username is required!"
            })
        } 
        if(!body.password || body.password == ""){
            return res.status(400).json({
                message:"password is required!"
            })
        } 

        // check if the username already exist

        const oldUser = await db.user.findOne({
            where:{
                username:body.username
            }
        })

        if(!oldUser){
            return res.status(404).json({
                message:"User not found!"
            })
        }

        if(!checkHash(body.password, oldUser.password)){
            return res.status(401).json({
                message:"Incorrect password!"
            })
        }

        const token = jwt.sign({user:oldUser.id},secretKey,{expiresIn:3600})

        // now do the login and generate our jwt token
        return res.json({
            message:'Login successfully!',
            token
        })
    } catch (error) {
        return res.status(500).send(error)
    }
}

authController.register = async (req, res) => {

    try {
        const body = req.body

        //validate our fields
        if(!body.username || body.username == ""){
            return res.status(400).json({
                message:"Username is required!"
            })
        } 
        if(!body.password || body.password == ""){
            return res.status(400).json({
                message:"password is required!"
            })
        } 
        if(!body.name || body.name == ""){
            return res.status(400).json({
                message:"Name is required!"
            })
        } 

        // check if the username already exist

        const oldUser = await db.user.findOne({
            where:{
                username:body.username
            }
        })

        if(oldUser){
            return res.status(400).json({
                message:"Username already exist!"
            })
        }

        // we need to hash the password before it goes to db
        // let's install ex-helpers package to deal with it

        const newUser = await db.user.create({
            name:body.name,
            username:body.username,
            password: makeHash(body.password)
        })
        return res.status(201).send("User created successfully!")
    } catch (error) {
        return res.status(500).send(error)
    }
    
}

module.exports = authController