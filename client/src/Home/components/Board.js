import React, { lazy, useEffect, useState } from 'react';
import io from 'socket.io-client';

import Config from '../../config';
import './Board.css';


const TeTranslationSettings = lazy(() => import('./TranslationSettings'));
const TeWords = lazy(() => import('./Words'));


function Board(props) {
  const {
    activeLanguageId,
    translation,

    selectLanguage,
    translate,
  } = props;

  const [allText, setAllText] = useState('');
  const [partText, setPartText] = useState('');
  const [isRecognizing, setIsRecognizing] = useState(false);

  const socket = io(Config.socketUrl);
  const AudioContext = window.AudioContext || window.webkitAudioContext;

  let text = '';
  const bufferSize = 2048;
  let context;
  let processor;
  let input;
  let stream;
  let streamStreaming = false;

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('join', 'Server Connected to Client');
    });

    socket.on('speechData', (data) => {
      if (data.results == null) return;

      console.log('data', data);
      const isFinalText = data.results[0].isFinal;

      const newPartText = getPartText(data);
      setPartText(newPartText);

      if (isFinalText) {
        text = `${text} ${newPartText}`;
        setPartText('');
        setAllText(text);
      }
    });

    return () => {
      handleStopRecording();

      if (streamStreaming) {
        socket.emit('endGoogleCloudStream', '');
      }
    };
  }, []);


  async function initRecording() {
    socket.emit('startGoogleCloudStream', ''); //init socket Google Speech Connection
    streamStreaming = true;
    context = new AudioContext();
    processor = context.createScriptProcessor(bufferSize, 1, 1);
    processor.connect(context.destination);
    context.resume();

    stream = await navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: false
      });

    input = context.createMediaStreamSource(stream);
    input.connect(processor);

    processor.onaudioprocess = (e) => {
      microphoneProcess(e);
    };
  }

  function microphoneProcess(e) {
    const left = e.inputBuffer.getChannelData(0);
    const left16 = downsampleBuffer(left, 44100, 16000);
    socket.emit('binaryData', left16);
  }

  async function handleStartRecording() {
    await initRecording();
    setIsRecognizing(true);
  }

  function handleStopRecording() {
    streamStreaming = false;
    socket.emit('endGoogleCloudStream', '');

    let track = stream.getTracks()[0];
    track.stop();

    input.disconnect(processor);
    processor.disconnect(context.destination);
    context.close().then(function () {
      input = null;
      processor = null;
      context = null;
    });

    setIsRecognizing(false);
  }


  function getPartText(speechData) {
    return speechData.results.map(r => r.alternatives[0].transcript).join(' ');
  }

  function downsampleBuffer(buffer, sampleRate, outSampleRate) {
    if (outSampleRate === sampleRate) {
      return buffer;
    }

    // if (outSampleRate > sampleRate) {
    //   throw 'downsampling rate show be smaller than original sample rate';
    // }

    const sampleRateRatio = sampleRate / outSampleRate;
    const newLength = Math.round(buffer.length / sampleRateRatio);
    const result = new Int16Array(newLength);
    let offsetResult = 0;
    let offsetBuffer = 0;

    while (offsetResult < result.length) {
      const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
      let accum = 0;
      let count = 0;
      for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
        accum += buffer[i];
        count++;
      }

      result[offsetResult] = Math.min(1, accum / count) * 0x7FFF;
      offsetResult++;
      offsetBuffer = nextOffsetBuffer;
    }
    return result.buffer;
  }

  function renderControl() {
    if (isRecognizing === false) {
      return (
        <button
          className="button is-primary te-button"
          type="button"
          onClick={handleStartRecording}
        >
          Listen
        </button>
      );
    }

    return (
      <button
        className="button is-danger te-button"
        type="button"
        onClick={handleStopRecording}
      >
        Stop
      </button>
    );
  }

  const words = allText.split(' ');

  return (
    <div className="te-board">
      <div className="te-controls">
        {renderControl()}

        <TeTranslationSettings
          selectLanguage={selectLanguage}
        />
      </div>

      <div className="te-subtitle">
        <TeWords
          activeLanguageId={activeLanguageId}
          translation={translation}
          words={words}

          translate={translate}
        />
        <div>
          {partText}
        </div>
      </div>
    </div>
  );
}

export default Board;
