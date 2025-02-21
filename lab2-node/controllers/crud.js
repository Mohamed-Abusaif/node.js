const { getEmployees, saveEmployees } = require("../scripts/fileInput");
const { validateEmployeeData } = require("../scripts/validation");
const querystring = require("querystring");
const fs = require("fs");
const path = require("path");

const parseArgs = (args) =>
  Object.fromEntries(
    args.slice(1).map((arg) => arg.replace("--", "").split("="))
  );

const getPage = (res, page) => {
  res.writeHead(200, { "content-Type": "text/html" });
  res.write(page);
  res.end;
};

const addEmployee = async (req, res) => {
  try {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", async () => {
      const formData = querystring.parse(body);
      const employees = await getEmployees();
      const newEmployee = {
        name: formData.name,
        email: formData.email,
        salary: Number(formData.salary),
        yearsOfExperience: Number(formData.yearsOfExperience) || 0,
        Id: (employees.at(-1)?.Id || 0) + 1,
        Level: "Jr",
      };

      const errorMsg = validateEmployeeData(newEmployee);
      if (errorMsg) {
        res.writeHead(400, { "Content-Type": "text/plain" });
        return res.end(errorMsg);
      }

      employees.push(newEmployee);
      await saveEmployees(employees);

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Employee added successfully!");
    });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
};

const listEmployees = async (id) => {
  try {
    const employees = await getEmployees();
    if (id) {
      const employee = employees.find((e) => e.Id == id);
      return employee
        ? console.log(
            `Name: ${employee.name}, Email: ${employee.email}, Salary: ${employee.salary}`
          )
        : console.log("Employee not found!");
    }
    employees.forEach((e) =>
      console.log(`Name: ${e.name}, Email: ${e.email}, Salary: ${e.salary}`)
    );
    return employees;
  } catch (error) {
    console.error("Error listing employees:", error);
    return [];
  }
};

module.exports = {
  addEmployee,
  listEmployees,
  getPage,
};
