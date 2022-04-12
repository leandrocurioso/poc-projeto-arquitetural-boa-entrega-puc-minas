class SqsService {
  constructor({ awsSdk, queueUrl }) {
    this.awsSdk = awsSdk;
    this.queueUrl = queueUrl;
    this.sqs = new this.awsSdk.SQS();
  }

  send(data) {
    return new Promise((resolve, reject) => {
      this.sqs.sendMessage({
        MessageBody: JSON.stringify(data),
        QueueUrl: this.queueUrl,
        DelaySeconds: 0
      }, (_err, _data) => {
        if(_err) return reject(_err);
        return resolve(_data);
       });
    });
  }
  
}

module.exports = SqsService;
