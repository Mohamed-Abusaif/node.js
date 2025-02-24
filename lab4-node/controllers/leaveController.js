const Leave = require("../models/Leave");

exports.createLeave = async (req, res) => {
  try {
    const leave = new Leave(req.body);
    await leave.save();
    res.status(201).send(leave);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateLeave = async (req, res) => {
  try {
    let fields = {
      type: req.body.type,
      duration: req.body.duration,
      status: req.body.status,
    };
    const leave = await Leave.findByIdAndUpdate(req.params.id, fields, {
      new: true,
      runValidators: true,
    });
    if (!leave) {
      return res.status(404).send();
    }
    res.status(200).send(leave);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getLeavesOfEmployeeById = async (req, res) => {
  try {
    const leaves = await Leave.find({ empId: req.params.id });
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

exports.getPage = async (req, res) => {
  const empId = req.query.empId;
  const status = req.query.status;
  const filter = {};

  if (empId) filter.empId = empId;
  if (status) filter.status = status;

  try {
    const leaves = await Leave.find(filter).limit(10);
    res.render("index", { leaves, empId, status });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
