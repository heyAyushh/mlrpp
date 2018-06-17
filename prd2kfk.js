var kafka = require('../../Library/Caches/typescript/2.9/node_modules/@types/kafka-node');
var HighLevelProducer = kafka.HighLevelProducer;
const client = new kafka.KafkaClient({kafkaHost: 'localhost:9092'});
var argv = require('../../Library/Caches/typescript/2.9/node_modules/@types/optimist').argv;
var topic = argv.topic || 'test';
var count = 10;
var rets = 0;
var producer = new HighLevelProducer(client);

producer.on('ready', function () {
  var message = new Date().toString();
  producer.send([
    {topic: topic, messages: [message]}
  ], function (err, data) {
    if (err) console.log(err);
    else console.log('send %d messages', ++rets);
    process.exit();
  });
});

producer.on('error', function (err) {
  console.log('error', err);
});