const db = require('../models/userModel');

adminController = {};

adminController.getBanList = (req, res, next) => {
  if (req.query.room_id) {
    const room_id = req.query.room_id;
    const query = {
      text: `
      SELECT rooms_users.banned, users.name as user_name from ROOMS_USERS 
      WHERE tickets.room_id=$1
      
      `,
      values: [room_id]
    }
  } else {
    const { room_id, user_ID } = req.body;
    const query = {
      text: `
       UPDATE
        
      `,
      values: [room_id, user_id]
    }
  }
  db.query(query)
    .then(({rows}) => {
      console.log('rows received from getBanList query', rows);
      const banList = rows.map(user => ({
        userName: user.user_name,
        bannedStatus: user.banned
      }))
      
      res.locals.banList = banList;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in middleware adminController.getBanList: ${err}`
      });
    });
};


module.exports = adminController;