import { comments } from "./main.js";
import { renderComments } from "./renderComments.js";
import { commentAreaElement } from "./main.js";


// Ответ на комментарий 
export const answerOnComment = () => {
    const commentsElement = document.querySelectorAll(".comment");
  
    for (const commentElement of commentsElement) {
      commentElement.addEventListener("click", () => {
        const commentIndex = commentElement.dataset.index
        
        let author = comments[commentIndex].userName;
        let authorComment = comments[commentIndex].commentText;
  
        commentAreaElement.value = `QUOTE_BEGIN ${author}: - \n"${authorComment}" QUOTE_END`;
    
    
        renderComments();
      });
    }
  };