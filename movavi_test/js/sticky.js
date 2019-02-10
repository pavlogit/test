window.onload = function() {
  if (window.addEventListener) window.addEventListener("DOMMouseScroll", mouse_wheel, false);
  window.onmousewheel = document.onmousewheel = mouse_wheel;
}

let mouse_wheel = function(event) {
  if (false == !!event) event = window.event;
  let direction = ((event.wheelDelta) ? event.wheelDelta/120 : event.detail/-3) || false;
  let sticky = document.querySelector('.basket');
  if(direction < 0) {
    sticky.classList.remove('sticky-up');
    sticky.classList.add('sticky-down');
  }
  else {
    sticky.classList.remove('sticky-down');
    sticky.classList.add('sticky-up');
  }
}




  