const VIEWS = {
    initialize: () => {
        document.querySelector("#submit").addEventListener("click", VIEWS.onSubmit);
        document
        .querySelector("#email")
        .addEventListener("focus", (event) =>
            VIEWS.removeErrorState(event.currentTarget)
        );
        document
        .querySelector("#name")
        .addEventListener("focus", (event) =>
            VIEWS.removeErrorState(event.currentTarget)
        );
        document
        .querySelector("#comment")
        .addEventListener("focus", (event) =>
            VIEWS.removeErrorState(event.currentTarget)
        );
    },
    clearForm: () => {
        const emailElement = document.querySelector("#email");
        const nameElement = document.querySelector("#name");
        const commentElement = document.querySelector("#comment");
  
      emailElement.value = "";
      nameElement.value = "";
      commentElement.value = "";
    },
    clearCurrentPage: () => {
      // If using document.querySelector('dl').children, you have to
      // convert it to an array first
      for (const child of document.querySelectorAll("dl > *")) {
        child.remove();
      }
    },
    createCommentElement: (name, comment) => {
      const dataList = document.querySelector("dl");
      const dataName = document.createElement("dn");
      const dataComment = document.createElement("dc");
  
      dataName.textContent = name;
      dataComment.textContent = comment;
  
      // dataList.appendChild(dataName);
      // dataList.appendChild(dataComment);
    },
    // setPaginationButtons: (pagination) => {
    //   document.querySelector("#next-page-button").disabled =
    //     !pagination.hasNextPage;
    //   document.querySelector("#previous-page-button").disabled =
    //     !pagination.hasPreviousPage;
    // },
    addErrorState: (element) => {
      element.classList.add("error");
    },
    removeErrorState: (element) => {
      element.classList.remove("error");
    },
    onSubmit: (event) => {
      event.preventDefault();
      const nameElement = document.querySelector("#name");
      const commentElement = document.querySelector("#comment");
  
      const name = nameElement.value.trim();
      const comment = commentElement.value.trim();
  
      if (!name) {
        VIEWS.addErrorState(nameElement);
      }
  
      if (!comment) {
        VIEWS.addErrorState(commentElement);
      }
  
      if (name && comment) {
        API.createMessage(name, comment);
      }
    },
  };
  
  VIEWS.initialize();
  