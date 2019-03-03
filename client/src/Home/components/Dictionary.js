import React from 'react';


function Dictionary(props) {
  const {
    translation,
    translate,
  } = props;

  function onTranslate() {
    translate({ text: 'hello' });
  }

  console.log('translation', translation);
  const { text } = translation || {};

  return (
    <div>
      {text}
      <button onClick={onTranslate}>
        Translate
      </button>
    </div>
  );
}

export default Dictionary;
