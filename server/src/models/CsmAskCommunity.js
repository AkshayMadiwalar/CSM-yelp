var db = require('../../config/db')

exports.askQuestion = ({poiId,question,questionBy,answer,isAnswered,answered_by},result) => {
    const sql = `insert into csm_poi_ask_community(poi_id,question,question_by,answer,is_answered,answered_by)
                values('${poiId}','${question}','${questionBy}','${answer}','${isAnswered}','${answered_by}')`
    console.log(sql)
    db.query(sql,(err,res)=>{
        if(err) {
            console.log(err)
            return result(err,now)
        }
        return result(null,res)
    })
}
