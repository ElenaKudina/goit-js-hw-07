import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryEl = document.querySelector('.gallery');

function createMarkup(galleryItems) {
  return galleryItems
    .map(({ original, preview, description }) => {
      return `<div class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </div>`;
    })
    .join('');
}

galleryEl.insertAdjacentHTML(
  'beforeend',
  createMarkup(galleryItems)
);

galleryEl.addEventListener('click', onClickImage);

let instance;

function onClickImage(evt) {
  evt.preventDefault();

  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }
  const imageUrl = evt.target.dataset.source;
  instance = basicLightbox.create(`<img width="1280" src="${imageUrl}">`, {
    onShow: instance => {
      window.addEventListener('keydown', onEscKeyPress);
    },
    onClose: instance => {
      window.removeEventListener('keydown', onEscKeyPress);
    },
  });

  instance.show();

  function onEscKeyPress(evt) {
    console.log(evt);
    const ESC_KEY_CODE = 'Escape';
    const isEscKey = evt.code === ESC_KEY_CODE;

    if (isEscKey) {
      onCloseModalEscape();
    }
  }

  function onCloseModalEscape() {
    instance.close();
  }
}

console.log(galleryItems);