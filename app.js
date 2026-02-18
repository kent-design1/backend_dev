import express from "express";

import {PORT} from "./env.js";

const app = express();

app.get("/", (req, res) => {
    res.status(400).send("Welcome to the subscription Tracker Api")
})

app.listen(PORT, () => {
    console.log(`Tracker running on http://localhost:${ PORT }`);
})

export default app;