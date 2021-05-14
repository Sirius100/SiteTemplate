// модуль отвечает за анимацию показа и скрытия меню
const menu = document.getElementsByClassName('menu')[0],
menu_span = menu.children[0],
nav = document.getElementsByTagName('nav')[0],
header_row = document.getElementsByClassName('row');
/*
определить координаты элемента с помощью функций offsetLeft, offsetHeight, offsetWidth, offsetTop.
Чтобы меню выдвигалось ровно по сетке bootstrap нужно к координате offsetLeft элемента nav прибавлять offsetLeft элемента nav(только положительное число) плюс координату offsetLeft элемента header_nav
*/

function request_menu() {menu.addEventListener( 'click', function () {

  // переменная visible_nav_position хранит вычисленную позицию на которую переместится элемент меню при вызове меню

  // если меню на экране то убираем его влево
  if(menu.classList == 'menu menu_active'){
    const visible_nav_position = 0 - (nav.offsetLeft + nav.offsetWidth);
    nav.style.transform = 'translateX(' + visible_nav_position + 'px)';
    nav.style.opacity = "0";
  }
  // если user вызвал меню
  else{

    // Вычисляю размер монитора/экрана устройства
    if (window.screen.availWidth <= 1024){
      var visible_nav_position = Math.abs(nav.offsetLeft);
    }
    else{
      var visible_nav_position = Math.abs(nav.offsetLeft) + header_row[0].offsetLeft;
    }
    nav.style.transform = 'translateX(' + visible_nav_position + 'px)';
    nav.style.opacity = "1";
  }
  menu.classList.toggle('menu_active');
  menu_span.classList.toggle('menu_active_span');
  }, false);
}

export default request_menu;
