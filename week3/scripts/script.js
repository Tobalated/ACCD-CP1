document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove "active" class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add "active" class to the clicked button
      button.classList.add("active");

      // Get the filter value from the clicked button
      const filterValue = button.dataset.filter;

      // Filter gallery items
      galleryItems.forEach((item) => {
        if (filterValue === "all" || item.classList.contains(filterValue)) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });
});