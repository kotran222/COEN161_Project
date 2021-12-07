const validate = require("./utils/validate");
const readBody = require("./utils/readBody");
const sendResponse = require("./utils/sendResponse");

const createComment = (req, res) => {
  return readBody(req).then((requestBody) => {
    console.log(requestBody);
    const body = JSON.parse(requestBody);

    if (!body.email || !body.name || !body.comment) {
      console.log("body is missing stuff code 400")
      return sendResponse(
        res,
        400,
        `Must include the email, name, and comment field in Create request`
      );
    }

    const message = {
      name: body.name,
      comment: body.comment,
      email: body.email,
    };

    // if (body.tags) {
    //   if (validate.isTagsArray(body.tags)) {
    //     message.tags = body.tags;
    //   } else {
    //     console.log("tag 400 code")
    //     return sendResponse(
    //       res,
    //       400,
    //       "tags field must be an array of strings"
    //     );
    //   }
    // }

    if (body.email) {
      if (validate.isEmail(body.email)) {
        message.email = body.email;
      } else {
        console.log("email 400 code")
        return sendResponse(res, 400, "email field is not properly formatted");
      }
    }

    // if (body.name) {
    //   if (validate.isName(body.name)) {
    //     message.name = body.name;
    //   } else {
    //     console.log("name 400 code")
    //     return sendResponse(res, 400, "name field must be a string");
    //   }
    // }

    if (body.name) {
      // console.log("is body name a string: " + typeof(body.name))
      message.name = body.name;
    } else {
      console.log("name 400 code")
      return sendResponse(res, 400, "name field must be a string");
    }


    // if (body.comment) {
    //   if (validate.isComment(body.comment)) {
    //     message.comment = body.comment;
    //   } else {
    //     console.log("comment 400 code")
    //     return sendResponse(
    //       res,
    //       400,
    //       "comment field must be a string"
    //     );
    //   }
    // }

    if (body.comment) {
      // console.log("is body comment a string: " + typeof(body.comment))
      message.comment = body.comment;
    } else {
      console.log("comment 400 code")
      return sendResponse(
        res,
        400,
        "comment field must be a string"
      );
    }

    return req.app.db.createComment(message).then((newMessage) => {
      return sendResponse(res, 201, JSON.stringify(newMessage));
    });
  });
};

module.exports = createComment;
