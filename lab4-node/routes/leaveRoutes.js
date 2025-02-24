const express = require("express");
const leaveController = require("../controllers/leaveController");
const { validateLeave } = require("./../middlewares/validateLeave");

const router = express.Router();

router.get(
  "/:id",
  // authController.protect,
  // authorizeMiddleware.authorize("Admin"),
  leaveController.getLeavesOfEmployeeById
);

router.post(
  "/",
  // authController.protect,
  // authorizeMiddleware.authorize("Admin"),
  validateLeave,
  leaveController.createLeave
);

router.patch(
  "/:id",
  // authController.protect,
  // authorizeMiddleware.authorize("Admin"),
  validateLeave,
  leaveController.updateLeave
);

router.get(
  "/leavesPage",
  // authController.protect,
  // authorizeMiddleware.authorize("Admin"),
  leaveController.getPage
);

module.exports = router;
