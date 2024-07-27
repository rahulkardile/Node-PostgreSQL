import express, { Request, Response, NextFunction } from "express"
import { getClient } from "../utils/connectDb";

const routes = express.Router();

routes.post("/create", async(req:Request, res: Response, next: NextFunction)=>{
    try {
        const {title, description, user_id} = req.body;
        const headers = req.headers;

        const client = await getClient();
        const insertTextTodo = `INSERT INTO todos (title, description, user_id) VALUES ($1, $2, $3) RETURNING id,title,description`;
        const todoValues = [title, description, user_id];

        let response = await client.query(insertTextTodo, todoValues);

        res.json({
            message: "done",
            data: response.rows
        })

    } catch (error) {
        next(error);
    }
})

export default routes;