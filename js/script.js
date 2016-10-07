var navMain = document.querySelector(".nav-main");
var navToggle = document.querySelector(".nav-main__toggle");
var btnOrderFeature = document.querySelector(".btn--order-feature");
var modalOrder = document.querySelector(".modal-order");
var btnMakeOrder = document.querySelector(".btn--make-order");

function navMobile() {
  navMain.classList.toggle("nav-main--closed");
};

navMain.classList.remove("nav-main--no-js");
navToggle.addEventListener("click", navMobile);

btnOrderFeature.addEventListener("click", function() {
  event.preventDefault();
  modalOrder.classList.remove("modal-order--modal-close");
});

btnMakeOrder.addEventListener("click", function() {
  event.preventDefault();
  modalOrder.classList.add("modal-order--modal-close");
});

window.addEventListener("keydown", function(event) {
  if (event.keyCode === 27) {
    modalOrder.classList.add("modal-order--modal-close");
  }
});
