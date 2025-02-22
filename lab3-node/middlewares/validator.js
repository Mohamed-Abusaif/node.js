const Ajv = require("ajv");
const ajv = new Ajv();

const schema = {
  type: "object",
  properties: {
    foo: { type: "integer" },
    bar: { type: "string" },
  },
  required: ["foo"],
  additionalProperties: false,
};

const validate = (req, res, next) => {
  const valid = ajv.validate(schema, req.body);
  if (!valid) console.log(ajv.errors);
};

module.exports = { validate };
