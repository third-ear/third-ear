import React, { lazy } from 'react';
import uuidv4 from 'uuid/v4';

import './Words.css';


const TeWord = lazy(() => import('./Word'));


function Words(props) {
  const {
    translation,
    words,

    translate,
  } = props;

  function renderWords() {
    return words.map(word => {
      const key = `key-${uuidv4()}`;


      // return (
      //   <TeWord
      //     key={key}
      //     word={word}
      //
      //     translate={translate}
      //   />
      // );

      return (
        <TeWord
          key={key}
          translation={translation}
          word={word}

          translate={translate}
        />
      );
    })
  }

  return (
    <div className="te-words">
      {renderWords()}
    </div>
  );
}

export default Words;
