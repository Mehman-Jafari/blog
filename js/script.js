// Элементы HTML
const inputTitleNode = document.querySelector(".js-post__input-title");
const inputDescriptionNode = document.querySelector(".js-post__textarea-text");
const btnPublicationNode = document.querySelector(".js-post__btn-publication");
const listsPostsNode = document.querySelector(".js-post__content-block-list");
const noneWarningTextPosts = document.querySelector(".js-post__text-none");
const errorOutputNode = document.querySelector(".js-post__content-block-message-error");

// Элементы для вставки в HTML и вызов функции ValidationInputLengthMax
const titleMaxLengthWarning = '<p class="post__title-warning js-post__title-warning">Заголовок больше 100 символов</p>';
const descriptionMaxLengthWarning = '<p class="post__text-warning js-post__text-warning">Описание не может быть длиннее 200 символов</p>';
ValidationInputLengthMax(
  inputTitleNode,
  inputDescriptionNode,
  ".js-post__title-warning",
  errorOutputNode,
  titleMaxLengthWarning,
  100
);
ValidationInputLengthMax(
  inputDescriptionNode,
  inputTitleNode,
  ".js-post__text-warning",
  errorOutputNode,
  descriptionMaxLengthWarning,
  200
);

// Список постов
const posts = [];

// Событие клика на кнопку публикации
btnPublicationNode.addEventListener("click", () => {
  const postFromUser = getPostFromUser();

  if (edualTitleAndDescriptionWitchInput(postFromUser)) return;

  addPost(postFromUser);
  
  renderPost(postFromUser);
});

// Функция получения данных от пользователя
function getPostFromUser() {
  const title = inputTitleNode.value;
  const description = inputDescriptionNode.value;
  let fullTimePost = generateDatePost();

  return {
    title,
    description,
    fullTimePost,
  };
}

// Функция добавления поста в массив posts
function addPost(postFromUser) {
  posts.push(postFromUser);
}

// Функция проверяет Объект с ключами title и description если они совместимы с текущими value то не добавлять пост в массив с объектами
function edualTitleAndDescriptionWitchInput(postFromUser) {
  return posts.some(
    (post) => postFromUser.title === post.title && postFromUser.description === post.description
  );
}

// Функция валидации input если заголовок или описание больше 100 или 200 символов то выведет ошибку
function ValidationInputLengthMax(
  eventElementHTML,
  description,
  elementSelectorToHTML,
  outputElementHTML,
  getMaxLengthWarning,
  maxLength
) {
  eventElementHTML.addEventListener("input", () => {
    let errorWarningNode = document.querySelector(elementSelectorToHTML);

    if (eventElementHTML.value.length >= maxLength) {
      if (!errorWarningNode) {
        outputElementHTML.insertAdjacentHTML("beforeend", getMaxLengthWarning);
      }
      description.setAttribute("disabled", "true");
      btnPublicationNode.setAttribute("disabled", "true");
    } else {
      if (errorWarningNode) {
        errorWarningNode.remove();
      }
      description.removeAttribute("disabled");
      btnPublicationNode.removeAttribute("disabled");
    }
  });
}

// Функция генерации публикации поста при нажатии кнопки публикации
function generateDatePost() {
  const date = new Date();

  let dayPost = date.getDate().toString().padStart(2, "0");
  let monthPost = (date.getMonth() + 1).toString().padStart(2, "0");
  let yearPost = date.getFullYear();
  let hoursPost = date.getHours().toString().padStart(2, "0");
  let minutesPost = date.getMinutes().toString().padStart(2, "0");
  let formattedTime = `${dayPost}.${monthPost}.${yearPost} ${hoursPost}:${minutesPost}`;

  return formattedTime;
}

// Функция формирования поста из title и description
function renderPost(post) {
  if (post.title && post.description) {
    noneWarningTextPosts.remove();

    listsPostsNode.innerHTML += `
        <div class="post__content-item">
            <div class="post__data">${post.fullTimePost}</div>
            <h3 class="post__title">${post.title}</h3>
            <p class="post__description">${post.description}</p>
        </div>
    `;
  }
}
