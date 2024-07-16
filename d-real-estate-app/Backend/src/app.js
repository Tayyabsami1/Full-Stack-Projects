import Express from 'express'
import { UserRouter,AuthRouter } from './Routes/index.js';

const app = Express();


// Routes Decleration 

app.use("/api/v1/users",UserRouter);
app.use("/api/v1/auth",AuthRouter);

export {app};
