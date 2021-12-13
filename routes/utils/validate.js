const validate = {
    isString: (str) => {
        typeof str === "string";
    },

    isEmail: function(email){
        return typeof email === "string" && email.includes("@");
    },

    isComment: (comment) => {
        typeof comment === "string"
    },
  };
  
  module.exports = validate;