import express, { Request, Response, NextFunction } from "express"
import { getClient } from "../utils/connectDb";
import errorHandler from "../utils/errorHandler";

const routes = express.Router();

routes.post("/create", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, description, user_id } = req.body;

        if (!title) return next(errorHandler(404, "user_id is title!"));
        if (!user_id) return next(errorHandler(404, "user_id is required!"));

        const client = await getClient();
        const insertTextTodo = `INSERT INTO todos (title, description, user_id) VALUES ($1, $2, $3) RETURNING id,title,description`;
        const todoValues = [title, description, user_id];

        let response = await client.query(insertTextTodo, todoValues);

        res.json({
            success: true,
            data: response.rows
        })

    } catch (error) {
        next(error);
    }
});

routes.get("/getUser", async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userId = req.query.userId;
        const client = await getClient();

        const selectUserId = 'SELECT * FROM todos WHERE user_id = $1'
        const userRes = await client.query(selectUserId, [userId]);

        res.status(200).json({
            success: true,
            data: userRes.rows
        })

    } catch (error) {
        next(error);
    }
})

routes.get("/get", async (req: Request, res: Response, next: NextFunction) => {
    try {

        const client = await getClient();

        const selectUserId = 'SELECT * FROM todos'
        const userRes = await client.query(selectUserId);

        res.status(200).json({
            success: true,
            data: userRes.rows
        })

    } catch (error) {
        next(error);
    }
});

export default routes;
