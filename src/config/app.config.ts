export const config = () => ({
    port: +process.env.PORT || 80,
    httpTimeout: +process.env.HTTP_TIMEOUT || 10000,
    httpMaxRedirects: +process.env.HTTP_MAX_REDIRECTS || 3,
    executionRetries: +process.env.EXECUTION_RETRIES || 2,
    executionBaseDelay: +process.env.EXECUTION_BASE_DELAY || 1000,
    
    siproadAdminHost: process.env.SIPROAD_ADMIN_HOST,
    siproadAdminApiKey: process.env.SIPROAD_ADMIN_API_KEY,

    siproadProductsHost: process.env.SIPROAD_PRODUCTS_HOST,
    siproadProductsApiKey: process.env.SIPROAD_PRODUCTS_API_KEY,

    siproadSalesHost: process.env.SIPROAD_SALES_HOST,
    siproadSalesApiKey: process.env.SIPROAD_SALES_API_KEY,
    
    jwtSecret: process.env.JWT_SECRET
  })