import express from 'express';
import path from 'path'
import { fileURLToPath } from 'url';

import { renderToString } from 'vue/server-renderer';
import { createApp } from '../client/app.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();
const port = process.env.PORT || 8080;

server.get('/', (req, res) => {
    const app = createApp();
  
    renderToString(app).then((html) => {
      res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Vue SSR Example</title>
          <script type="importmap">
            {
              "imports": {
                "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
              }
            }
          </script>
          <script type="module" src="/client.js"></script>
        </head>
        <body>
          <div id="app">${html}</div>
        </body>
      </html>
      `);
    });
  });

server.use(express.static(path.join(__dirname,'../client')));

server.listen(port, () => {
  console.log('Server started at http://localhost:' + port);
});