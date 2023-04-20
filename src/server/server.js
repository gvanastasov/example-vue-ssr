import express from 'express';
import path from 'path'
import { fileURLToPath } from 'url';

import { renderToString } from 'vue/server-renderer';
import { createApp } from '../client/app.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();
const port = process.env.PORT || 8080;

const routeHandler = function (context) {
  return new Promise((resolve, reject) => {
    const { app, router } = createApp({ isServer: true })

    router.push(context.url)

    router.isReady().then(() => {
      const matchedComponents = router.currentRoute.value.matched.flatMap(record =>
        Object.values(record.components)
      )

      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      resolve(app)
    }).catch(reject)
  })
}

server.set('view engine', 'ejs');

// todo: we should probably use router obj to determine routes, and not
// use a catch all...
server.get('/', (req, res) => {
  const context = { url: req.url }
  routeHandler(context).then(app => {
    renderToString(app).then((html) => {
      res.render(path.join(__dirname, './index.ejs'), { html })
    });
  })
});

server.get('/about', (req, res) => {
  const context = { url: req.url }
  routeHandler(context).then(app => {
    renderToString(app).then((html) => {
      res.render(path.join(__dirname, './index.ejs'), { html })
    });
  })
})

server.use(express.static(path.join(__dirname,'../../dist/public')));

server.listen(port, () => {
  console.log('Server started at http://localhost:' + port);
});