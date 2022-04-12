const axios = require('axios');

// Here we should put the application load balancer URL
// for the fargate instances
const billingApiProcessorURL ='http://ec2-34-203-102-206.compute-1.amazonaws.com:3001/v1/deliveries/process';
// const billingApiProcessorURL ='http://localhost:3001/v1/deliveries/process';

const handler = async (event) => {
    // Extract SQS Message and parse as JSON object
    const [ data ] = event.Records;
    let { body } = data;
    const orderData = JSON.parse(body);

    await axios.post(billingApiProcessorURL, orderData, {
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
