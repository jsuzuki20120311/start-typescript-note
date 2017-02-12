import * as express from 'express';
import * as path from 'path';

const index = express.Router();
const sendIndexHtml = (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(__dirname, '../', 'public', 'index.html'));
};
index.get('/', sendIndexHtml);
index.get('/article-list', sendIndexHtml);
index.get('/article-editor', sendIndexHtml);
index.get('/update-article/:id', sendIndexHtml);

export default index;
