import * as bodyParser    from 'body-parser';
import * as connectLogger from 'connect-logger';
import * as express       from 'express';
import * as http          from 'http';

import {Operation,
        Operations} from './arithmetic';
import {Payload}    from './payload';

// Create the Express application and register some useful middleware.
const app: express.Application = express();
app.use(connectLogger());
app.use(bodyParser.json());

// Add a handler for '/calculate'.
app.post('/calculate', async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    try {
        // First make sure that client payload is of the expected format.
        const payload: Payload = await Payload.validate(req.body);

        // Then get the function that implements the arithmetic operation and
        // invoke it with the client-provided operands.
        const operation: Operation = Operations.instance[payload.operation];
        const result: number = await operation(payload.operands);

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
const server: http.Server = http.createServer(app);
const port: number = Number.parseInt(process.env['PORT'] || '') || 8080;
server.listen(port, () => console.log(`Listening with HTTP over port ${port}`));
