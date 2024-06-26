const placeorder = require("../model/order.js");
const user = require("../model/user.js");
const Product = require("../model/product.js");
const responsemsgs = require("../utilities/responseMsgs.js");
const responce = require("../utilities/httpresponemsg.js");
const getUserDateFromToken = require("../utilities/getUserDateFromToken.js");
let addorder = async (req, res) => {
  try {
    let data = await req.body;
    let userDate = await getUserDateFromToken(req);
    let checkuser = await user.findOne({ _id: userDate._id });
    if (!checkuser) {
      throw "User Not Found";
    } else {
      let ppalceorder = await new placeorder({
        userId: userDate._id,
        orderProduct: data.orderProduct,
        orderPrice: data.orderPrice,
        paymentType: data.paymentType,
        startDate: Date.now(),
      });
      let done = ppalceorder.save();
      if (!done) {
        throw "Something Went Wrong,Please Try Again";
      } else {
        let icrement1 = await user.updateOne(
          { _id: userDate._id },
          {
            $inc: { numberOfOrders: 1 },
          }
        );
        let checkproduct = await data.orderProduct;

        let icrement3;
        let icrement4;
        checkproduct?.map(async (e) => {
          // console.log(e.number);
          icrement3 = await Product.updateOne(
            { _id: e.id },
            {
              $inc: { soldQantity: e.number },
            }
          );
          icrement4 = await Product.updateOne(
            { _id: e.id },
            {
              $inc: { productQuantity: -e.number },
            }
          );
        });
        if (icrement1.modifiedCount != 1) {
          throw "something went wrong";
        } else {
          responce(
            res,
            200,
            responsemsgs.SUCCESS,
            { meassge: "Successfully Added", datas: ppalceorder._id },
            null
          );
        }
      }
    }
  } catch (er) {
    if (er?.message) {
      responce(res, 404, responsemsgs.FAIL, er.message, null);
    } else {
      responce(res, 404, responsemsgs.FAIL, er, null);
    }
  }
  res.end();
};
let getallorder = async (req, res) => {
  try {
    let alldata = await placeorder.find({});
    responce(res, 200, responsemsgs.SUCCESS, alldata, null);
  } catch (er) {
    responce(res, 400, responsemsgs.FAIL, er, null);
  }
  res.end();
};
let singleorder = async (req, res) => {
  try {
    let pid = await req.params.id;
    let singleorderdata = await placeorder.findOne({ _id: pid });
    if (!singleorderdata) {
      throw "not found this order";
    } else {
      responce(res, 200, responsemsgs.SUCCESS, singleorderdata, null);
    }
  } catch (er) {
    responce(res, 400, responsemsgs.FAIL, er, null);
  }
  res.end();
};
let confirmorder = async (req, res) => {
  try {
    let pid = await req.params.id;
    let updatedata = await placeorder.updateOne(
      { _id: pid },
      {
        isDone: true,
      }
    );
    if (updatedata.modifiedCount == 0) {
      throw "Nothing confirm";
    } else {
      responce(res, 200, responsemsgs.SUCCESS, "Successfully confirm", null);
    }
  } catch (er) {
    responce(res, 400, responsemsgs.FAIL, er, null);
  }
  res.end();
};
let deleteorder = async (req, res) => {
  try {
    let pid = await req.params.id;
    let del = await placeorder.deleteOne({ _id: pid });
    if (del.deletedCount == 0) {
      throw "Nothing deleted";
    } else {
      responce(res, 200, responsemsgs.SUCCESS, "delete Successfully", null);
    }
  } catch (er) {
    if (er?.message) {
      responce(res, 400, responsemsgs.FAIL, er.message, null);
    } else {
      responce(res, 400, responsemsgs.FAIL, er, null);
    }
  }
  res.end();
};
module.exports = {
  addorder,
  getallorder,
  singleorder,
  confirmorder,
  deleteorder,
};
