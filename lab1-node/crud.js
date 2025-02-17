const { getEmployees, saveEmployees } = require("./utils/fileInput");
const { validateEmployeeData } = require("./utils/validation");

const parseArgs = (args) =>
  Object.fromEntries(
    args.slice(1).map((arg) => arg.replace("--", "").split("="))
  );

const addEmployee = (args) => {
  const employees = getEmployees();
  const newEmployee = {
    ...parseArgs(args),
    Id: (employees.at(-1)?.Id || 0) + 1,
    Level: "Jr",
  };
  newEmployee.yearsOfExperience = Number(newEmployee.yearsOfExperience) || 0;
  newEmployee.salary = Number(newEmployee.salary);

  const errorMsg = validateEmployeeData(newEmployee);
  if (errorMsg) return console.log(errorMsg);

  employees.push(newEmployee);
  saveEmployees(employees);
  console.log("Employee added successfully!");
};

const listEmployees = (id) => {
  const employees = getEmployees();
  if (id) {
    const employee = employees.find((e) => e.Id == id);
    return employee
      ? console.log(
          `Name: ${employee.name}, Email: ${employee.email}, Salary: ${employee.salary}`
        )
      : console.log("Employee not found!");
  }
  employees.forEach(({ name, email, salary }) =>
    console.log(`Name: ${name}, Email: ${email}, Salary: ${salary}`)
  );
};

const editEmployee = (id, args) => {
  const employees = getEmployees();
  const employee = employees.find((e) => e.Id == id);
  if (!employee) return console.log("Employee not found!");

  Object.assign(employee, parseArgs(args));
  employee.salary = Number(employee.salary);
  employee.yearsOfExperience = Number(employee.yearsOfExperience) || 0;

  saveEmployees(employees);
  console.log("Employee updated successfully!");
};

const deleteEmployee = (id) => {
  let employees = getEmployees();
  const index = employees.findIndex((e) => e.Id == id);
  if (index === -1) return console.log("Employee not found!");

  employees.splice(index, 1);
  saveEmployees(employees);
  console.log("Employee deleted successfully!");
};

module.exports = { addEmployee, listEmployees, editEmployee, deleteEmployee };
