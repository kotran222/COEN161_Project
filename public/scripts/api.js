const API = {
    currentOffset: 0,
    pageSize: 10,
    initialize: () => {
      // API.listComments(API.currentOffset);
      API.displayMessages();
    },
    handleResponse: (response) => {
      // return response.ok ? response.json() : sendResponse(response, response.status);
      console.log(response);
      console.log(response.ok);
      return response.ok ? response.json() : Promise.reject(response.status);  
    },
    // listComments: (offset) => {
    //   return fetch(`/comments?offset=${offset}`)
    //     .then(API.handleResponse)
    //     .then((messagesResponse) => {
    //       for (const message of messagesResponse.comments) {
    //         VIEWS.createMessageElement(message.name, message.comment);
    //       }
  
    //       // VIEWS.setPaginationButtons(messagesResponse.pagination);
    //     });
    // },
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
          console.log("messageResponse: " + messageResponse)
          VIEWS.createCommentElement(messageResponse.name, messageResponse.comment, messageResponse.email);
          VIEWS.clearForm();
        });
    },

    displayMessages: () => {
      return fetch("/comment/:comment", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: 'cors',
        cache: 'default',
      })
      .then(API.handleResponse)
      .then((messageResponse) => {
        // for (const message of messageResponse.messages) {
        VIEWS.createCommentElement(messageResponse.name, messageResponse.comment, messageResponse.email);
        // }
      });
    },
};
  
  API.initialize();
  