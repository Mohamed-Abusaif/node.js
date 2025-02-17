const {
  addEmployee,
  listEmployees,
  editEmployee,
  deleteEmployee,
} = require("./crud");

const args = process.argv.slice(2);
const cmd = args[0];
const id = args[1];

if (cmd === "add") {
  addEmployee(args);
} else if (cmd === "list") {
  listEmployees(id);
} else if (cmd === "edit") {
  editEmployee(id, args);
} else if (cmd === "delete") {
  deleteEmployee(id);
} else {
  console.log("Invalid command!");
}
