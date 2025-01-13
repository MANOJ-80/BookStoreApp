const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY;


const verifyAdminToken = (req,res,next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).send({message:"Token is missing"});

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if(err) return res.status(403).send({message:"Invalid token"});
        if(decoded.role!== 'admin') return res.status(403).send({message:"Unauthorized access"});
        req.user = decoded;
        next();
    })
}

module.exports = verifyAdminToken;