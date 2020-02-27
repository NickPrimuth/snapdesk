const express = require("express");

const apiRouter = express.Router();

// require in middleware here
const jwtsController = require("../controllers/jwtsController");
const userController = require("../controllers/userController");
const ticketsController = require("../controllers/ticketsController");
const roomsController = require("../controllers/roomsController");
const adminController = require("../controllers/adminController");

// ADD API ROUTES HERE
apiRouter.get(
  "/user",
  jwtsController.isLoggedIn,
  userController.getData,
  (req, res) => res.status(200).json(res.locals)
);

apiRouter.put(
  "/tickets/update",
  jwtsController.isLoggedIn,
  ticketsController.updateTicketStatus,
  (req, res) => res.status(200).json(res.locals)
);

apiRouter.get(
  "/tickets/:roomId",
  jwtsController.isLoggedIn,
  ticketsController.getActiveTickets,
  (req, res) => res.status(200).json(res.locals)
);

apiRouter.post(
  "/tickets",
  jwtsController.isLoggedIn,
  ticketsController.addTicket,
  (req, res) => res.status(200).json(res.locals)
);

apiRouter.post(
  "/rooms",
  jwtsController.isLoggedIn,
  roomsController.addRooms,
  (req, res) => {
    console.log("END OF ROOMS POST REQUEST", res.locals);
    res.status(200).json(res.locals);
  }
);

apiRouter.get(
  "/admin/:roomId",
  jwtsController.isLoggedIn,
  adminController.getBanList,
  (req, res) => res.status(200).json(res.locals)
);

apiRouter.patch(
  "/admin",
  jwtsController.isLoggedIn,
  adminController.getBanList,
  (req, res) => res.status(200).json(res.locals)
);

module.exports = apiRouter;


