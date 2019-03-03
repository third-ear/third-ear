import React from 'react';
import { Tooltip } from 'react-tippy';


function Word(props) {
  const {
    activeLanguageId,
    translation,
    word,

    translate,
  } = props;

  function onEnterWord() {
    translate({
      languageId: activeLanguageId,
      text: word,
    });
  }

  const { text } = translation || {};

  if (activeLanguageId == null) {
    return (
      <div className="te-word" >
        {word}
      </div>
    );
  }

  return (
    <Tooltip
      title={text}
      animation="fade"
      arrow
      delay={50}
      position="bottom"
      style={{ display: 'flex' }}
    >
      <div
        className="te-word"

        onMouseEnter={onEnterWord}
      >
        {word}
      </div>
    </Tooltip>
  );
}

export default Word;
