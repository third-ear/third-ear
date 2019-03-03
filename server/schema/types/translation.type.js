import { GraphQLObjectType, GraphQLString } from 'graphql';


const TranslationType = new GraphQLObjectType(
  {
    name: 'Translation',
    fields: {
      text: { type: GraphQLString },
    }
  });

export default TranslationType;
