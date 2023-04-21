import express from 'express';
import path from 'path'
import { fileURLToPath } from 'url';

import { renderToString } from 'vue/server-renderer';
import { createApp } from '../client/app.js'
import { routes } from '../client/router.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();
const port = process.env.PORT || 8080;
const publicLocation = express.static(path.join(__dirname,'../../dist/public'));

/**
 * Generates server routes out of client side routing engine.
 * @param {*} route 
 * @param {*} parentRoutePath 
 */
const generateServerRoutes = function(route, parentRoutePath) {
  let routePath = `${route.path}`;
  if (parent) {
    routePath = path.join(parentRoutePath, routePath)
  }

  generateServerRoute(routePath);

  if (route.children && route.children.length) {
    route.children.forEach(x => generateServerRoutes(x, routePath))
  }
}

/**
 * Registers route in the server routing engine.
 * @param {*} routePath 
 */
const generateServerRoute = function(routePath) {
  console.log(`Generating runtime location at: ${routePath}`)
  server.get(routePath, handleServerRouting);
}

/**
 * Sets the application's state based on current request url, by matching it
 * a route configured inside the client router. 
 * @param {*} context 
 * @returns 
 */
const routeApplication = function (context) {
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

/**
 * Common handling function that server side renders a vue routed application,
 * and injects that into a common template ejs. 
 * @param {*} req 
 * @param {*} res 
 */
function handleServerRouting(req, res) {
  const context = { url: req.url };

  // todo: error handling missing
  routeApplication(context).then(app => {
    renderToString(app).then((html) => {
      res.render(path.join(__dirname, './index.ejs'), { html });
    });
  });
}

routes.forEach(x => generateServerRoutes(x, null));

server.set('view engine', 'ejs');
server.use(publicLocation);

server.listen(port, () => {
  console.log('Server started at http://localhost:' + port);
});
