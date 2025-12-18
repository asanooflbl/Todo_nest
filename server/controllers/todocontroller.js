import Todo from "../models/Todo.js";

export const createTodo = async(req,res)=>{
    try {
        const{title,description,status} = req.body;
        if(!title){
            return res.status(400).json({success:false, message:"Missing Title"})
        }
        const todo = await Todo.create({title,description,status})
        res.status(201).json({success:true,message:"Todo created Successfully",todo})
        
    } catch (error) {
        res.status(500).json({success:false,message:error.message})
        
    }
}


export const getTodo = async(req,res)=>{
    try {
        const page = Number(req.query.page) || 1
        const limit = 10
        const skip = (page - 1) * limit
        const totalCount = await Todo.countDocuments()
        const todos = await Todo.find()
        .skip(skip)
        .limit(limit)
        .sort({createdAt:-1})
        const totalPages = Math.ceil(totalCount/limit)
        const currentPage  = page
        res.status(200).json({success:true, message:"Todo fetched sucessfully",todos,currentPage,totalPages,totalCount})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
        
    }
}


export const updateTodo = async(req,res)=>{
    try {
        const {id} = req.params;
        const{title,description,status} = req.body
        if(!id){
            return res.status(400).json({success:false,message:"Missing Todo Id"})
        }
        const todo = await Todo.findById(id)
        if(!todo){
            return res.status(404).json({success:false,message:"Todo Not Found "}) 
        }

        if(title !== undefined)todo.title = title
        if(description !== undefined)todo.description = description
        if(status!== undefined)todo.status = status

        await todo.save()
        res.status(200).json({success:true,message:"Todo Updatesd successfully",todo})
    } catch (error) {
           res.status(500).json({success:false, message:error.message})
    }
}


export const deleteTodo = async(req,res)=>{
    try {
        const{id} =req.params;
        if(!id){
             return res.status(400).json({success:false,message:"Missing Todo Id"})   
        }
        const todo = await Todo.findById(id)
        if(!todo){ 
            return res.status(404).json({success:false,message:"Todo Not Found "}) 
        }
        await todo.deleteOne()
        res.status(200).json({success:true,message:"Todo deleted"})
    } catch (error) {
        res.status(500).json({success:false, message:error.message}) 
    }
}