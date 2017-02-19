import * as bodyParser from 'body-parser';
import * as ejs from 'ejs';
import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import api from './routes/api';
import index from './routes/index';


/**
 * Expressアプリケーションオブジェクト
 * @type {Express}
 */
const app = express();

// ファビコンを設定
app.use(favicon(__dirname + '/public/favicon.png'));

// テンプレートエンジンに ejs を使用するための設定
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 静的ファイルのルーティング
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', api);

// ４０４のルーティング
app.use((req, res, next) => {
  const err = {
    status: 404,
    message: 'Not Found'
  };
  next(err);
});

// エラーハンドラー
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  err.status = err.status || 500;
  res.status(err.status);
  if (req.xhr) {
    res.send(err);
  } else {
    res.render('error', err);
  }
});


const server = http.createServer(app);
const port = normalizePort(process.env.PORT || '3000');
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}


/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: any) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}


/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
  console.log(addr + bind);
}
