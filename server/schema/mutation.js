import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import TranslationType from './types/translation.type';
import { translate } from './lib/translate';


const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    translate: {
      type: TranslationType,
      args: {
        text: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        const { text } = args;

        return translate(text);
      }
    },
  }
});

export default Mutation;
