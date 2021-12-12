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
    createCommentElement: (name, comment, email) => {
      const dataList = document.querySelector(".comment-container");
      const section = document.createElement("section");
      const dataID = document.createElement("p");
      const dataComment = document.createElement("p");

      const class_att = document.createAttribute("class");
      class_att.value = "comment-posting";
      section.setAttributeNode(class_att);

      const id_att = document.createAttribute("class");
      id_att.value = "id-style";
      dataID.setAttributeNode(id_att);

      const comment_att = document.createAttribute("class");
      comment_att.value = "comment-style";
      dataComment.setAttributeNode(comment_att);
  
      dataID.innerHTML = name + " (" + email + ")";
      dataComment.innerHTML = comment;
  
      section.appendChild(dataID);
      section.appendChild(dataComment);
      // dataList.appendChild(dataID);
      // dataList.appendChild(dataComment);
      dataList.appendChild(section);
    },
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
      const emailElement = document.querySelector("#email");
  
      const name = nameElement.value.trim();
      const comment = commentElement.value.trim();
      const email = emailElement.value.trim();
  
      if (!name) {
        VIEWS.addErrorState(nameElement);
      }
  
      if (!comment) {
        VIEWS.addErrorState(commentElement);
      }

      if (!email) {
        VIEWS.addErrorState(emailElement);
      }
  
      if (name && comment && email) {
        API.createMessage(name, comment, email);
        location.reload();
      }
    },
  };
  
  VIEWS.initialize();
  