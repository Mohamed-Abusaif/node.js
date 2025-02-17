const fs = require("fs");
const path = require("path");

const [, , cmd, name, email, salary, level, yearsOfExperience, Id] =
  process.argv;

function validateEmployeeData(name, email, salary, level, yearsOfExperience) {
  if (process.argv.length - 2 < 6) {
    console.log("Invalid Number of Arguments!");
    return;
  }

  if (!name || typeof name != "string") {
    console.log("Please Enter Valid Name!");
    return;
  }
  if (!email || typeof name != "string") {
    console.log("Please Enter Valid Name!");
    return;
  }
  if (!name || typeof name != "string") {
    console.log("Please Enter Valid Name!");
    return;
  }
}

//validate for type of each one - number of arguments - existence
//id incremental - unique
//using one console.log to list all employees (without for loop)
//in create  any other fields the admin enters, will be added also  ex: age, department, …etc.
if (cmd === "create") {
  // set employee data
  const employeeData = {
    Id: 0,
    Name: name,
    Email: email,
    Salary: salary,
    Level: level,
    YearsOfExperience: yearsOfExperience,
  };

  let employees = [];
  employees = JSON.parse(fs.readFileSync("./data.json", "utf-8"));

  if (!Array.isArray(employees)) {
    employees = [];
  }
  employees.push(employeeData);
  console.log(employees);
  fs.writeFileSync("./data.json", JSON.stringify(employees));
  console.log("employee created successfully ");
} else if (cmd === "read") {
  const employees = JSON.parse(fs.readFileSync("./data.json", "utf8"));
  console.log(employees);
} else if (cmd === `readById`) {
  const [, , , id] = process.argv;
  console.log(id);
  const employees = JSON.parse(fs.readFileSync("./data.json", "utf8"));
  for (let i = 0; i < Array(employees).length; i++) {
    if (employees[i].Id == id) {
      console.log(employees[i]);
      return employees[i];
    }
  }
} else if (cmd === "update") {
  const [, , , id, field, newValue] = process.argv;

  const employees = JSON.parse(fs.readFileSync("./data.json", "utf8"));
  for (let i = 0; i < Array(employees).length; i++) {
    if (employees[i].Id == id) {
      console.log(employees[i]);
      //const fieldName = `${field}`;
      //Object.assign(employees[i].fieldName,newValue);
      const fieldName = `${field}`;
      employees[i][fieldName] = newValue;
      return employees[i];
    }
  }
} else if (cmd === "delete") {
  const [, , , id] = process.argv;
  const employees = JSON.parse(fs.readFileSync("./data.json", "utf8"));
  for (let i = 0; i < Array(employees).length; i++) {
    if (employees[i].Id == id) {
      employees.splice(i, 1);
      fs.writeFileSync("./data.json", JSON.stringify(employees));
      return employees;
    }
  }
} else {
  console.log("Invalid Command!");
}

// const [,, cmd, desc] = process.argv;

// const todos = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

// if (cmd === 'create') {
//   const todo = { desc };
//   const newTodos = todos.concat(todo);
//   fs.writeFileSync('./data.json', JSON.stringify(newTodos));
// } else if (cmd === 'read') {
//   console.table(todos);
// }
