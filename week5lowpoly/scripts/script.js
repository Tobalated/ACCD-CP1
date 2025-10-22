// Smooth scroll to section
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

// Modal functionality
function openModal(img) {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  modal.style.display = 'block';
  modalImg.src = img.src;
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';

  