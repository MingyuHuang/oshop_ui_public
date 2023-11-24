const webpack = require('webpack');

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            $ENV: {
                PRODUCT_SERVICE_URL: JSON.stringify(process.env.PRODUCT_SERVICE_URL),
                ORDER_SERVICE_URL: JSON.stringify(process.env.ORDER_SERVICE_URL),
                USER_SERVICE_URL: JSON.stringify(process.env.USER_SERVICE_URL),
                RABBITMQ_URL: JSON.stringify(process.env.RABBITMQ_URL)
            }
        })
    ]
};