const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(2).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).optional(),
  email: Joi.string().email().optional(),
  currentPassword: Joi.string().optional(),
  newPassword: Joi.string().min(6).optional(),
}).with('newPassword', 'currentPassword');

function formatJoiError(error) {
  return {
    error: 'Validation Error',
    details: error.details.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message,
    })),
  };
}

function validateRegister(body) {
  const { error } = registerSchema.validate(body, { abortEarly: false });
  if (error) throw new Response(JSON.stringify(formatJoiError(error)), { status: 400, headers: { 'Content-Type': 'application/json' } });
}

function validateLogin(body) {
  const { error } = loginSchema.validate(body, { abortEarly: false });
  if (error) throw new Response(JSON.stringify(formatJoiError(error)), { status: 400, headers: { 'Content-Type': 'application/json' } });
}

function validateProfileUpdate(body) {
  const { error } = updateProfileSchema.validate(body, { abortEarly: false });
  if (error) throw new Response(JSON.stringify(formatJoiError(error)), { status: 400, headers: { 'Content-Type': 'application/json' } });
}

module.exports = { validateRegister, validateLogin, validateProfileUpdate };

