var kafka = require('kafka-node')

exports.getProducer =  () => {
    var client = new kafka.KafkaClient("localhost:2181");
    var HighlevelProducer = kafka.HighLevelProducer;
    return new HighlevelProducer(client)
}

exports.getConsumer = (topicName) => {
    console.log(topicName)
    var client  = new kafka.KafkaClient("localhost:2181")
    var Consumer = kafka.Consumer
    var kafkaConsumer = new Consumer(client,[
        {topic:topicName,partition:0}
 
    ])
    return kafkaConsumer
}