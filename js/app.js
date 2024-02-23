(function isWebP() {
   function testWebP(callback) {
      let webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height == 2);
      };
      webP.src =
         "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
   }
   testWebP(function (support) {
      if (support == true) {
         document.querySelector("html").classList.add("webp");
      } else {
         document.querySelector("html").classList.add("no-webp");
      }
   });
})();
const body = document.querySelector("body");
const header = document.querySelector(".header");
document.addEventListener("DOMContentLoaded", () => {
   headerWork();
   makeProductsLayout();
});
function makeProductsLayout() {
   const list = document.querySelector(".products-main__list");
   const items = document.querySelectorAll(".products-main__item");
   if (list && items.length) {
      if (items.length % 3 == 2 || items.length % 3 == 0) {
         list.classList.add("col-3");
      }
   }
}
function headerWork() {
   const burger = document.querySelector(".header__burger");
   const menu = document.querySelector(".header-menu");
   const backdrop = document.querySelector(".backdrop");
   const closeBtn = document.querySelector(".header-menu__close");

   headerSlides();
   headerWork();
   function headerSlides() {
      const subs = document.querySelectorAll(".header-sub");
      if (subs.length) {
         subs.forEach((sub) => {
            if (window.innerWidth > 992) {
               sub.addEventListener("mouseenter", () => {
                  let spoiler = sub.querySelector(".header-sub__spoiler");
                  // spoiler.style.display = "block";
                  // let spoilerHeight = spoiler.offsetHeight;
                  // spoiler.style.display = "";
                  // headerWrapper.style.height = 70 + spoilerHeight + "px";
                  spoiler.style.zIndex = "10";
                  slideShow(spoiler);
                  sub.classList.add("active");
               });
               sub.addEventListener("mouseleave", () => {
                  let spoiler = sub.querySelector(".header-sub__spoiler");
                  // headerWrapper.style.height = "";
                  spoiler.style.zIndex = "";

                  setTimeout(() => {
                     slideHide(spoiler);
                     sub.classList.remove("active");
                  }, 300);
               });
            } else {
               accordion(".header-sub p", ".header-sub__spoiler");
            }
         });
      }
   }
   function headerWork() {
      if (burger) {
         burger.addEventListener("click", () => {
            openBurger();
         });
         backdrop.addEventListener("click", () => {
            closeBurger();
         });
         closeBtn.addEventListener("click", () => {
            closeBurger();
         });
      }
   }
   function openBurger() {
      burger.classList.add("active");
      menu.classList.add("active");
      backdrop.classList.add("active");
      body.classList.add("lock");
   }
   function closeBurger() {
      burger.classList.remove("active");
      menu.classList.remove("active");
      backdrop.classList.remove("active");
      body.classList.remove("lock");
   }
}

function slideHide(el, duration = 300) {
   // завершаем работу метода, если элемент содержит класс collapsing или collapse_show
   if (
      el.classList.contains("collapsing") ||
      !el.classList.contains("collapse_show")
   ) {
      return;
   }
   // установим свойству height текущее значение высоты элемента
   el.style["height"] = `${el.offsetHeight}px`;
   // получим значение высоты
   el.offsetHeight;
   // установим CSS свойству height значение 0
   el.style["height"] = 0;
   // обрежем содержимое, выходящее за границы элемента
   el.style["overflow"] = "hidden";
   // добавим CSS свойство transition для осуществления перехода длительностью this._duration
   el.style["transition"] = `height ${duration}ms ease`;
   // удалим классы collapse и collapse_show
   el.classList.remove("collapse");
   el.classList.remove("collapse_show");
   // добавим класс collapsing
   el.classList.add("collapsing");
   // после завершения времени анимации
   window.setTimeout(() => {
      // удалим класс collapsing
      el.classList.remove("collapsing");
      // добавим класс collapsing
      el.classList.add("collapse");
      // удалим свойства height, transition и overflow
      el.style["height"] = "";
      el.style["transition"] = "";
      el.style["overflow"] = "";
   }, duration);
}
function slideShow(el, duration = 300) {
   // завершаем работу метода, если элемент содержит класс collapsing или collapse_show
   if (
      el.classList.contains("collapsing") ||
      el.classList.contains("collapse_show")
   ) {
      return;
   }
   // удаляем класс collapse
   el.classList.remove("collapse");
   // сохраняем текущую высоту элемента в константу height (это значение понадобится ниже)
   const height = el.offsetHeight;
   // устанавливаем высоте значение 0
   el.style["height"] = 0;
   // не отображаем содержимое элемента, выходящее за его пределы
   el.style["overflow"] = "hidden";
   // создание анимации скольжения с помощью CSS свойства transition
   el.style["transition"] = `height ${duration}ms ease`;
   // добавляем класс collapsing
   el.classList.add("collapsing");
   // получим значение высоты (нам этого необходимо для того, чтобы просто заставить браузер выполнить перерасчет макета, т.к. он не сможет нам вернуть правильное значение высоты, если не сделает это)
   el.offsetHeight;
   // установим в качестве значения высоты значение, которое мы сохранили в константу height
   el.style["height"] = `${height}px`;
   // по истечении времени анимации this._duration
   window.setTimeout(() => {
      // удалим класс collapsing
      el.classList.remove("collapsing");
      // добавим классы collapse и collapse_show
      el.classList.add("collapse");
      el.classList.add("collapse_show");
      // удалим свойства height, transition и overflow
      el.style["height"] = "";
      el.style["transition"] = "";
      el.style["overflow"] = "";
   }, duration);
}
function accordion(linkSelector, contentSelector) {
   // получаем линки
   const openLinks = document.querySelectorAll(`${linkSelector}`);
   // контенты
   const contents = document.querySelectorAll(`${contentSelector}`);
   if (openLinks.length > 0) {
      for (let i = 0; i < openLinks.length; i++) {
         let openLink = openLinks[i];
         openLink.addEventListener("click", () => {
            // все прячем
            for (let j = 0; j < contents.length; j++) {
               // если хоть один открывается - return
               if (contents[j].classList.contains("collapsing")) {
                  return;
               } // Иначе
               // все прячем
               slideHide(contents[j]);
            }
            for (let j = 0; j < openLinks.length; j++) {
               openLinks[j].classList.remove("active");
            }
            // записываем в переменную нужный таб
            let content = openLink.nextElementSibling;
            // работаем с классами линка
            if (content.classList.contains("collapsing")) {
               return;
            } else if (content.classList.contains("collapse_show")) {
               openLink.classList.remove("active");
            } else {
               openLink.classList.add("active");
            }
            // показываем нужный
            slideShow(content);
         });
      }
   }
}
