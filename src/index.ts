import express, { NextFunction, Request, Response } from "express"
import dotenv from "dotenv"
import createTable from "./create-table";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3300;

// createTable();

app.get("/", (req: Request, res: Response ,next: NextFunction)=>{
    try {
        res.send("okk");
    } catch (error) {
        next(error);
    }
})

app.listen(PORT, ()=> console.log(`server is running at ${PORT}`)
)