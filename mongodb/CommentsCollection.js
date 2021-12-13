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
    getAllComments: () => {
      return collection      
      .find()
      .toArray()
      .then((cursor) => {
        console.log(`getAllComments::returning ${cursor.length} items`);
        return { comments: cursor };
      });
    },
  };
};

module.exports = CommentsCollection;
