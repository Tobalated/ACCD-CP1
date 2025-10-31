// Smooth scrolling between sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Lightbox image viewer
const images = document.querySelectorAll('.clickable');
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

images.forEach(image => {
  image.addEventListener('click', e => {
    lightbox.classList.add('active');
    const img = document.createElement('img');
    img.src = image.src;
    while (lightbox.firstChild) lightbox.removeChild(lightbox.firstChild);
    lightbox.appendChild(img);
  });
});

lightbox.addEventListener('click', e => {
  if (e.target !== e.currentTarget) return;
  lightbox.classList.remove('active');
});

// Close lightbox with ESC key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') lightbox.classList.remove('active');
});
