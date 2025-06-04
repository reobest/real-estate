import { NextFunction, Request, Response } from "express";
import  jwt  from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken"; 


interface DecodedToken extends JwtPayload {
    sub:string,
    "custom:role"?:string
}

declare global {
    namespace Express {
        interface Request {
            user?:{
                id:string,
                role:string
            }
        }
    }
}

export const authMiddleware = (allowedRoles : string[]) => {
    return (req : Request,res:Response,next:NextFunction) : void => {
        const token = req.headers.authorization.split(" ")[1] 
        console.log("tooooooken:" + token);
        
        if(!token){
            res.status(401).json({message:"Unauthorized"})
            return
        }
        try {
            const decoded = jwt.decode(token) as DecodedToken
            const userRole = decoded["custom:role"] || ""
            req.user = {
                id:decoded.sub,
                role:userRole
            }
            const hasAccess = allowedRoles.includes(userRole.toLowerCase())
            if(!hasAccess){
                res.status(403).json({mesage:"Access Denied"})
                return
            }


        } catch (error) {
            console.error("failed to decode token" + error)
            res.status(400).json({message:"Invalid Token"})
            return
        }
        next()
    }
}