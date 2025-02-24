const Ajv = require("ajv");
const ajv = new Ajv();

const employeeSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string", format: "email" },
    salary: { type: "number", minimum: 0 },
    Id: { type: "integer", minimum: 1 },
    Level: {
      type: "string",
      enum: ["Intern", "Jr", "Mid", "Sr", "Lead"],
    },
    yearsOfExperience: { type: "integer", minimum: 0 },
  },
  required: ["name", "email", "salary", "Id", "Level", "yearsOfExperience"],
  additionalProperties: false,
};

const validateEmp = (req, res, next) => {
  const valid = ajv.validate(employeeSchema, req.body);
  if (!valid) {
    res.status(400).json({ error: ajv.errors });
  }
  else{
    next();
  }
};

module.exports = { validateEmp };
