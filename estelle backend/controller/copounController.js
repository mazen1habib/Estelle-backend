const Copoun = require("../model/copoun.js");
const responsemsgs = require("../utilities/responseMsgs.js");
const responce = require("../utilities/httpresponemsg.js");
const addcopoun = async (req, res) => {
  try {
    let data = await req.body;
    let newcopoun = await new Copoun({
      copounName: data.copounName,
      copounCategory: data.copounCategory,
      copounPercent: data.copounPercent,
      copounExpire: data.copounExpire,
    });
    let done = await newcopoun.save();
    if (done.copounName != newcopoun.copounName) {
      throw "can't save new copoun";
    } else {
      responce(res, 200, responsemsgs.SUCCESS, "copoun is Successfully", null);
    }
  } catch (er) {
    responce(res, 400, responsemsgs.FAIL, er, null);
  }
  res.end();
};
const deletecopoun = async (req, res) => {
  try {
    let pid = await req.params.id;
    let findcopoun = await Copoun.findOne({ _id: pid });
    if (!findcopoun) {
      throw "Copoun Not Found";
    } else {
      let delete1 = await Copoun.deleteOne({ _id: pid });
      if (delete1.deletedCount == 0) {
        throw "Nothing deleted";
      } else {
        responce(res, 200, responsemsgs.SUCCESS, "delete Successfully", null);
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
const getallCopoun = async (req, res) => {
  try {
    let allcopoun = await Copoun.find({});
    responce(res, 200, responsemsgs.SUCCESS, allcopoun, null);
  } catch (er) {
    responce(res, 400, responsemsgs.FAIL, er, null);
  }

  res.end();
};
const checkcopoun = async (req, res) => {
  try {
    let data = await req.body;
    let checkname = await Copoun.findOne({ copounName: data.copounName });
    if (!checkname) {
      throw " copoun name is  not found";
    } else {
      let datenow = Date.now();
      if (Date.parse(checkname.copounExpire) < datenow) {
        responce(res, 200, responsemsgs.SUCCESS, "Copoun Is Expired", null);
      } else {
        if (data.copounCategory != checkname.copounCategory) {
          throw "Copoun is Not Valid For This Category";
        } else {
          responce(res, 200, responsemsgs.SUCCESS, "Copoun is Availbale", {
            precent: checkname.copounPercent,
          });
        }
      }
    }
  } catch (er) {
    responce(res, 400, responsemsgs.FAIL, er, null);
  }

  res.end();
};
module.exports = { addcopoun, deletecopoun, getallCopoun, checkcopoun };
