import express from 'express';
import cors from "cors"
import cookieparser from "cookie-parser"

const app = express();

// Configuring the Middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

// Some security options using Middlewares
app.use(express.json({ limit: "16kb" }));

// like to encode space to %20 or +
app.use(express.urlencoded({
    extended: true,
    limit: "16kb",
}))

// we want to store some files or images in our server so we can save those assets in a public folder
app.use(express.static("public"));

// we use cookie parser to set and access the user's browser cookies 
// We can use some methods to set secure  cookies which can only be read/remove  by the server
app.use(cookieparser())

export { app };