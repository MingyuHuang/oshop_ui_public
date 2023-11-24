export const environment = {
   // production: false,
   // alipayEndpoint: '/api/ali-pay/trade/page/pay',
   // productServiceUrl: 'http://127.0.0.1:8082',
   // orderServiceUrl: 'http://127.0.0.1:8083',
   // userServiceUrl: 'http://127.0.0.1:8084',
   // rabbitmqUrl: 'ws://127.0.0.1:15674/ws'
    production: true,
    alipayEndpoint: '/api/ali-pay/trade/page/pay',
    productServiceUrl: $ENV.PRODUCT_SERVICE_URL,
    orderServiceUrl: $ENV.ORDER_SERVICE_URL,
    userServiceUrl: $ENV.USER_SERVICE_URL,
    rabbitmqUrl: $ENV.RABBITMQ_URL

}
