const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try { 
    const token = req.headers.authorization;//.split(' ')[1]; console.log(req.headers);
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.id;
    //req.auth = {userId}; 
    let userIdIn=userId;//params.id;
    //if (req.body.userId && req.body.userId !== userId) {
    if (userIdIn && userIdIn !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    } //*/ next();
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  } 
};