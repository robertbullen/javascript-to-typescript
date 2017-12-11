# javascript-to-typescript

An example of how to get started with TypeScript by converting an existing JavaScript project.

## Functionality

This project implements a simple Node.js + Express server to perform basic arithmetic operations on two or more numbers.

## Project Structure

This repository contains two branches:

* _master_&mdash;The base implementation using JavaScript.
* _typescript_&mdash;The finished port of the project using TypeScript. Each commit in this branch represents a single conversion step, with the commit message acting as the explanation for what happened and why.

In both branches, there are three code files present:

| File | Description |
|---|---|
| index.(js\|ts) | This file is entry point of the server; it sets up an Express server and registers a request handler for '/calculate'. |
| payload.(js\|ts) | Code in this file is responsible for validating that the JSON payload sent by the client is of the expected format. |
| arithmetic.(js\|ts) | This file supplies the arithmetic operations. |

Both the payload validation and arithmetic operations return Promise-like objects to simulate the asynchronous nature typical of Node.js programming. Payload validation utilizes the [Joi](https://github.com/hapijs/joi) library.

## Starting the Server

After cloning this repository, simply run these commands to fire up the server:

```bash
npm install
npm start
```

These commands will work regardless of whether you're working in the _master_ or _typescript_ branch. In the _typescript_ branch, [ts-node](https://github.com/TypeStrong/ts-node) is executed instead of node.

## Invoking from a Client

Clients invoke arithmetic operations on the server by sending a POST message to the `/calculate` endpoint with a payload formatted something like this, which would result in the addition of 1 and 2:

```json
{
    "operation": "+",
    "operands": [1, 2]
}
```

One way to accomplish this is to use `curl` at the command line as follows:

```bash
curl 'http://localhost:8080/calculate' --silent --header 'Content-Type: application/json' --data '{"operation":"+","operands":[1,2]}' | json_pp
```

Piping to `json_pp` (JSON pretty print) is optional but yields a more readable console, especially because it adds a trailing newline so that `curl`'s output isn't buried at the beginning of the next command prompt.
