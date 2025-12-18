import mongoose from "mongoose";

const Todoschema = new mongoose.Schema({
    title : {type : String,required: true},
    description : {type : String},
    status : {type : String, enum : ["pending", "in-progress", "completed"],default :"pending"}

},{timestamps:true})

const Todo = mongoose.model('todo', Todoschema)

export default Todo;