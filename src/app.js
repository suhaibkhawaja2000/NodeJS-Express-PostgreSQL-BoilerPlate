// const app = require('./config/express');
import app from './config/express';
import dotenv from 'dotenv'
dotenv.config()
const port = process.env.NODE_ENV_PORT
app.listen(port).on("listening", async () => {
    console.log(`Server running at http://localhost:${port}/`);
});


module.exports = app;