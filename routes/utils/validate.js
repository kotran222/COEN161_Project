const validate = {
    isString: (str) => {
        typeof str === "string";
    },

    isEmail: function(email){
        let format = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        return typeof email === "string" && format.test(email);
    },

    isCommentsArray: (comments) => {
        !Array.isArray(comments) || !comments.every((com) => typeof com === "string")
    },

    isName: (name) => {
        typeof name === "string"
    },
    
    isTagsArray: (tags) =>{
    !Array.isArray(tags) || !tags.every((tag) => typeof tag === "string")
    },
  };
  
  module.exports = validate;