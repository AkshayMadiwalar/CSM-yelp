const kafkaConnection = require('./connect')
const uuid = require('uuid').v4

module.exports = class kafkaRequestResponse {

    requests = {}
    constructor() {}

    consumer = kafkaConnection.getConsumer('acknowledge')

    kafkaRequest(topicName,payload,results){
        var producer = kafkaConnection.getProducer()

        const correlationId = uuid()
        var entry = {
            results: results
        }
        this.requests[correlationId] = entry
        
        this.kafkaResponse(function(){
            producer.on('ready', function () {
                let payloads = [
                    { topic: topicName, messages: JSON.stringify({ payload, correlationId }), partition: 0 },
                ];
                console.log(payloads)
                producer.send(payloads, function (err, data) {
                    console.log('err',err)
                    console.log('data',data);
                });
            });
        }
        )

    }
    



    kafkaResponse(next){
        let requestsWaiting = this.requests
        this.consumer.on('message', function (message) {
            console.log("Acknowledgement recieved :",message)

            var acknowledgementData = JSON.parse(message.value)
            var correlationId = acknowledgementData.payload.correlationId

            if (correlationId in requestsWaiting) {

                console.log("yes yes")
                var entry = requestsWaiting[correlationId]

                delete requestsWaiting[correlationId]

                if(acknowledgementData.payload.status === 200){
                    console.log("200",acknowledgementData.payload.content)
                    return entry.results(null, acknowledgementData.payload.content)
                }

                if(acknowledgementData.payload.status === 400){
                    return entry.results(acknowledgementData.payload.content, null)   
                }

                entry.results('Server Error', null)   
            }
        });
        this.requests = requestsWaiting
        return next()
    }
}


// const kafkaResponse = (next) => {
//     console.log("------------------------- conusmer acknowledge")
//     console.log("Requests: ", requests)
//     consumer.on('message', function (message) {
//         console.log("message consumed:", message);
//         var acknowledegemtData = JSON.parse(message.value)
//         if (acknowledegemtData.data.correlationId in requests) {
//             var entry = requests[acknowledegemtData.data.correlationId]
//             delete requests[acknowledegemtData.data.correlationId]
//             entry.results(null, acknowledegemtData.data)
//         }
//     });
//     next()
// }


// exports.kafkaRequest = (topicName, payload, results) => {
//     var producer = kafkaConnection.getProducer()

//     const correlationId = uuid()
//     var entry = {
//         results: results
//     }
//     requests[correlationId] = entry

//     this.kafkaResponse(() => {
//         producer.on('ready', function () {
//             payloads = [
//                 { topic: topicName, messages: JSON.stringify({ payload, correlationId }), partition: 0 },
//             ];
//             producer.send(payloads, function (err, data) {
//                 console.log(data);
//             });
//         });
//     })
//     results("error", null)
// }