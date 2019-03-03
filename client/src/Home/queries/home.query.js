export const translateMutation = `
  mutation Translate($languageId: String!, $text: String!) {
    translate(languageId: $languageId, text: $text) {
      text
    }
  }
`;
