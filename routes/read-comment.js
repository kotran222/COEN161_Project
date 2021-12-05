const sendResponse = require("./utils/sendResponse");

const getComment = (req, res) => {
  const message = req.params.message;

  if (!req.app.SCUMensVolleyball[message.toLowerCase()]) {
    return sendResponse(res, 404, {
      error: `${message} is not in the comment history yet`,
    });
  }

  const comment = req.app.SCUMensVolleyball[message.toLowerCase()];
  return sendResponse(res, 200, comment);
};

module.exports = getComment;
