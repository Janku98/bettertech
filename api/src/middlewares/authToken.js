const jwt = require('jsonwebtoken');



module.exports = async function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        jwt.verify(req.token, 'secretkey', async (err, authData)=>{
            if (authData.user.account === 'admin' || authData.user.account === 'doctor'){
                next();
            }else{
                res.sendStatus(403)
            }
        })
    }
}        
    