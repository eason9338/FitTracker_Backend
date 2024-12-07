const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

exports.protect = async (req, res, next) => {
    try {
        // 1. 檢查 token 是否存在
        if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
          const error = new Error('No token found, please provide one in header');
          error.status = 401;
          throw error;
        }
  
        const token = req.headers.authorization.split(' ')[1];
  
        // 2. 驗證 token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded)
        } catch (err) {
          const error = new Error('token invalid');
          error.status = 401;
          throw error;
        }
  
        const user = await User.findById(decoded.userId);
        if(!user) {
          const error = new Error('user not found with provided token');
          error.status = 401;
          throw error;
        }
  
        // 5. 將用戶信息添加到請求對象
        req.user = user;
        next();
        
    } catch (error) {
      next(error);
    }
  };