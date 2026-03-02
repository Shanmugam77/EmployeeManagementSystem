const adminMiddleware = async(req,res,next) => {
   try {
    const {userRole} = req.user;
    if(userRole == "EMPLOYEE") return res.status(400).json({message:"Super-Admin & Admin only have access"});
    next();
   } catch (error) {
    console.log(error.message);
    return res.status(500).json({error:error.message,message:"error in adminMiddleware"});
   }
};

module.exports = {adminMiddleware};