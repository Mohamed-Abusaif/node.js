const express = require("express");
const profileController = require("../controllers/profileController");

const router = express.Router();

// Get all holidays
router.get(
  "/",
  // authController.protect,
  // authorizeMiddleware.authorize("Admin"),
  () => {}
);

// Create a holiday
router.post(
  "/",
  // authController.protect,
  // authorizeMiddleware.authorize("Admin"),
  () => {}
);


// Update a holiday by ID
router.patch(
  "/:id",
  // authController.protect,
  // authorizeMiddleware.authorize("Admin"),
  () => {}
);

// Delete a holiday by ID
router.delete(
  "/:id",
  // authController.protect,
  // authorizeMiddleware.authorize("Admin"),
  () => {}
);

module.exports = router;
