import jwt from 'jsonwebtoken'



const requireAuth=(req,res,next)=>{
    const token=req.cookies.jwt;

    //check json webtoken exists &is verified
    if(!token){
        return res.status(401).json({
            message:"Authentication required"
        });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if(err){
            return res.status(401).json({
                message:'Invalid or expired token'
            });
        }
        req.userId=decodedToken.id;
        next();
    });
}

   
    

    export default{
        requireAuth,
        
    }