import express, { Request, Response, NextFunction } from "express"
import { getClient } from "../utils/connectDb";

const routes = express.Router();

routes.post("/create-user", async (req: Request, res: Response, next: NextFunction) => {
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

routes.get("/getUsers", async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { email, id } = req.body;
        const client = await getClient()

        const selectUserText = 'SELECT * FROM users';
        const userRes = await client.query(selectUserText);

        const allUsers = [];
        const raw = [];

        for (let user of userRes.rows) {
            allUsers.push({
                userId: user.id,
                email: user.email
            });
            raw.push(user);
        }

        res.status(200).json({
            message: "total user are " + allUsers.length,
            data: allUsers,
            raw
        });

    } catch (error) {
        next(error);
    }
})

export default routes;