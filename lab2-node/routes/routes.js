const http = require("http");
const fs = require("fs");
const crud = require("../controllers/crud");
const { readingTemplates } = require("./../scripts/readingTemplates");
const { replaceTemplate } = require("./../scripts/replaceTemplate");

const employeeCardTemplate = `
  <div class="employee">
    <h2>{%EMPLOYEE_NAME%}</h2>
    <p>{%EMAIL%}</p>
    <p>{%SALARY%}</p>
    <p>ID: {%ID%}</p>
    <p>Level: {%LEVEL%}</p>
    <p>Experience: {%YEARS_OF_EXPERIENCE%} years</p>
  </div>
`;
function routing(url, res) {
  //home
  if (url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const home = readingTemplates().tempHome;
    const employees = crud.listEmployees();
    console.log(employees)

    const employeesHTML = employees.map((employee) => replaceTemplate(employeeCardTemplate, employee)).join("");
    const finalHTML = home.replace("{%EMPLOYEE_CARDS%}", employeesHTML);

    res.end(finalHTML);
  }
  //astronomy
  else if (url === "/astronomy") {
    const astronomy = readingTemplates().tempAstro;
    const replacedTemplate = replaceTemplate(astronomy, crud.readAll());
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(astronomy);
  }
  //serbal
  else if (url === "/serbal") {
    const serbal = readingTemplates().tempSerbal;
    res.end(serbal);
  }
  //add employee
  else if (url === "addEmployee") {
    const addEmployee = readingTemplates().tempAddEmployee;
    res.end(addEmployee);
  }
  //404
  else {
    const notFound = readingTemplates().tempNotFound;
    res.end(notFound);
  }
}

module.exports = { routing };
