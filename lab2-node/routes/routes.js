const http = require("http");
const fs = require("fs");
const crud = require("../controllers/crud");
const { readingTemplates } = require("./../scripts/readingTemplates");

function routing(url, res) {
  //home
  if (url === "/") {
    const home = readingTemplates().tempHome;

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(home);
  }
  //astronomy
  else if (url === "/astronomy") {
    const astronomy = readingTemplates().tempAstro;

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
