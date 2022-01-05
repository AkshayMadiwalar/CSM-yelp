const kafkaConnection = require('./connect')




const OrderService = require('./../src/service/orders.service')

kafkaConnection.getConsumer('orders',(consumer) => {
    var producer = kafkaConnection.getProducer()
    consumer.on('message', function (message) {
        console.log("----CONSUMED MESSAGE----\n",message.value)

        var data = JSON.parse(message.value)
    
        //handle data
        OrderService.placeOrder(data,(err,res)=>{
    
            var payload = {}
            if(err){
                console.log("err")
               payload ={
                status: 400,
                content : err,
                correlationId:data.correlationId
               } 
            }
    
            if(res){
                console.log("res")
                payload = {
                    status:200,
                    content:res,
                    correlationId:data.correlationId
                }
            }
    
            //Send Response to acknowledge topic
            payloads = [
                {topic:'acknowledge',messages:JSON.stringify({"acknowledgementpayload":true,payload}),partition:0}
            ]
            producer.send(payloads,(err,data)=>{
                if(err) throw err
                console.log("---Sent Acknowledegemt---\n",data)
            })
        })
    
    });
    
})
