import * as joi from 'joi';

declare module 'joi' {
    /**
     * Joi's documentation states that ValidationResult<T> is promise-like, but
     * that is not declared in @types/joi. So ValidationResult<T> is augmented
     * here.
     */
    interface ValidationResult<T> extends PromiseLike<T> { }

    /**
     * TypedSchemaMap<T> is a type that must have a Joi schema defined for every
     * property that exists in T.
     */
    type TypedSchemaMap<T> = {
        [P in keyof T]: joi.SchemaLike;
    }

    /**
     * This overload of joi.object() utilizes TypedSchemaMap<T> to enlist the
     * compiler in checking that `schemaMap` is a full schema for T.
     * @param schemaMap 
     */
    function object<T>(schemaMap: TypedSchemaMap<T>): ObjectSchema;
}
