import express, { NextFunction, Request, Response } from "express"
import dotenv from "dotenv"

import createTable from "./utils/create-table";
import userRoute from './routes/routes.user'
import todoRoute from './routes/routes.todo'
import { CustomError } from "./types/types";

const app = express();

app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 3300;

// createTable();

app.use("/api/user", userRoute);
app.use("/api/todo", todoRoute);

app.get("*", (req: Request, res: Response, next:NextFunction )=>{
    try {
        res.status(404).json({success: true, message: "route not found"});
    } catch (error) {
        next(error);
    }
})

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {

    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server error";

    return res.status(statusCode).json({
        message,
        success: false
    })
})

app.listen(PORT, ()=> console.log(`server is running at ${PORT}`)
)