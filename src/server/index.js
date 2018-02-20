import express from 'express';
import { render } from '@jaredpalmer/after';
import { graphqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './graphql/schema';

import routes from '../shared/routes';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
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
