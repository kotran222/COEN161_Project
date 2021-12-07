const mongodb = require("mongodb");
const normalizeComment = require("./utils/normalizeComment");
const CommentDocument = require("./models/commentDocument");

const FIND_LIMIT = 10;

const CommentsCollection = (client) => {
  const collection = client.db("SCUMensVolleyball").collection("comments");
  return {
    createComment: ({ email, name, comment }) => {
      const document = CommentDocument({
        email,
        name,
        comment,
      });
      return collection.insertOne(document).then(() => {
        document;
      });
    },
    getComment: () => {
      return collection.find();
    },
    getCommentByName: (name) => {
      return collection.findOne({
        normalized: normalizeComment(name),
      });
    },
    // updateCommentByName: (name) => {
    //   /**
    //    * code this one too :D
    //    */
    // },
    dropAll: () => {
      return collection.deleteMany();
    },

  };
    
};

module.exports = CommentsCollection;
