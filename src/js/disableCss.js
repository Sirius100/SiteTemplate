//  модуль отключает отключает дефолтные css стили , так сказать
// зачищает пространство для модуля userAgent , который подключит нужные
// в зависимости от браузера css стили

function  clearcss (){
  console.log("css default clear");
  document.styleSheets[0].disabled = 1;
}

export default clearcss;
