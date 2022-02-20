const db = require("../models")


const todoController = {}


todoController.delete = async (req, res) => {
    try {
        await db.todo.destroy({
            where:{
                userId: req.userId,
                id: req.params.id 
            }
        })

        return res.status(201).json({
            message:'Deleted successfully'
        })
    } catch (error) {
        
        return res.status(500).json({
            message:"Something going wrong!"
        })
    }
}


todoController.update = async (req, res) => {
    try {
        const body = req.body
        await db.todo.update({...body,userId:req.userId},{
            where:{
                userId: req.userId,
                id: req.params.id 
            }
        })

        return res.status(201).json({
            message:'Updated successfully'
        })
    } catch (error) {
        
        return res.status(500).json({
            message:"Something going wrong!"
        })
    }
}

todoController.create = async (req, res) => {
    try {
        const body = req.body
        const newTodo = await db.todo.create({...body,userId:req.userId})

        return res.status(201).json({
            message:"Todo Created successfully",
            todo: newTodo
        })
    } catch (error) {
        
        return res.status(500).json({
            message:"Something going wrong!"
        })
    }
}

todoController.getOne = async (req, res) => {
    try {
        const todo = await db.todo.findByPk(req.params.id)
        if(!todo){
            return res.status(404).json({
                message: "Todo not found!"
            })
        }
        return res.json({
            data:todo
        })
    } catch (error) {
        
        return res.status(500).json({
            message:"Something going wrong!"
        })
    }
}

todoController.getAll = async (req, res) => {
    try {
        const todos = await db.todo.findAll({
            where:{
                userId: req.userId
            }
        })

        return res.json({
            data:todos
        })
    } catch (error) {
        
        return res.status(500).json({
            message:"Something going wrong!"
        })
    }
}






module.exports = todoController