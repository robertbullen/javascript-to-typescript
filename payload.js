const joi = require('joi');

const arithmetic = require('./arithmetic');

const schema = joi.object().keys({
    operation: joi.string().valid(Object.keys(arithmetic.operations)),
    operands: joi.array().items(joi.number()).min(2)
});

function validate(body) {
    return joi.validate(body, schema);
}
module.exports.validate = validate;
