const hapi = require('hapi');
const mongoose = require('mongoose');
const Painting = require('./models/Painting');
const credentials = require('./credentials');

const { user, pass } = credentials;

mongoose.connect(
  `mongodb://${user}:${pass}@ds127362.mlab.com:27362/delf-ai-api-test`
);

mongoose.connection.once('open', () => {
  console.log('Connected to the database!');
});

const server = hapi.server({
  port: 4000,
  host: 'localhost'
});

const init = async () => {
  server.route([
    {
      method: 'GET',
      path: '/',
      handler: (request, reply) => {
        return 'Hola, mundo!';
      }
    },
    {
      method: 'GET',
      path: '/api/v1/paintings',
      handler: (request, reply) => {
        return Painting.find();
      }
    },
    {
      method: 'POST',
      path: '/api/v1/paintings',
      handler: (request, reply) => {
        const { name, url, techniques } = request.payload;

        const painting = new Painting({
          name,
          url,
          techniques
        });

        return painting.save();
      }
    }
  ]);

  await server.start();
  console.log(`Server running at ${server.info.uri}`)
};

init();
