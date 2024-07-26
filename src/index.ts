import express, { NextFunction, Request, Response } from "express"
import dotenv from "dotenv"
import createTable from "./create-table";
import { getClient } from "./utils/connectDb";

const app = express();

app.use(express.json());

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

app.post("/create-user", async(req: Request, res: Response ,next: NextFunction)=>{
    try {

        const { email, password } = req.body;

        const client = await getClient()
        const inserUserText = `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id`;
        const userValues = [email, password]

        let response = await client.query(inserUserText, userValues);

        console.log(res);

        res.status(200).json({
            message: "user has been created",
            data: response
        })        
        
    } catch (error) {
        next(error);
    }
})

app.listen(PORT, ()=> console.log(`server is running at ${PORT}`)
)