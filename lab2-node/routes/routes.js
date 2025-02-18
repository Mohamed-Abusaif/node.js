const http = require("http");
const fs = require("fs");
const crud = require("../controllers/crud");
const { readingTemplates } = require("./../scripts/readingTemplates");
const { replaceTemplate } = require("./../scripts/replaceTemplate");

function routing(url, res) {
  //home
  if (url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });

    const home = readingTemplates().tempHome;
    const employees = crud.listEmployees();
    const replacedTemplate = employees
      .map((employee) => replaceTemplate(home, employee))
      .join("");

    res.end(replacedTemplate);
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
