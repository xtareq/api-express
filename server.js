
require('dotenv').config()
const express = require('express')
const authController = require('./controllers/auth.controller')
const todoController = require('./controllers/todo.controller')
const { authenticate } = require('./middlewares/authenticate')


const PORT = process.env.PORT || 8000
const app = express()
const {con} = require('./models')
app.use(express.json())

// Initialize Database 

try {
    con.authenticate()
    console.log("Database Connected!")

} catch (error) {
    throw new Error(error)
}






app.get("/", (req, res) => {
    res.send("Working as expected! Are you ready?")
})

// set up register routes
app.post('/register', authController.register)
app.post('/login', authController.login)


//setup todos route 

app.get('/todos/:id',authenticate,todoController.getOne)
app.get('/todos',authenticate,todoController.getAll)
app.post('/todos',authenticate,todoController.create)
app.put('/todos/:id',authenticate,todoController.update)
app.delete('/todos/:id',authenticate,todoController.delete)



app.listen(PORT, () => {
    console.log("App listening on PORT:"+PORT)
})