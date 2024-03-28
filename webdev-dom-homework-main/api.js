import { commentAreaElement } from "./main.js";

let urlApi = "https://wedev-api.sky.pro/api/v2/vadim-zolotov/comments";
let userURL = "https://wedev-api.sky.pro/api/user";

const nameInputElement = document.getElementById("name-input");

export function getApiComments() {
    return fetch(urlApi, {
        method: "GET"
      })
      .then((response) => {
        return response.json();
      });
}

export function postApiComments({ name, text, sanitizeHtml }) {
    return fetch(urlApi, 
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
        });
}


export function login({login, password}) {
  return fetch(userURL, {
      method: "POST"
    })
    .then((response) => {
      return response.json();
    });
}