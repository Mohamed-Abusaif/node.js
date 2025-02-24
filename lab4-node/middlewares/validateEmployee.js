const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

const employeeSchema = {
  type: "object",
  properties: {
    username: {
      type: "string",
      minLength: 8,
      pattern: "^\\S*$",
    },
    firstName: { type: "string", minLength: 3, maxLength: 15 },
    lastName: { type: "string", minLength: 3, maxLength: 15 },
    dob: { type: "string", format: "date" },
    password: { type: "string", minLength: 8 },
  },
  required: ["username", "firstName", "lastName", "dob", "password"],
  additionalProperties: false,
};

const validateEmployee = (req, res, next) => {
  const valid = ajv.validate(employeeSchema, req.body);
  if (!valid) {
    res.status(400).json({ error: ajv.errors });
  } else {
    next();
  }
};

module.exports = { validateEmployee };
