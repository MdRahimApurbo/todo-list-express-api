const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const token = req.headers['token-key']; 

    if (!token) {
        return res.status(401).json({ status: 'Failure', message: 'No token provided' });
    }

    jwt.verify(token, 'apurbo123', function (err, decoded) {
        if (err) {
            return res.status(401).json({ status: 'Failure', message: 'Invalid token' });
        } else {
            let UserName = decoded['data']['UserName'];
            req.headers.UserName = UserName ;
            next(); 
        }
    });
};