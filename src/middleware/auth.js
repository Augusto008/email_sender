import { verify } from 'jsonwebtoken';
import authToken from '../config/authToken';

export default (req, res, next) => {

    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(403).json({success: false, message: "token is required"});
    }

    const parts = authHeader.split(' ');

    if(!parts.length === 2) {
        return res.status(403).json({success: false, message: "incorrect token"});
    }

    const [scheme, token] = parts;

    if(!/^BearerSecret/.test(scheme)) {
        return res.status(403).json({success:false, message:"token malformated"});
    }

    verify(token, authToken.secret, process.env.API_SECRET, (error, decoded) => {

        if(error) {
            return res.status(403).json({error:"invalid token"});
        }

        req.authUser.id = decoded.id;

        return next();

    });

}