const url = require("url");
const sendResponse = require("./utils/sendResponse");

const DEFAULT_LIMIT = 10;

const getComments = (req, res) => {
  const query = url.parse(req.url, true).query;


  const messages = [];
  const allMessages = Object.values(req.app.SCUMensVolleyball);
  messages.push(allMessages[i]);

  return sendResponse(res, 200, allMessages);
};

module.exports = getComments;
