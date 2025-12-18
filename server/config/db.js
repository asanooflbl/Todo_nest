import mongoose from "mongoose"


const connectDB = async()=>{
    try {
        mongoose.connection.once("connected",()=>console.log("Database Connected Successfully"))
        await mongoose.connect(`${process.env.MONGODB_URI}/todo_nest`)
        
    } catch (error) {
        console.log("MONGODB connection failed",error);
        process.exit(1);
        
    }
  

}
export default connectDB;