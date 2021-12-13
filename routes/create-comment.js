const validate = require("./utils/validate");
const readBody = require("./utils/readBody");
const sendResponse = require("./utils/sendResponse");

const createComment = (req, res) => {
  return readBody(req).then((requestBody) => {
    console.log(requestBody);
    const body = JSON.parse(requestBody);

    //check if body has contents
    if (!body.email || !body.name || !body.comment) {
      console.log("body is missing stuff code 400")
      return sendResponse(
        res,
        400,
        `Must include the email, name, and comment field in Create request`
      );
    }

    //message object
    const message = {
      name: body.name,
      comment: body.comment,
      email: body.email,
    };

    //body email should be valid format before storing to message object
    if (body.email) {
      if (validate.isEmail(body.email)) {
        message.email = body.email;
      } else {
        console.log("email 400 code")
        return sendResponse(res, 400, "email field is not properly formatted");
      }
    }

    //body name should be stored in message object
    if (body.name) {
      // console.log("is body name a string: " + typeof(body.name))
      message.name = body.name;
    } else {
      console.log("name 400 code")
      return sendResponse(res, 400, "name field must be a string");
    }

    //body comment should be stored in message object
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

    //once message is updated
    //add its contents to database
    return req.app.db.createComment(message).then((newMessage) => {
      return sendResponse(res, 201, JSON.stringify(newMessage));
    });
  });
};

module.exports = createComment;
