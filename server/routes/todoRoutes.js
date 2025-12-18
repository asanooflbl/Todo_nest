import express from 'express'
import { createTodo, deleteTodo, getTodo, updateTodo } from '../controllers/todocontroller.js';

const todorouter = express.Router();
todorouter.get("/all",getTodo)
todorouter.post("/add",createTodo)
todorouter.patch("/update/:id", updateTodo)
todorouter.delete("/delete/:id", deleteTodo)

export default todorouter;