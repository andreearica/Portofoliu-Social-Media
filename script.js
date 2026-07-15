
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.topbar nav');
menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

const dialog = document.querySelector('#lightbox');
const content = document.querySelector('.lightbox-content');
const closeBtn = document.querySelector('.close');

function openImage(src){
  content.innerHTML = `<img src="${src}" alt="Material mărit">`;
  dialog.showModal();
}
function openVideo(src){
  content.innerHTML = `<video controls autoplay playsinline><source src="${src}" type="video/mp4"></video>`;
  dialog.showModal();
}
function closeDialog(){
  content.querySelector('video')?.pause();
  dialog.close();
  content.innerHTML = '';
}
document.querySelectorAll('[data-image]').forEach(el => el.addEventListener('click', () => openImage(el.dataset.image)));
document.querySelectorAll('[data-video]').forEach(el => el.addEventListener('click', () => openVideo(el.dataset.video)));
closeBtn.addEventListener('click', closeDialog);
dialog.addEventListener('click', e => { if(e.target === dialog) closeDialog(); });

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.08});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
