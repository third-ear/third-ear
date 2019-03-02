import { GraphQLObjectType, GraphQLString } from 'graphql';

import UserType from './types/user.type';


const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const { id } = args;

        return { id: '0', name: 'Jack' };
      }
    }
  }
});

export default Query;
