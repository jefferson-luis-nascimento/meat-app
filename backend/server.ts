import * as fs from 'fs';
import * as https from 'https';
import * as express from 'express';
import * as jsonServer from 'json-server';
import { handleAuthentication } from './auth';
import { handlleAuthorization } from './authz';

const server = express();

const router = jsonServer.router('db.json');

const middlewares = jsonServer.defaults();

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

server.post('/login', handleAuthentication);

server.use('/orders', handlleAuthorization);

// Use default router
// tslint:disable-next-line: no-trailing-whitespace
server.use(router);  

const options = {
  cert: fs.readFileSync('./backend/keys/cert.pem'),
  key: fs.readFileSync('./backend/keys/key.pem'),
};


https.createServer(options, server).listen(3001, () => {
  console.log('JSON Server is running on https://localhost:3001');
});
