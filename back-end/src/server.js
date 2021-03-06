/* eslint-disable no-console */
require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Inert = require('@hapi/inert');
const path = require('path');

// Users
const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');

// Foods
const foods = require('./api/foods');
const FoodsService = require('./services/postgres/FoodsService');
const FoodsValidator = require('./validator/foods');

// Exceptions
const ClientError = require('./api/exceptions/ClientError');
const TokenManager = require('./tokenize/TokenManager');

// Uploads
const uploads = require('./api/uploads');
const StorageService = require('./services/storage/StorageService');
const UploadsValidator = require('./validator/uploads');

// Cloud Storage
const { Storage } = require('@google-cloud/storage');

// History Service
const HistoryService = require('./services/postgres/HistoryService');

// Swagger
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');

const init = async () => {
  const usersService = new UsersService();
  const foodsService = new FoodsService();
  const historyService = new HistoryService();
  const projectId = process.env.GCP_PROJECT_ID;
  const keyFilename = process.env.GCS_AUTH_PATH;
  const cloudStorage = new Storage({ projectId, keyFilename });
  const storageService = new StorageService(path.resolve(__dirname, 'api/uploads/file/images'), cloudStorage);

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  const swaggerOptions = {
    info: {
      title: 'RASA API Documentation',
      description: 'This is API for RASA Application. RASA is application for analyze name of the Indonesian traditional food by image',
      version: '1',
    },
    definitionPrefix: 'useLabel',
    reuseDefinitions: true,
  };

  await server.register([
    {
      plugin: Jwt,
    }, {
      plugin: Inert,
    }, {
      plugin: Vision,
    }, {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]);


  server.auth.strategy('rasa_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;
    if (response.isBoom) {
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'error',
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }

      if (response.isServer) {
        console.error(response);
        const newResponse = h.response({
          status: 'error',
          message: 'Maaf, terjadi kegagalan pada server kami.',
        });
        newResponse.code(500);
        return newResponse;
      }
      console.error(response);
      return response.continue || response;
    }
    return response.continue || response;
  });

  await server.register([
    {
      plugin: users,
      options: {
        userService: usersService,
        validator: UsersValidator,
        tokenManager: TokenManager,
        historyService,
        foodService: foodsService,
      },
    }, {
      plugin: foods,
      options: {
        service: foodsService,
        validator: FoodsValidator,
      },
    }, {
      plugin: uploads,
      options: {
        storageService,
        foodService: foodsService,
        historyService,
        uploadValidator: UploadsValidator,
        userValidator: UsersValidator,
        tokenManager: TokenManager,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
