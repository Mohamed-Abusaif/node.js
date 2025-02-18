const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/data.json");

if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, "[]");

const getEmployees = () => JSON.parse(fs.readFileSync(filePath, "utf8"));

const saveEmployees = (employees) => {
  fs.writeFileSync(filePath, JSON.stringify(employees, null, 2));
};

module.exports = { getEmployees, saveEmployees };
