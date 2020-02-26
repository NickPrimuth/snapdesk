// import access to database
const db = require('../models/userModel');

const roomsController = {};

roomsController.getRooms = (req, res, next) => {
  //if req.query.userId exists, include userId in params. else...
   const getRooms = `
   SELECT 
   FROM
   WHERE
   `
     
  
   `
   SELECT t._id, t.snaps_given, t.message, t.status, t.timestamp, t.mentee_id, u.name mentee_name
   FROM tickets t
   INNER JOIN users u
   ON u._id = t.mentee_id
   WHERE status = 'active'
   OR status = 'pending'
   ORDER BY t._id;
 `
}

roomsController.addRooms = (req, res, next) => {
  console.log('REQUEST BODY: ', req.body);
  const { name, admin } = req.body;
  const addRoom = {
    text: `
      INSERT INTO rooms
      (name, admin_id)
      VALUES
      ($1, $2)
      RETURNING _id, name, admin_id;
    `,
    values: [name, admin]
  };
  db.query(addRoom)
    .then((room) => {
      // console.log('ROOM RESPONSE: ', room);
      res.locals.roomId = room.rows[0]._id;
      res.locals.roomName = room.rows[0].name;
      res.locals.roomAdmin = room.rows[0].admin_id;
      return next();
    })
    .catch((err) =>
      next({
        log: `Error in middleware roomsController.addNewRoom: ${err}`
      })
    );
};

module.exports = roomsController;
