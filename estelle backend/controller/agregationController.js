const user = require('../model/user.js')
const product = require('../model/product.js')
const order = require('../model/order.js')
const responsemsgs = require('../utilities/responseMsgs.js')
const aggregation = async(req,res)=>{
    let totaluser = await user.estimatedDocumentCount()
    let totalproduct = await product.estimatedDocumentCount()
    let mostsoldproduct = await product.find().sort({soldQantity :-1}).limit(3)
    let usertoorder = await user.find().sort({numberOfOrders :-1}).limit(3)
    let orederisdone = await order.aggregate([
        {
        $group:
        {
            _id:"$isDone",
        }
        },{
            $count
        }
    ])
    res.json({ statues:responsemsgs.SUCCESS,
        data: totalproduct,totaluser,mostsoldproduct,usertoorder , orederisdone
    })
    
}
module.exports= {aggregation}