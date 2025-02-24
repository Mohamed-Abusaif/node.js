const Employee = require("../models/Employee");
const Leave = require("../models/Leave");

exports.createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).send(employee);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({}).select("_id firstName age");
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!employee) {
      return res.status(404).send();
    }
    res.status(200).send(employee);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).send();
    }
    res.status(200).send(employee);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Return the leaves with specific required filters (status, defaults are limit 10 skip 0) (don’t reinvent the wheel)
// Return user name and user id only with each leave
// Send user id in headers

exports.filterLeaves = async (req, res) => {
  try {
    let filters = {};
    if (req.query.status) {
      filters.status = req.query.status;
    }
    const leaves = await Leave.find(filters)
      .limit(parseInt(req.query.limit) || 10)
      .skip(parseInt(req.query.skip) || 0)
      .select("empId type duration status -_id")
      .populate("empId", "name id");
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
