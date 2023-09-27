const withTransitionButton = document.querySelector(".with-transition button");
const withoutTransitionButton = document.querySelector(
  ".without-transition button"
);

withoutTransitionButton.addEventListener("click", () => {
  const newImage = document.createElement("img");
  newImage.src = "https://source.unsplash.com/random/poland";
  withoutTransitionButton.parentElement.appendChild(newImage);
});

withTransitionButton.addEventListener("click", () => {
  const newImage = document.createElement("img");
  newImage.src = "https://source.unsplash.com/random/usa";
  document.startViewTransition(() => {
    withTransitionButton.parentElement.appendChild(newImage);
  });
});
