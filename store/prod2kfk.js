var kafka = require('../../../../Library/Caches/typescript/2.9/node_modules/@types/kafka-node');
var HighLevelProducer = kafka.HighLevelProducer;
const client = new kafka.KafkaClient({kafkaHost: 'localhost:9092'});
var argv = require('../../../../Library/Caches/typescript/2.9/node_modules/@types/optimist').argv;
var topic = argv.topic || 'test';
var count = 10;
var rets = 0;
var producer = new HighLevelProducer(client);

module.exports = function (context, req) {
    // Create the producer
    var producer = new kafka.Producer(client, {requireAcks: 1});

    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.name || (req.body && req.body.name)) {
        var name = req.query.name || req.body.name
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + name
        };
        // Create the payload, using the name as the body
        var payloads = [
                { topic: topic, messages: [name]}
        ];
        context.log("calling producer.send");
        // Send the data to Kafka
        producer.send(payloads, function(err, data) {
            if(err) {
                context.log(err);
            } else {
                context.log(data);
            }
        });
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
    context.done();
};
