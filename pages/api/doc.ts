import { withSwagger } from 'next-swagger-doc';
const swaggerHandler = withSwagger({
    openApiVersion: '3.0.0',
    title: 'BrowserStack Demo API',
    version: '1.0.0',
    apiFolder: 'pages/api',
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Next with Mongo Demo API',
            version: '1.0.0',
            description: 'Next with Mongo Demo API',
        }
    }
});
export default swaggerHandler();