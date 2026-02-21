import {Router} from 'express';

const authRouter = Router();

authRouter.post('/sign-up', (req, res) => {
res.send({title: 'Sign Up'})
})


export default authRouter;