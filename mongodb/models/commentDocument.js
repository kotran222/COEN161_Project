const Comment = require("./comment");
const normalizeComment = require("../utils/normalizeComment");

const CommentDocument = ({ email, name, comment}) => {
  return {
    normalizedComment: normalizeComment(name),
    name,
    email,
    comment,
  };
};

module.exports = CommentDocument;
