const Comment = (comment) => {
    return {
      __type: "name.comment",
      comment,
      upvotes: 0,
    };
  };
  
  module.exports = Comment;
  