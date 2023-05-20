import cors from 'cors';
import helmet from 'helmet';
import frameguard from 'frameguard';
import express, { Router } from 'express';
import { json, urlencoded } from 'body-parser';

//routes
import userRoute from '../routes/user/user.route';




const app = express();
const router = Router();
//route configration
userRoute(router);

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(frameguard());
app.use(helmet());
app.use(cors())
app.use("/api", router);

export default app;