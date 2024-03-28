import { comments } from "./main.js";
import { likeComments } from "./likecomments.js";
import { answerOnComment } from "./answerOnComments.js";

// Отрисовка комментариев 
export const renderComments = () => {
    const containerElement = document.querySelector(".container");
    const addForm = `<div class="add-form">
    <input id="name-input"
      type="text"
      class="add-form-name"
      placeholder="Введите ваше имя"
    />
    <textarea id="comment-area"
      type="textarea"
      class="add-form-text"
      placeholder="Введите ваш коментарий"
      rows="4"
    ></textarea>
    <div id="add-form" class="add-form-row">
      <button id="add-button" disabled class="add-form-button error">Написать</button>
      <button id="delete-button" class="add-form-delete-button">Удалить последний комментарий</button>
    </div>
  </div>`

    const textLogin = `<p>Чтобы добавлять комментарии - <span class="text-login">авторизуйтесь!</span></p>`
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

    console.log(comments);

  containerElement.innerHTML = `<div><ul id="comments-list" class="comments">
   ${commentsHtml}
  </ul> ${textLogin}</div>`;

  likeComments();
  // answerOnComment();
  // deleteComments();

};