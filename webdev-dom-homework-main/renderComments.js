import { comments } from "./main.js";
import { likeComments } from "./likecomments.js";
import { answerOnComment } from "./answerOnComments.js";

// Отрисовка комментариев 
export const renderComments = () => {
    const commentsList = document.getElementById("comments-list");
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