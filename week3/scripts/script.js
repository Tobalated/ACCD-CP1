const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const filterValue = button.dataset.filter;

    galleryItems.forEach((item) => {
      if (filterValue === "all" || item.classList.contains(filterValue)) {
        item.classList.remove("hidden");
      } else {
        item.classList.add("hidden");
      }
    });
  });
});