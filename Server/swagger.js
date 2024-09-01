const swaggerJsDoc = require('swagger-jsdoc');
const { getSequelizeSchema } = require('./sequelize-json-schema.js');
const sequelize = require('./config/database.js');
const {  } = require('./Models/index.js');

let modulesSchemas = getSequelizeSchema(sequelize,{ref:"components/schemas"}).definitions;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'LMS APIs Documentation',
            version: '1.0.0',
            description: 'A simple express library for LMS APIs',
        },
        components: {
            securitySchemes: {
              bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT', // optional, but recommended
              },
            },
            schemas:{
                ...modulesSchemas
            }
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
    },
    apis: ['./Routes/*.js'], // files containing annotations as above
}

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
