const addButtonElement = document.getElementById("add-button");
const addFormElement = document.getElementById("add-form");
const nameInputElement = document.getElementById("name-input");
const commentAreaElement = document.getElementById("comment-area");
const commentsList = document.getElementById("comments-list");

const formattedDateTime = (time) => {
  let dateTime = new Date(time);
  return dateTime.toLocaleString('ru-Ru', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

let urlApi = "https://wedev-api.sky.pro/api/v1/vadim-zolotov/comments";

// Получение списка комментариев через API с помощью метода GET
const getComments = () => {
  let fetchPromise = fetch(urlApi, {
    method: "GET"
  })
  .then((response) => {
    return response.json();
  })
  .then((responseData) => {
    comments = responseData.comments.map((comment) => {
      return {
        userName: comment.author.name,
        time: formattedDateTime(comment.date),
        commentText: comment.text,
        id: comment.id,
        likes: comment.likes,
        isLiked: false,
      };
    });
    

    let hidePreload = document.querySelector(".preload").style.display = "none";
    renderComments();
    addButtonElement.disabled = false;
  })
  .catch((error) => {
    if (error.message === "Сервер упал") {
        alert("Кажется, что-то пошло не так, попробуйте позже");
    } else if (error.message === 'Failed to fetch') {
        alert("Кажется,сломался интернет, попробуйте позже");
    }
  })
};

const hideSeeAddComment = () => {
  addButtonElement.addEventListener("click", () => {
    addButtonElement.disabled = true;
    addFormElement.style.display = "none";
  });
  addButtonElement.disabled = false;
  addFormElement.style.display = "block";
  addFormElement.style.add = "add-form";
}


getComments();

let comments = [];

// Удаление комментария 
const deleteComments = () => {
  const deleteButtonElement = document.getElementById("delete-button");

  deleteButtonElement.addEventListener("click", () => {
    comments.pop();
    renderComments();
  });
};

nameInputElement.addEventListener('input', handleInputChange);
commentAreaElement.addEventListener('input', handleInputChange);
// Проверка ввода заданного текста в поля "Имя" и "комментарий"
function handleInputChange() {
  const name = nameInputElement.value.trim();
  const comment = commentAreaElement.value.trim();

  if (name !== '' && comment !== '') {
    addButtonElement.disabled = false;
    addButtonElement.classList.remove('error');
  } else {
    addButtonElement.disabled = true;
    addButtonElement.classList.add('error');
  }
}

// Ответ на комментарий 
const answerOnComment = () => {
  const commentsElement = document.querySelectorAll(".comment");

  for (const commentElement of commentsElement) {
    commentElement.addEventListener("click", () => {
      const commentIndex = commentElement.dataset.index
      
      author = comments[commentIndex].userName;
      authorComment = comments[commentIndex].commentText;

      commentAreaElement.value = `QUOTE_BEGIN ${author}: - \n"${authorComment}" QUOTE_END`;
  
  
      renderComments();
    });
  }
};

const likeComments = () => {
  const likeButtonsElement = document.querySelectorAll(".like-button")
  
  for (const likeButtonElement of likeButtonsElement) {
    likeButtonElement.addEventListener("click", (event) => {
      event.stopPropagation(); 
      const likeIndex = likeButtonElement.dataset.index;

      if (comments[likeIndex].isLiked) {
        comments[likeIndex].likes--;
        comments[likeIndex].isLiked = "";
      } else {
        comments[likeIndex].likes++;
        comments[likeIndex].isLiked = "-active-like";
      }

      renderComments();
    });
  }

};



commentAreaElement.addEventListener("keyup", function(event) {
  if (event.key === 'Enter' && event.shiftKey) {
    hideSeeAddComment();
    addComment();
  }
});

addButtonElement.addEventListener("click", () => {
  hideSeeAddComment();
  addComment();
});


// Отрисовка комментариев 
const renderComments = () => {
  const commentsHtml = comments
    .map((comment, index) => {
      return `<li data-index="${index}" class="comment">
      <div class="comment-header">
        <div>${comment.userName}</div>
        <div>${comment.time}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${comment.commentText}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button data-index="${index}" class="like-button ${comment.isLiked}"></button>
        </div>
      </div>
      </li>`
    })
    .join("");

  commentsList.innerHTML = commentsHtml;

  likeComments();
  answerOnComment();

};

renderComments();
likeComments();
answerOnComment();
deleteComments();

function addComment() {
  const name = nameInputElement.value.trim();
  const text = commentAreaElement.value.trim();

  const sanitizeHtml = (htmlString) => {
    return htmlString
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
    .replaceAll("QUOTE_END", "</div>")
  };

  if (name !== '' && text !== '') {

    let fetchPromise = fetch(urlApi, 
      {
        method: "POST",
        body: JSON.stringify({
          name: sanitizeHtml(nameInputElement.value),
          text: sanitizeHtml(commentAreaElement.value),
          forceError: true,
        })
      })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
           return response.json();
        }
        if (response.status === 400) {
            throw new Error("Неверный запрос"); 
        }if (response.status === 500) {
          throw new Error("Сервер упал");
        }
      })
      .then((responseData) => {
        return getComments();
      })
      .then(() => {
        renderComments();
        addButtonElement.disabled = false;
        addButtonElement.textContent = "Написать";
        nameInputElement.value = "";
        commentAreaElement.value = "";
      })
      .catch((error) => {
        addButtonElement.disabled = false;
        addButtonElement.textContent = "Написать";
        if (error.message === "Неверный запрос") {
            alert("Имя и комментарий должны быть не короче 3 символов");
        }else if (error.message === "Сервер упал") {
            alert("Кажется, что-то пошло не так, попробуйте позже");
        } if (error.message === 'Failed to fetch') {
            alert("Кажется,сломался интернет, попробуйте позже");
        }

        addButtonElement.classList.remove("error");
        nameInputElement.value = name;
        commentAreaElement.value = text;
      });
  }
  
  getComments();
  nameInputElement.value = '';
  commentAreaElement.value = '';
  addButtonElement.classList.add('error');
}

