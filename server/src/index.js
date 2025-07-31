import express from "express"
import userRoutes from './routes/user.js'
import connect from "./db/connect.js";
import dotenv from 'dotenv';
import cors from 'cors';

const PORT= process.env.PORT || 8080;
dotenv.config()

const app = express();

app.use(cors())
app.use(express.json())

connect()

app.use(userRoutes)

app.listen(PORT, ()=>{
    console.log("Server is running on ", PORT)
})