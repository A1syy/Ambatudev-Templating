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
  specs: Joi.object({
    brand: Joi.string().required(),
    connectivity: Joi.string().optional(),
    batteryLife: Joi.string().optional(),
    weight: Joi.string().optional(),
    color: Joi.string().required(),
  }).optional(),
});

const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message,
    }));

    return res.status(400).json({
      error: 'Validation Error',
      details: errors,
    });
  }

  return next();
};

module.exports = validateProduct;
