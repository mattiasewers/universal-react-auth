import express from 'express';
import session from 'express-session';
import { render } from '@jaredpalmer/after';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './graphql/schema';

import routes from '../shared/routes';

require('dotenv').config();

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .set('trust proxy', 1)
  .use(
    session({
      secret: process.env.RAZZLE_SECRET,
      resave: false,
      saveUninitialized: true
    })
  )
  .use((req, res, next) => {
    req.login = user => {
      req.session.user = user;
    };
    req.logout = () => {
      req.session.user = null;
    };
    next();
  })
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use(
    '/graphql',
    bodyParser.json(),
    graphqlExpress(req => ({
      schema,
      context: { user: req.session.user, login: req.login, logout: req.logout }
    }))
  )
  .use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
  .get('/*', async (req, res) => {
    try {
      const html = await render({
        req,
        res,
        routes,
        assets,
        headers: req.headers
      });
      res.send(html);
    } catch (error) {
      res.json(error);
    }
  });

export default server;
