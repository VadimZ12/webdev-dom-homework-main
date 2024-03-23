import { getApiComments, postApiComments } from "./api.js";
import { renderComments } from "./renderComments.js";
import { likeComments } from "./likecomments.js";
import { answerOnComment } from "./answerOnComments.js";
import { formattedDateTime, sanitizeHtml } from "./utils.js";



export let comments = [];

const addButtonElement = document.getElementById("add-button");
const addFormElement = document.querySelector(".add-form");
const nameInputElement = document.getElementById("name-input");
export const commentAreaElement = document.getElementById("comment-area");



// Получение списка комментариев через API с помощью метода GET
const getComments = () => {
  getApiComments().then((responseData) => {
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

getComments();

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


commentAreaElement.addEventListener("keyup", function(event) {
  if (event.key === 'Enter' && event.shiftKey) {
    addComment();
  }
});

addButtonElement.addEventListener("click", () => {
  addComment();
});

renderComments();
likeComments();
answerOnComment();
deleteComments();

function addComment() {
  const name = nameInputElement.value.trim();
  const text = commentAreaElement.value.trim();
  addFormElement.style.display = "none";
  let loadAddComment = document.querySelector(".load-add-comment").style.display = "flex";

  if (name !== '' && text !== '') {

    postApiComments({
      name: nameInputElement.value.trim(),
      text: commentAreaElement.value.trim(),
      sanitizeHtml,
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
        }

        addButtonElement.classList.remove("error");
        nameInputElement.value = name;
        commentAreaElement.value = text;
      })
      .finally(() => {
        addFormElement.style.display = "flex";
        let hideAddComment = document.querySelector(".load-add-comment").style.display = "none";
      })
  }
  
  getComments();
  nameInputElement.value = '';
  commentAreaElement.value = '';
  addButtonElement.classList.add('error');
}

