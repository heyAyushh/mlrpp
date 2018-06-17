var kafka = require("../node_modules/kafka-node");
var HighLevelProducer = kafka.HighLevelProducer;
const client = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
var argv = require("optimist").argv;
var topic = argv.topic || "mlrpp";
var count = 10;
var rets = 0;
var producer = new HighLevelProducer(client);
var feed = {}; // data with time stamp
var timestamp = require("time-stamp");

timestamp("YYYYMMDDTHHmmssZ");

var axios = require("axios");
var url = "https://ussouthcentral.services.azureml.net/workspaces/0d4abea85c684bdf9e30d5d2b35f96c1/services/5a75fdb24bd2453ca42a292ce8252533/execute?api-version=2.0&format=swagger&key=pzs4wTSHHfgDycFrzpeIMn6ISp4LPsJdT+ND83gLnlHnBH6Is2G78xPAkfhmuaihTg9b3zJ4/2IvI/HVnbViZw==";
var config = {
  headers: {
    Authorization:
      "Bearer pzs4wTSHHfgDycFrzpeIMn6ISp4LPsJdT+ND83gLnlHnBH6Is2G78xPAkfhmuaihTg9b3zJ4/2IvI/HVnbViZw==",
    "Content-Type": "application/json"
  }
};

var data =         {"Inputs": {
  "input1":
  [
      {
              "temperature": "25.0",   
              "humidity": "85" 
      }
  ]
}
}

module.exports = function(context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");
  if (req.query) {
    data.Inputs.input1[0].temperature = req.query.temp;
    data.Inputs.input1[0].humidity = req.query.humid;

    axios
      .post(url, data, config, producer)
      .then(function(response) {
        context.log(response.data.Results.output1[0]);
        feed = response.data.Results.output1[0];
        feed.timestamp = timestamp("YYYYMMDDTHHmmssZ");
        context.res = {
          body: feed
        };
        var message = JSON.stringify(feed);
        producer.send([{ topic: topic, messages: [message] }], function(
          err,
          data
        ) {
          if (err) console.log(err);
          else console.log("send %d messages", ++rets);
          context.done();
        });
      })
      .catch(function(error) {
        console.log(error);
        context.done();
      });
  } else {
    context.res = {
      status: 400,
      body: "Please pass a name on the query string or in the request body"
    };
    context.done();
  }
};