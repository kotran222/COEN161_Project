const fetch = require("node-fetch");

// const sendResponse = require("../../routes/utils/sendResponse");

const API = {
    currentOffset: 0,
    pageSize: 10,
    initialize: () => {
      // API.listComments(API.currentOffset);
    },
    handleResponse: (response) => {
      // return response.ok ? response.json() : sendResponse(response, response.status);
      console.log(response)
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
    createMessage: (name, comment) => {
      console.log("name" + name)
      console.log("comment" + comment)
      return fetch(`${name}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          comment: comment,
        }),
      })
        .then(API.handleResponse)
        .then((messageResponse) => {
          console.log("messageResponse" + messageResponse)
          VIEWS.createCommentElement(messageResponse.name, messageResponse.comment);
          VIEWS.clearForm();
        });
    },    
    // getPreviousPage: () => {
    //   const newOffset = Math.min(0, API.currentOffset - API.pageSize);
  
    //   VIEWS.clearCurrentPage();
    //   API.listComments(newOffset).then(() => {
    //     API.currentOffset = newOffset;
    //   });
    // },
    // getNextPage: () => {
    //   const newOffset = API.currentOffset + API.pageSize;
  
    //   VIEWS.clearCurrentPage();
    //   API.listComments(newOffset).then(() => {
    //     API.currentOffset = newOffset;
    //   });
    // },
  };
  
  API.initialize();
  