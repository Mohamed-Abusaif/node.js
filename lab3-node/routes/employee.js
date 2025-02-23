const express = require("express");
const employeeController = require("./../controllers/employeeController");
const {validateEmp} = require('./../middlewares/validator')
const router = express.Router();

router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.post("/",validateEmp, employeeController.createEmployee);
router.delete("/:id", employeeController.deleteEmployee);
router.patch("/:id", employeeController.updateEmployee);

module.exports = router;
