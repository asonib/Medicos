const jwt = require('jsonwebtoken');
//loading all environment variables
require('dotenv').config();

module.exports = (req, res, next) => {
    const token = req.header('authorization-token');

    if(!token){
        return res.status(401).json({msg : 'User Not Authorized'});
    }
    try{
        const decode = jwt.verify(token, process.env.JWT_SECRETKEY);
        console.log(decode);
        req.user = decode.id;
        next();
    }catch(err){
        return res.status(401).json({msg : 'User Token not valid'});
    }
}