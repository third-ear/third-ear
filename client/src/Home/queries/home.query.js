export const translateMutation = `
  mutation Translate($text: String!) {
    translate(text: $text) {
      text
    }
  }
`;
