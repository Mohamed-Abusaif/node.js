const database = require("./../data/data.json");
const { getEmployees, saveEmployees } = require("./../helpers/fileInput");

exports.getAllEmployees = (req, res) => {
  const employees = getEmployees();
  res.status(200).json({ employees: employees });
};

exports.getEmployeeById = (req, res) => {
  let employees = getEmployees();
  const employee = employees.find((e) => e.Id == req.params.id);
  res.status(200).json({ employee: employee });
};

exports.createEmployee = (req, res) => {
  const employees = getEmployees();
  const newEmployee = req.body;
  console.log(newEmployee);
  debugger;
  employees.push(newEmployee);
  saveEmployees(employees);
  console.log("Employee added successfully!");
  res
    .status(201)
    .json({ message: "Employee Created Successfully!", data: newEmployee });
};

exports.deleteEmployee = (req, res) => {
  let employees = getEmployees();

  // const updatedEmployees = employees.filter((employee) => {
  //   console.log(employee);
  //   employee.Id !== req.params.id;
  // });
  // console.log("---------------------------------");
  // console.log(updatedEmployees);

  // if (updatedEmployees.length !== employees.length) {
  //   saveEmployees(updatedEmployees);
  //   console.log("Employee deleted successfully!");
  //   res.status(204).json();
  // } else {
  //   console.log("Employee not found!");
  //   res.status(404).json({ message: "Employee not found!" });
  // }
  console.log(req.params.id);
  const index = employees.findIndex((e) => e.Id == req.params.id);
  if (index === -1) res.json({ message: "employee not found!" });

  employees.splice(index, 1);
  saveEmployees(employees);
  console.log("Employee deleted successfully!");
  res.status(204).json({ message: "employee deleted successfully!" });
};

exports.updateEmployee = (req, res) => {
  const employees = getEmployees();
  console.log(employees);
  const employee = employees.find((e) => {
    console.log(e);
    return e.Id === Number(req.params.id);
  });

  console.log(employee);

  if (!employee) {
    return res.status(404).json({ message: "employee not found" });
  }

  console.log(req.body);
  Object.assign(employee, req.body);

  saveEmployees(employees);

  res.status(200).json({ message: "Employee updated successfully" });
};
