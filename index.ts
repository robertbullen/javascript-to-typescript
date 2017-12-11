import * as bodyParser    from 'body-parser';
import * as connectLogger from 'connect-logger';
import * as express       from 'express';
import * as http          from 'http';

import * as arithmetic from './arithmetic';
import * as payload    from './payload';

// Create the Express application and register some useful middleware.
const app = express();
app.use(connectLogger());
app.use(bodyParser.json());

// Add a handler for '/calculate'.
app.post('/calculate', async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        // First make sure that client payload is of the expected format.
        const validPayload: payload.Payload = await payload.validate(req.body);

        // Then get the function that implements the arithmetic operation and
        // invoke it with the client-provided operands.
        const operation: arithmetic.Operation = arithmetic.operations[validPayload.operation];
        const result: number = await operation(validPayload.operands);

        // And now that the calculation is complete, send the result back to
        // client.
        res.status(200).json({ result });
    } catch (error) {
        // If an error occurred during any of the above three async
        // operations, send it on to the default error handler.
        next(error);
    }
});

// Start the server on the port specified in the environment or use a reasonable default.
const server = http.createServer(app);
const port = Number.parseInt(process.env['PORT'] || '') || 8080;
server.listen(port, () => console.log(`Listening with HTTP over port ${port}`));
