const express = require('express');

const apiRouter = express.Router();

// require in middleware here
const jwtsController = require('../controllers/jwtsController');
const userController = require('../controllers/userController');
const ticketsController = require('../controllers/ticketsController');
const roomsController = require('../controllers/roomsController');

// ADD API ROUTES HERE
apiRouter.get('/user', jwtsController.isLoggedIn, userController.getData, (req, res) =>
  res.status(200).json(res.locals)
);

apiRouter.put(
  '/tickets/delete',
  jwtsController.isLoggedIn,
  ticketsController.updateTicketStatus,
  (req, res) => res.status(200).json(res.locals)
);

apiRouter.get(
  '/tickets',
  jwtsController.isLoggedIn,
  ticketsController.getActiveTickets,
  (req, res) => res.status(200).json(res.locals)
);

apiRouter.post('/tickets', jwtsController.isLoggedIn, ticketsController.addTicket, (req, res) =>
  res.status(200)  
);

apiRouter.get('/rooms', jwtsController.isLoggedIn, roomsController.getRooms, (req, res) => {
  console.log('END OF ROOMS GET REQUEST', res.locals);
  res.status(200)
})

apiRouter.post('/rooms', jwtsController.isLoggedIn, roomsController.addRooms, (req, res) => {
  console.log('END OF ROOMS POST REQUEST', res.locals);
  res.status(200)
})

apiRouter.patch('/rooms', jwtsController.isLoggedIn, roomsController.createRooms, (req, res) => {
  console.log('END OF ROOMS PATCH REQUEST', res.locals);
  res.status(200)
})

apiRouter.post('/joinRoom', jwtsController.isLoggedIn, roomsController.joinRoom, (req, res) => {
  console.log('END OF joinRoom POST REQUEST', res.locals);
  res.status(200)
})
// apiRouter.get('/', jwtsController.isLoggedIn, adminController.getBannedList, (req, res) => {
//   res.status(200).json(res.locals)
// })

// apiRouter.patch('/', jwtsController.isLoggedIn, adminController.updateBannedList, (req, res) => {
//   res.status(200).json(res.locals)
// })

module.exports = apiRouter;


