import Koa from 'koa';
import cors from '@koa/cors';
import Router from 'koa-router';
import graphqlHTTP from 'koa-graphql';
import { GraphQLSchema } from 'graphql';

import Query from './schema/query';
import Mutation from './schema/mutation';


const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});

const app = new Koa();
app.use(cors());

const router = new Router();
router.all('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

router.get('/', (ctx, next) => {
  // ctx.router available
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3001);
