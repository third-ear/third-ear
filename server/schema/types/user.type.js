import { GraphQLObjectType, GraphQLString } from 'graphql';


const UserType = new GraphQLObjectType(
  {
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
  }
});

export default UserType;
