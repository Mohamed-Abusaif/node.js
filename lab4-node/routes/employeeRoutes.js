const express = require("express");
const employeeController = require("../controllers/employeeController");
const { validateEmployee } = require("./../middlewares/validateEmployee");

const router = express.Router();

router.get(
  "/",
  // authController.protect,
  // authorizeMiddleware.authorize("Admin"),
  employeeController.getEmployees
);

router.get(
  "/:id/leaves",
  // authController.protect,
  // authorizeMiddleware.authorize("Admin"),
  employeeController.filterLeaves
);

router.post(
  "/",
  // authController.protect,
  // authorizeMiddleware.authorize("Admin"),
  validateEmployee,
  employeeController.createEmployee
);

router.patch(
  "/:id",
  // authController.protect,
  // authorizeMiddleware.authorize("Admin"),
  validateEmployee,
  employeeController.updateEmployee
);

router.delete(
  "/:id",
  // authController.protect,
  // authorizeMiddleware.authorize("Admin"),
  employeeController.deleteEmployee
);

module.exports = router;
