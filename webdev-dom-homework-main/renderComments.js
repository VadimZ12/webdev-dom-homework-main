import { comments } from "./index.js";
import { likeComments } from "./likes.js";
import { delay } from "./delay.js";
import { renderLogin } from "./renderLogin.js";

// Отрисовка комментариев 
export const renderComments = () => {
    const containerElement = document.querySelector(".container");

    const textLogin = `<p>Чтобы добавлять комментарии - <u class="text-login">авторизуйтесь!</u></p>`
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

  const textLoginElement = document.querySelector(".text-login");
  textLoginElement.addEventListener("click", () => {
    renderLogin();
  })

  likeComments();
  // answerOnComment();
  // deleteComments();

};