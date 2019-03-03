import React from 'react';
import { Tooltip } from 'react-tippy';


function Word(props) {
  const {
    translation,
    word,

    translate,
  } = props;

  function onEnterWord() {
    translate({ text: word });
  }

  const { text } = translation || {};

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
