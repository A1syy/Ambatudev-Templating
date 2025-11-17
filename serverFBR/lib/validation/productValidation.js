const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().required().min(3).max(100),
  price: Joi.number().required().min(0),
  description: Joi.string().required().min(10),
  category: Joi.string().required(),
  featured: Joi.boolean().required(),
  imageMain: Joi.string().required().uri(),
  imageGallery: Joi.array().items(Joi.string().uri()).optional(),
  stock: Joi.number().integer().required().min(0),
  rating: Joi.number().min(0).max(5).optional(),
  specs: Joi.object()
      .pattern(
          Joi.string(),
          Joi.alternatives().try(Joi.string(), Joi.string())
      )
      .optional(),
});

function formatJoiError(error) {
  return {
    error: 'Validation Error',
    details: error.details.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message,
    })),
  };
}

function validateProduct(body) {
  const { error } = productSchema.validate(body, { abortEarly: false });
  if (error) throw new Response(JSON.stringify(formatJoiError(error)), { status: 400, headers: { 'Content-Type': 'application/json' } });
}

module.exports = validateProduct;

