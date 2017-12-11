const operations = {
    '+'(operands) {
        return Promise.resolve(operands.reduce((previous, current) => previous + current));
    },

    '-'(operands) {
        return Promise.resolve(operands.reduce((previous, current) => previous - current));
    }, 

    // TODO: Implement multiplication and division.
}
module.exports.operations = operations;
