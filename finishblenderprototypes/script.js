// ---------- LIGHTBOX FUNCTIONALITY ----------
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector("img");
const closeBtn = document.querySelector(".close-btn");

// Open lightbox when image is clicked
document.querySelectorAll(".image-gallery img").forEach(image => {
  image.addEventListener("click", () => {
    lightbox.classList.add("active");
    lightboxImg.src = image.src;
  });
});

// Close when clicking outside the image or on close button
lightbox.addEventListener("click", (e) => {
  if (e.target !== lightboxImg) {
    lightbox.classList.remove("active");
  }
});

closeBtn.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

// Close on pressing ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("active")) {
    lightbox.classList.remove("active");
  }
});
