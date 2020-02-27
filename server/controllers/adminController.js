const db = require('../models/userModel');

adminController = {};

adminController.getBanList = (req, res, next) => {
  const roomId = req.query.roomId;
  const query = {
    text: `
      SELECT rooms_users.banned, users.name as user_name from ROOMS_USERS 
      WHERE tickets.room_id=$1
      
    `,
    values: [roomId]
  }
  db.query(query)
    .then(({rows}) => {
      console.log(rows);
      const usersStatus = rows.map(users => ({
        userName: users.user_name,
        bannedStatus: users.banned
      }))
      
      res.locals.banList = usersStatus;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in middleware adminController.getBanList: ${err}`
      });
    });
};

adminController.updateBanList = (req, res, next) => {
  db.query('ENTER SQL QUERY HERE MOTHERFUCKER')
    .then((data) => {
      console.log(data);
      // FINISH THIS EQUATION MOTHERFUCKER
      // ALSO FIGURE OUT IF THESE ARE THE BEST NAMES
      res.locals.banList = data;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error in middleware adminController.updateBanList: ${err}`
      });
    });
};

module.exports = adminController;