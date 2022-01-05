const kafkaRequestResponse = require('./kafkaRequestResponse')
const kafka = new kafkaRequestResponse()

exports.sendKafkaRequest = (topicName,payload,cb) => {
    kafka.kafkaRequest(topicName,payload,(err,res)=>{
        if(err) return cb(err,null)
        return cb(null,res)
    })
}