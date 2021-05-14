var item_elem = {
  wrapper : document.getElementsByClassName('wrapper'),
  wrapper_card_link_button : document.getElementsByClassName('wrapper_card_link_button'),
}
// определяю четное/нечетное число через БИТОВУЮ операцию AND вместо деления по модулю.
function  odd_even(){
  let arr = [1,2,3,4,5,6,7,8,9,10];
  arr.map( function(x) {
    if( x & 1 ) console.log(x + " Нечетное число!");
    else { console.log( x + " Четное число!");}
  })
}


// функция создает html объект-элемент link в документе и вставляет его в head тег с требуемой под тип браузера таблицей стилей
function userAgent(){
  const head = document.getElementsByTagName('head')[0];
  const link = document.createElement('link');
  link.rel="stylesheet";

  const all_userAgent = [
    "firefox", "chrome", "safari"
  ];

  const style_css = {
    "firefox" : "src/css/style.css",
    "chrome" : "src/css/chrome_style.css",
    "safari" : "src/css/chrome_style.css"
  };

  const ua = navigator.userAgent.toLocaleLowerCase();

  for (let id_brouser in all_userAgent){
    if( ua.search(all_userAgent[id_brouser]) >= 0 ){
      link.href = style_css[all_userAgent[id_brouser]];
      head.appendChild(link);
      console.log(ua);
      return ua;
    }
  }
  return ua;
};


export  {item_elem, userAgent, odd_even}
