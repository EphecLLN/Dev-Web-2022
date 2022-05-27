const jwt = require('jsonwebtoken');
const config = require('../config/auth.conf');

module.exports = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token']
    
    if(!token){
        return res.status(403).send({
            error: true,
            message: 'No token provided.'
        });
    }

    jwt.verify(token, config.secret, function(err, decoded) {
        if(err) {
            res.status(401).json({
                error: true,
                message: 'Unauthorized access'
            });
        }
        req.decoded = decoded;
        next();
    })
}