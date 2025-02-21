const http = require("http");
const fs = require("fs");
const path = require("path");
const { parse } = require("querystring");

const crud = require("../controllers/crud");
const { readingTemplates } = require("./../scripts/readingTemplates");
const { replaceTemplate } = require("./../scripts/replaceTemplate");
const { injectImage } = require("./../scripts/injectImage");

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
const astroImage = "../public/astro.jpg";
const serbalImage = "../public/serbal.jpeg";

async function routing(req, res) {
  //home
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const home = readingTemplates().tempHome;
    let employees = await crud.listEmployees();
    if (!Array.isArray(employees)) {
      employees = [];
    }
    const employeesHTML = employees
      .map((employee) => replaceTemplate(employeeCardTemplate, employee))
      .join("");
    const finalHTML = home.replace("{%EMPLOYEE_CARDS%}", employeesHTML);

    res.end(finalHTML);
  }
  //astronomy
  else if (req.url === "/astronomy") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const astronomy = readingTemplates().tempAstro;
    const astroWithImage = injectImage(astronomy, astroImage);
    res.end(astroWithImage);
  }
  //serbal
  else if (req.url === "/serbal") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const serbal = readingTemplates().tempSerbal;
    const serbalWithImage = injectImage(serbal, serbalImage);
    res.end(serbalWithImage);
  }
  //add employee
  else if (req.url === "/addEmployee") {
    const addEmployee = readingTemplates().tempAddEmployee;
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(addEmployee);
  } else if (req.url === "/employee" && req.method === "POST") {
    await crud.addEmployee(req, res);
  } else if (req.url === "/astronomy/download") {
    const imagePath = path.join(__dirname, "../public/astro.jpg");

    fs.access(imagePath, fs.constants.F_OK, (err) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Image not found");
        return;
      }

      res.writeHead(200, {
        "Content-Type": "image/jpeg",
        "Content-Disposition": "attachment; filename=astro.jpg",
      });

      const readStream = fs.createReadStream(imagePath);
      readStream.pipe(res);
    });
  }
  //static images
  else if (req.url.startsWith("/public/astro")) {
    console.log("---------------------------");
    const imagePath = path.join(__dirname, "..", "public/astro.jpg");
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Image Not Found");
      } else {
        res.writeHead(200, { "Content-Type": "image/jpeg" });
        res.end(data);
      }
    });
  }
  //static images
  else if (req.url.startsWith("/public/serbal")) {
    console.log("---------------------------");
    const imagePath = path.join(__dirname, "..", "public/serbal.jpeg");
    fs.readFile(imagePath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Image Not Found");
      } else {
        res.writeHead(200, { "Content-Type": "image/jpeg" });
        res.end(data);
      }
    });
  }
  //404
  else {
    const notFound = readingTemplates().tempNotFound;
    res.end(notFound);
  }
}

module.exports = { routing };
