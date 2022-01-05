const CsmPoiAskCommunity = require('./../models/CsmAskCommunity')

exports.newQuestion = (req,res) => {
    const {poiId,question} = req.body
    const questionBy = req.user.id 
    const answer = ""
    const isAnswered = 0
    const answered_by = ""
    CsmPoiAskCommunity.askQuestion({poiId,question,questionBy,answer,isAnswered,answered_by},(err,data)=>{
        if(err) return res.status(500).json({message:err.message})
        return res.json(data)
    })
}