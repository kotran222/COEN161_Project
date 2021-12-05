const validate = require("./utils/validate");
const readBody = require("./utils/readBody");
const sendResponse = require("./utils/sendResponse");

const createComment = (req, res) => {
  return readBody(req).then((requestBody) => {
    const body = JSON.parse(requestBody);

    if (!body.email || !body.name || !body.comment) {
      return sendResponse(
        res,
        400,
        `Must include the email, name, and comment field in Create request`
      );
    }

    const message = {
      email: body.email,
      name: body.name,
      comments: [body.comment],
    };

    if (body.tags) {
      if (validate.isTagsArray(body.tags)) {
        message.tags = body.tags;
      } else {
        return sendResponse(
          res,
          400,
          "tags field must be an array of strings"
        );
      }
    }

    if (body.email) {
      if (validate.isEmail(body.email)) {
        message.email = body.email;
      } else {
        return sendResponse(res, 400, "email field is not properly formatted");
      }
    }

    if (body.name) {
      if (validate.isName(body.name)) {
        message.name = name;
      } else {
        return sendResponse(res, 400, "name field must be a string");
      }
    }

    if (body.comments) {
      if (validate.isCommentsArray(body.comments)) {
        message.comments = body.comments;
      } else {
        return sendResponse(
          res,
          400,
          "comments field must be an array of strings"
        );
      }
    }

    return req.app.db.createComment(message).then((newMessage) => {
      return sendResponse(res, 201, JSON.stringify(newMessage));
    });
  });
};

module.exports = createComment;
