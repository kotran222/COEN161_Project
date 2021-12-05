const normalizeComment = (name) => {
    return name.toLowerCase().replace(/ /g, "-").replace(/\%20/g, "-");
  };
  
  module.exports = normalizeComment;
  