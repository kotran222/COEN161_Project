const sendResponse = require("./utils/sendResponse");

const getComment = (req, res) => {
  // const comment = req.params.comment;
  // console.log("request params: " + comment)
  console.log("request app state: " + Object.keys(req.app.db))

  sendResponse(res, 200, "Get all Comments");
  console.log("get comment: " + JSON.stringify(req.app.db.getComment()))
  return req.app.db.getComment();
  
  // if (!req.app.SCUMensVolleyball[message.toLowerCase()]) {
  //   return sendResponse(res, 404, {
  //     error: `${message} is not in the comment history yet`,
  //   });
  // }

  // const comment = req.app.SCUMensVolleyball[message.toLowerCase()];
  // return sendResponse(res, 200, comment);
};

module.exports = getComment;
