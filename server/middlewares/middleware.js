const jwt = require('jsonwebtoken');

exports.Middleware = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token){
            return res.status(403).json({message:'Пользователь не авторизован.'})
        }
        const UserData = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user = UserData
        next()
    }
    catch (e){
        console.log(e.message)
        return res.status(403).json({message:'Пользователь не авторизован.'})
    }
}