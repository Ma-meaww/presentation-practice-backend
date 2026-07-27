import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Presentation Practice API",
      version: "1.0.0",
      description: "API document for Flutter + Express + MongoDB project"
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
  apis: ["./routes/*.js"]
}

const swaggerSpec = swaggerJSDoc(swaggerOptions)

export { swaggerUi, swaggerSpec }