import Koa from 'koa';
import cors from '@koa/cors';
import Router from 'koa-router';
import graphqlHTTP from 'koa-graphql';
import { GraphQLSchema } from 'graphql';
import speech from '@google-cloud/speech';
import io from 'socket.io';
import http from 'http';
const environmentVars = require('dotenv').config();

import Query from './schema/query';
import Mutation from './schema/mutation';

const speechClient = new speech.SpeechClient();



// The encoding of the audio file, e.g. 'LINEAR16'
// The sample rate of the audio file in hertz, e.g. 16000
// The BCP-47 language code to use, e.g. 'en-US'
const encoding = 'LINEAR16';
const sampleRateHertz = 16000;
const languageCode = 'en-US'; //en-US
const request = {
  config: {
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
    profanityFilter: false,
    enableWordTimeOffsets: true,
  },
  interimResults: true
};

const schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

const app = new Koa();
app.use(cors());

const httpServer = http.createServer(app.callback());
const ioServer = io(httpServer);


// ioServer.start(server, options);

ioServer.on('connection', (socket) => {
  console.log('Client Connected to server');
  let recognizeStream = null;

  socket.on('join', function (data) {
    socket.emit('messages', 'Socket Connected to Server');
  });

  socket.on('messages', function (data) {
    socket.emit('broad', data);
  });

  socket.on('startGoogleCloudStream', function (data) {
    startRecognitionStream(this, data);
  });

  socket.on('endGoogleCloudStream', function (data) {
    stopRecognitionStream();
  });

  socket.on('binaryData', function (data) {
    console.log(data); //log binary data
    if (recognizeStream !== null) {
      recognizeStream.write(data);
    }
  });

  function startRecognitionStream(socket, data) {
    recognizeStream = speechClient.streamingRecognize(request)
      .on('error', console.error)
      .on('data', (data) => {
        process.stdout.write(
          (data.results[0] && data.results[0].alternatives[0])
            ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
            : `\n\nReached transcription time limit, press Ctrl+C\n`);
        socket.emit('speechData', data);

        // if end of utterance, let's restart stream
        // this is a small hack. After 65 seconds of silence, the stream will still throw an error for speech length limit
        if (data.results[0] && data.results[0].isFinal) {
          stopRecognitionStream();
          startRecognitionStream(socket);
          // console.log('restarted stream serverside');
        }
      });
  }

  function stopRecognitionStream() {
    if (recognizeStream) {
      recognizeStream.end();
    }
    recognizeStream = null;
  }
});

const router = new Router();
router.all('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

router.get('/', (ctx, next) => {
  // ctx.router available
});

app
  .use(router.routes())
  .use(router.allowedMethods());

httpServer.listen(3001);
