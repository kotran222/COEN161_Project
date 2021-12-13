const API = {
    currentOffset: 0,
    pageSize: 10,
    initialize: () => {
      API.displayMessages();
    },
    handleResponse: (response) => {
      console.log(response);
      console.log(response.ok);
      return response.ok ? response.json() : Promise.reject(response.status);  
    },
    createMessage: (name, comment, email) => {
      console.log("email: " + email)
      console.log("name: " + name)
      console.log("comment: " + comment)
      return fetch("/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          comment: comment,
          email: email,
        }),
      })
        .then(API.handleResponse)
        .then((messageResponse) => {
          VIEWS.clearForm();
        });
    },

    displayMessages: () => {
      return fetch("/comments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: 'cors',
        cache: 'default',
      })
      .then(API.handleResponse)
      .then((messageResponse) => {
          console.log("API JS Message Response " + Object.keys(messageResponse))
          for(let key in messageResponse){
            console.log("message response " + Object.keys(messageResponse[key].comments))
            let collection_entry = messageResponse[key].comments;
            for(let object_index in collection_entry){
              console.log("collection entry" + Object.keys(collection_entry[object_index]))
              VIEWS.createCommentElement(collection_entry[object_index].name, collection_entry[object_index].comment, collection_entry[object_index].email);
            }
          }
      });
    },
};
  
  API.initialize();
  