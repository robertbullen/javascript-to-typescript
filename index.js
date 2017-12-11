const bodyParser    = require('body-parser');
const connectLogger = require('connect-logger');
const express       = require('express');
const http          = require('http');

const arithmetic = require('./arithmetic');
const payload    = require('./payload');

// Create the Express application and register some useful middleware.
const app = express();
app.use(connectLogger());
app.use(bodyParser.json());

// Add a handler for '/calculate'.
app.post('/calculate', (req, res, next) => {
    // First make sure that client payload is of the expected format. This
    // returns a promise that is chained.
    payload.validate(req.body)

        // Then get the function that implements the arithmetic operation and
        // invoke it with the client-provided operands. Once again a promise
        // is returned and chained.
        .then(() => {
            const operation = arithmetic.operations[req.body.operation];
            const operands = req.body.operands;
            return operation(operands);
        })

        // And now that the calculation is complete, send the result back to
        // client.
        .then((result) => {
            res.status(200).json({ result });
        })

        // If an error occurred during any of these three chained async
        // operations, send it on to the default error handler.
        .catch((error) => next(error));
});

// Start the server on the port specified in the environment or use a reasonable default.
const server = http.createServer(app);
const port = Number.parseInt(process.env['PORT']) || 8080;
server.listen(port, () => console.log(`Listening with HTTP over port ${port}`));
