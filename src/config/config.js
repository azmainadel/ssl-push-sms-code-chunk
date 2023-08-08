const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    SSL_USER: Joi.string().description('SSL SMS Gateway Username'),
    SSL_PASSWORD: Joi.string().description('SSL SMS Gateway Password'),
    SSL_SID: Joi.string().description('SSL SMS Gateway Service ID'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  ssl_sms_gw: {
    user: envVars.SSL_USER,
    pass: envVars.SSL_PASSWORD,
    sid: envVars.SSL_SID,
  },
};
