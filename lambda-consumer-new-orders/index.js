const axios = require('axios');

// Here we should put the application load balancer URL
// for the fargate instances
 const ordersApiProcessorURL = 'http://ec2-34-203-102-206.compute-1.amazonaws.com:3000/v1/orders/process';
 // const ordersApiProcessorURL = 'http://localhost:3000/v1/orders/process';

const handler = async (event) => {
    // Extract SQS Message and parse as JSON object
    const [ data ] = event.Records;
    let { body } = data;
    const orderData = JSON.parse(body);

    await axios.post(ordersApiProcessorURL, orderData, {
        headers: {
            Authorization: `Bearer ${ orderData.authorization}`
        }
    }).catch((err) => {
        console.log(err.response.data);
        console.log(err.response.status);
        throw err;
    });
};

exports.handler = handler;
