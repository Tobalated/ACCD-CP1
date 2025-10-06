const thumbnails = document.querySelectorAll(".thumb");
const mainImage = document.getElementById("mainImage");

thumbnails.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    thumbnails.forEach(t => t.classList.remove("active"));
    thumb.classList.add("active");
    mainImage.src = thumb.src;
  });
});