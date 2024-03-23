import { comments } from "./main.js";
import { renderComments } from "./renderComments.js";

export const likeComments = () => {
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