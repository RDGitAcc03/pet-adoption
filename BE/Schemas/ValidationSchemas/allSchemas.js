const signUpSchema = {
  type: "object",
  properties: {
    firstName: {type: "string"},
    lastName: {type: "string"},
    email: { type: "string" },
    phoneNumber: {type: "string"},
    password: { type: "string", minLength: 2 },
    repassword: { type: "string", minLength: 2 },
  },
  required: ["email"],
  additionalProperties: false,
};


const loginSchema = {
  type: "object",
  properties: {
    email: {type: "string"},
    password: {type: "string", minLength: 2},

  },
  required: ["email", "password"],
  additionalProperties: false,
}

module.exports = { signUpSchema, loginSchema };
