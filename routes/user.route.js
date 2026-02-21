import {Router} from "express";

const userRouter = Router();

userRouter.get('/', (req, res) => {
    res.send({title: 'Available users'})
})

userRouter.post('/id:', (req, res) => {
    res.send({title: 'User of id:'})
})

export default userRouter;