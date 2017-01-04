'use strict';

import * as express from 'express';
import * as http from 'http';
import { Router } from './Router';

const app = (new Router()).routing(express());
const server = http.createServer(app);

server.listen(3000, () => {
  console.log('Server run!');
});
