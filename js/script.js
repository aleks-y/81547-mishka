var navMain = document.querySelector('.nav-main');
var navToggle = document.querySelector('.nav-main__toggle');

navMain.classList.remove('nav-main--no-js');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('nav-main--closed')) {
    navMain.classList.remove('nav-main--closed');
  } else {
    navMain.classList.add('nav-main--closed');
  }
});
