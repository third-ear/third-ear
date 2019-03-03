import { Translate } from '@google-cloud/translate';

import Config from '../../config';


export async function translate(languageId, text) {
  const googleTranslate = new Translate({
    projectId: Config.gcpProjectId,
  });

  const [translatedText] = await googleTranslate.translate(text, languageId);
  return {
    text: translatedText,
  };
}
