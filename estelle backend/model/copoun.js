const mongoose = require('mongoose')
let  copounschema = mongoose.Schema({
    copounName:String,
    copounCategory:String,
    copounPercent:Number,
    copounExpire:Date
})
let copounmodel = mongoose.model('Copoun',copounschema)
module.exports = copounmodel