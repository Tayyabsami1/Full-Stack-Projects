# Backend Development Notes

## Project Structure and Initialization
- Initialize the Project using npm init -y.
- Make an src folder to keep all things in order.
- Make folders such as Models , Controllers , Routes , Middlewares , Utils , DB.
- Make files such as index.js app.js and constants.js
- Download the express package using npm i express.
- In the app.js initialize a Express App and export it.
- In the constants.js maintain all the constants such as the DB name ect and export them.
- In the .env file make your env variables such as URI and port name ect.
- Connect your DB in the DB folder and export it.
- In the IndexJs import DB connection and Express App and connect the DB and start the server.
- Use Nodemon to automatically restart the server make sure you edit the start script in the package.json.
- Use dotenv package for the environment variables.

## Password Hashing 
- So it is bad practice to save simple passwords as text in the backend you need to hash them , so for hasing we use bcrypt and to make our hash unique we use the jsonwebtoken

## Customer API Responses
- We can make customer error classes and customer Api response classes to standardize it. In the utils folder so that it can be used anywhere.

## Security
- We can use both sessions and cookies for enhanced security. We can save the Refresh Token in the DB and Access Token will be in the cookies.

## Database Important points
- We can make a perfect Schema using Mongoose. We can add plugins , pre , post and can add as many methods as we want.


