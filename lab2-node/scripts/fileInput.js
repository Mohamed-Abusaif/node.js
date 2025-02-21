const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/data.json");

if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, "[]");

const getEmployees = () => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath, { encoding: "utf8" });
    let data = "";

    readStream.on("data", (chunk) => {
      data += chunk;
    });

    readStream.on("end", () => {
      try {
        const employees = JSON.parse(data);
        resolve(employees);
      } catch (error) {
        reject(error);
      }
    });

    readStream.on("error", (error) => {
      reject(error);
    });
  });
};

const saveEmployees = (employees) => {
  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(filePath, { encoding: "utf8" });
    writeStream.write(JSON.stringify(employees, null, 2), (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });

    writeStream.end();
  });
};

module.exports = { getEmployees, saveEmployees };
