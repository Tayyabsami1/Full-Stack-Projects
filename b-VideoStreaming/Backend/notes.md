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

## File Uploading 
- We can easily upload Pictures , videos and pdfs using some services and packages like Cloudinary to save our data and multer to upload files.
- We can save the upload file in our temp from the user and then we can upload it to our SDK eg CLoudinary
- The files like Images , pdf ect are contained in the req.files. (You get the other data in req.body)

## Mongoose Methods

- Find one by Email or Username
```bash
 const UserExist = await User.findOne({
      $or: [{ username }, { email }]
   });  
```
- Find one by Usernmae
```bash
 const myUser= await User.findOne({username})  
```
- Create a new Entry in the User model 
```bash
 const MyNewUser = await User.create({
      username: myusername.toLowerCase(),
      password: mypass,
      email:myemail,
   })
```
- We have updated data manually and now saving it without validation
```bash
 await user.save({ validateBeforeSave: false });
```
- Find a user by Id
```bash
 const createdUser = await User.findById(MyNewUser._id)
 ```

 - Find a user by id and update it 
 ``` bash
 await  User.findByIdAndUpdate(
      req.user._id,
      {
         $unset:{
         refreshToken:1,
         }
      },{
         new:true,
      }
   )
```
