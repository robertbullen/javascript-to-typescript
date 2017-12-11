import * as joi from 'joi';

import * as arithmetic from './arithmetic';

/**
 * Payload is the type definition for what the client must send in the body of
 * its request.
 */
export interface Payload {
    operation: keyof arithmetic.Operations;
    operands: number[];
}

/**
 * Schema is essentially unchanged, but now the argument send to joi.object<T>()
 * is type checked so that it must have every property that exists in Payload.
 */
const schema: joi.ObjectSchema = joi.object<Payload>({
    operation: joi.string().valid(Object.keys(arithmetic.operations)),
    operands: joi.array().items(joi.number()).min(2)
});

export function validate(body: any): joi.ValidationResult<Payload> {
    return joi.validate(body, schema);
}
