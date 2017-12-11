/**
 * Operation is a function signature, taking an array of numbers as its sole
 * argument and returning a promise of the arithmetic result.
 */
export type Operation = (operands: number[]) => Promise<number>;

/**
 * Operations is an interface declaring all supported operations.
 */
export interface Operations {
    '+': Operation;
    '-': Operation;
}

/**
 * operations is an instance of the interface Operations.
 */
export const operations: Operations = {
    '+'(operands: number[]): Promise<number> {
        return Promise.resolve(operands.reduce((previous, current) => previous + current));
    },

    '-'(operands): Promise<number> {
        return Promise.resolve(operands.reduce((previous, current) => previous - current));
    }

    // TODO: Implement multiplication and division.
}
