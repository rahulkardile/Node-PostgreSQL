import express, { NextFunction, Request, Response } from "express"
import dotenv from "dotenv"

import createTable from "./create-table";
import userRoute from './routes/routes.user'

const app = express();

app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 3300;

// createTable();

app.use("/api/user", userRoute);

app.get("*", (req: Request, res: Response, next:NextFunction )=>{
    try {
        res.status(404).json({success: true, message: "route not found"})
    } catch (error) {
        next(error);
    }
})

app.listen(PORT, ()=> console.log(`server is running at ${PORT}`)
)