import { GraphQLObjectType, GraphQLString } from 'graphql';

import UserType from './types/user.type';


const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    updateName: {
      type: UserType,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        const { id, name } = args;

        return { id: '0', name: 'Rose' };
      }
    }
  }
});

export default Mutation;
