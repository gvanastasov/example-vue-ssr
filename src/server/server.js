import express from 'express';
import path from 'path'
import { fileURLToPath } from 'url';

import { renderToString } from 'vue/server-renderer';
import { createApp } from '../client/app.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();
const port = process.env.PORT || 8080;

server.set('view engine', 'ejs');

server.get('/', (_req, res) => {
  const app = createApp();

  renderToString(app).then((html) => {
    res.render(path.join(__dirname, './index.ejs'), { html })
  });
});

server.use(express.static(path.join(__dirname,'../../dist/public')));

server.listen(port, () => {
  console.log('Server started at http://localhost:' + port);
});