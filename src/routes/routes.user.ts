import express, { Request, Response, NextFunction } from "express"
import { getClient } from "../utils/connectDb";

const routes = express.Router();

routes.post("/create-user", async(req: Request, res: Response ,next: NextFunction)=>{
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

export default routes;