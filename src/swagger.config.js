const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDefinition = {
openapi: '3.0.0',
info: {
title: 'Zidio group 79',
version: '1.0.0',
description: 'Location API',
},
contact: {
    name: "Strange Dev"
  },
  servers: []

};

const options = {
swaggerDefinition,
basedir: `${__dirname}`,
apis: ["./routes/*.route.js"], // Path to the API routes in your Node.js application
// apis: [path.join(process.cwd(), './src/routes/*.route.js')]

};



const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;