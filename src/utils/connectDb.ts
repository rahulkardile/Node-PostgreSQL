import { Client } from "pg"

export async function getClient() {
    const client = new Client(process.env.PGURL);
    await client.connect();
    return client;
}