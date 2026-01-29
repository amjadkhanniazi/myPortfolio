import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Portfolio API Documentation',
      version: '1.0.0',
      description: 'Complete API documentation for Portfolio Management System',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server'
      },
      {
        url: 'https://my-portfoliooooo.vercel.app',
        description: 'Production server (Update after deployment)'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token in the format: Bearer <token>'
        }
      }
    },
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication endpoints'
      },
      {
        name: 'Profile',
        description: 'User profile management endpoints'
      }
    ]
  },
  apis: ['./src/routes/*.js'] // Path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
