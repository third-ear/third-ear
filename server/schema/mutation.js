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
        languageId: { type: new GraphQLNonNull(GraphQLString) },
        text: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        const {
          languageId,
          text,
        } = args;

        return translate(languageId, text);
      }
    },
  }
});

export default Mutation;
