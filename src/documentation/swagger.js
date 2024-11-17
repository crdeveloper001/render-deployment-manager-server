// swagger.js
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0', // Specify OpenAPI version
        info: {
            title: 'API Documentation', // API title
            version: '1.0.0', // API version
            description: 'API documentation for our application',
        },
        servers: [
            {
                url: 'http://localhost:4500', // Your server URL
            },
        ],
    },
    apis: ['../routes/routes-config.js'], // Paths to files containing OpenAPI definitions
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

module.exports = swaggerSpec;
