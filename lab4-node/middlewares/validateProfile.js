const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

const profileSchema = {
  type: "object",
  properties: {
    empId: { type: "string", pattern: "^[a-fA-F0-9]{24}$" },
    title: { type: "string", minLength: 1 },
    description: { type: "string", minLength: 1 },
    yearOfExperience: { type: "number", minimum: 0 },
    department: { type: "string", minLength: 1 },
    phone: { type: "string", minLength: 1 },
    email: { type: "string", format: "email" },
  },
  required: ["empId", "title", "description", "department", "phone", "email"],
  additionalProperties: false,
};

const validateProfile = (req, res, next) => {
  const valid = ajv.validate(profileSchema, req.body);
  if (!valid) {
    res.status(400).json({ error: ajv.errors });
  } else {
    next();
  }
};

module.exports = { validateProfile };
