const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });

const leaveSchema = {
  type: "object",
  properties: {
    empId: { type: "string", pattern: "^[a-fA-F0-9]{24}$" },
    type: {
      type: "string",
      enum: ["annual", "casual", "sick"],
    },
    duration: { type: "number", minimum: 0 },
    status: {
      type: "string",
      enum: ["inprogress", "cancelled", "ended"],
    },
  },
  required: ["empId", "type", "duration"],
  additionalProperties: false,
};

const validateLeave = (req, res, next) => {
  const valid = ajv.validate(leaveSchema, req.body);
  if (!valid) {
    res.status(400).json({ error: ajv.errors });
  } else {
    next();
  }
};

module.exports = { validateLeave };
