const thumbnail = document.querySelectorAll(".thumbnail img");
const popup = document.querySelector(".popup");
const popup__close = document.querySelector(".popup__close");
const popup_img = document.querySelector(".popup__img");
const arrow_left = document.querySelector(".popup__arrow--left");
const arrow_right = document.querySelector(".popup__arrow--right");

let currentImgIndex;

const showNextImage = () => {
  currentImgIndex == thumbnail.length - 1
    ? (currentImgIndex = 0)
    : currentImgIndex++;
  popup_img.src = thumbnail[currentImgIndex].src;
};

const showPreviousImage = () => {
  currentImgIndex == 0
    ? (currentImgIndex = thumbnail.length - 1)
    : currentImgIndex--;
  popup_img.src = thumbnail[currentImgIndex].src;
};

const closePopup = () => {
  popup.classList.add("fadeout");
  setTimeout(() => {
    popup.classList.add("hidden");
    popup.classList.add("fadeout");
    thumbnail.forEach((element) => {
      element.setAttribute("tabindex", 1);
    });
  }, 300);
};

thumbnail.forEach((e, i) => {
  const showPopup = (e) => {
    popup.classList.remove("hidden");
    popup_img.src = e.target.src;
    currentImgIndex = i;
    thumbnail.forEach((element) => {
      element.setAttribute("tabindex", -1);
    });
  };

  e.addEventListener("click", showPopup);

  e.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      showPopup(e);
    }
  });
});

popup__close.addEventListener("click", closePopup);

arrow_right.addEventListener("click", showNextImage);

arrow_left.addEventListener("click", showPreviousImage);

document.addEventListener("keydown", (e) => {
  if (!popup_img.classList.contains("hidden")) {
    if (e.key === "Escape") {
      popup.classList.add("hidden");
    } else if (e.code === "ArrowRight") {
      showNextImage();
    } else if (e.code === "ArrowLeft") {
      showPreviousImage();
    }
  }
});

popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    closePopup();
  }
});
