// ? A little advance syntax to do the same thing as below 
const asyncHandler = (func) => {
    (req, res, next) => {
        Promise.resolve(func(req, res, next)).catch((err) => next(err));
    }
}

export {asyncHandler}


// ? A little bit easy syntax using Async fucntions (It is a higher order function)
// const asyncHandler=(func)=>async(req,res,next)=>{
//     try{
//         await func(req,res,next);
//     }
//     catch(err)
//     {
//         return res.status(err.code || 500).json({
//             success:false,
//             message:err.message|| "Request Failed",
//         })
//     }
// }