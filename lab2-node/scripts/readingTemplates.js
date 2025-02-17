const fs = require("fs");

const readingTemplates = () => {
  const tempHome = fs.readFileSync(`${__dirname}/../views/home.html`, "utf-8");
  const tempSerbal = fs.readFileSync(
    `${__dirname}/../views/serbal.html`,
    "utf-8"
  );
  const tempAstro = fs.readFileSync(
    `${__dirname}/../views/astronomy.html`,
    "utf-8"
  );
  const tempNotFound = fs.readFileSync(
    `${__dirname}/../views/notFound.html`,
    "utf-8"
  );
  const tempAddEmployee = fs.readFileSync(
    `${__dirname}/../views/addEmployee.html`,
    "utf-8"
  );
  return {
    tempAddEmployee,
    tempAstro,
    tempHome,
    tempNotFound,
    tempSerbal,
  };
};
module.exports = { readingTemplates };
