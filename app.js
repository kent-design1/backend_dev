import express, {json} from "express";

import {PORT} from "./env.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import connectdb from "./database/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();

app.use('/api/auth', authRouter);
app.use('/api/userRoutes', userRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(errorMiddleware);


app.get("/", (req, res) => {
    res.status(400).send("Welcome to the subscription Tracker Api")
})

app.listen(PORT, async () => {
    console.log(`Tracker running on http://localhost:${ PORT }`);

   await connectdb();
})

export default app;