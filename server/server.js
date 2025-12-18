import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db.js';
import todorouter from './routes/todoRoutes.js';


const app = express();

await connectDB();

app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("Todo app is running")
})
app.use('/api/todo',todorouter)

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log("server running on port " + PORT)
})

export default app;