const sendResponse = require("./utils/sendResponse");

//get all comments
const getComment = (req, res) => {
  return req.app.db.getAllComments().then((comments) => {
    sendResponse(res, 200, {comments});
  });
};

module.exports = getComment;
