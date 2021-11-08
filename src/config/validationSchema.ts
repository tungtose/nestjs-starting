import * as Joi from 'joi';

const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'staging', 'provision')
    .default('development'),
  PORT: Joi.number().default(5000),
  MONGO_URL: Joi.string().required(),
})

export default validationSchema;