const  {body} = require('express-validator')
const validatedproduct = ()=>{
    return [
        body('productName').notEmpty().withMessage("ProductName can't be fadiii") ,
        body('productPrice').notEmpty().withMessage("ProductPrice can't be fadiii")
    ]
}
module.exports= validatedproduct