const url = require("url");
const sendResponse = require("./utils/sendResponse");

const DEFAULT_LIMIT = 10;

const getComments = (req, res) => {
  const query = url.parse(req.url, true).query;
  const lowerBound = parseInt(query.offset, 10) || 0;
  const upperBound = lowerBound + (parseInt(query.limit, 10) || DEFAULT_LIMIT);

  const messages = [];
  const allMessages = Object.values(req.app.SCUMensVolleyball);
  for (let i = lowerBound; i < upperBound; i++) {
    if (i >= allMessages.length) {
      break;
    }
    messages.push(allMessages[i]);
  }

  return sendResponse(res, 200, {
    messages,
    pagination: {
      hasNextPage: upperBound < allMessages.length,
      hasPreviousPage: lowerBound > 0,
    },
  });
};

module.exports = getComments;
