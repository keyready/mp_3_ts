const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.generateAccessToken = (id,email,role) =>{
    const payload = {
        id:id,
        email:email,
        role:role,
    }
    const token = jwt.sign(payload,process.env.JWT_SECRET_KEY)
    return token
}

exports.generateLink = () =>{
    const str = crypto.randomBytes(20).toString('hex');
    return str
}