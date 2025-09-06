import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import chatbotRoutes from './routes/chatbot.route.js';
import cors from 'cors';
const app = express()
dotenv.config()

const port = process.env.PORT || 3000

//middleware
app.use(express.json());
app.use(cors())
//Database connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("connected to mongodb")
}).catch((error)=>{
    console.log("error connecting to mongo db:",error)
})
app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Defining routing
app.use("/bot/v1/",chatbotRoutes)
app.listen(port, () => {
  console.log(`Example app hello dear ${port}`)
})
