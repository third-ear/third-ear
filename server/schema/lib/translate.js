import { Translate } from '@google-cloud/translate';

import Config from '../../config';


export async function translate(text) {
  const googleTranslate = new Translate({
    projectId: Config.gcpProjectId,
  });

  const target = 'zh';

  const [translatedText] = await googleTranslate.translate(text, target);
  return {
    text: translatedText,
  };
}
