const Comment = require("./comment");
const normalizeComment = require("../utils/normalizeComment");

const CommentDocument = ({ email, name, comments, tags}) => {
  let __comments = [];

  for (const com of comments) {
    if (typeof com === "string") {
      __comments.push(Comment(com));
    } else if (typeof com === "object" && com.type === "name.comment") {
      __comments.push(com);
    }
  }

  return {
    normalizedComment: normalizeComment(name),
    name,
    email,
    tags,
    comments: __comments,
  };
};

module.exports = CommentDocument;
