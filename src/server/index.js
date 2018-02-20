import express from 'express';
import { render } from '@jaredpalmer/after';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import jwt from 'express-jwt';
import schema from './graphql/schema';

import routes from '../shared/routes';

require('dotenv').config();

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use(
    '/graphql',
    jwt({ secret: process.env.RAZZLE_SECRET, credentialsRequired: false }),
    bodyParser.json(),
    graphqlExpress(req => ({ schema, context: { user: req.user } }))
  )
  .use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
  .get('/*', async (req, res) => {
    try {
      const html = await render({
        req,
        res,
        routes,
        assets
      });
      res.send(html);
    } catch (error) {
      res.json(error);
    }
  });

export default server;
