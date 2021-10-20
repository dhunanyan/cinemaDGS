// MENU BURGER
const iconMenu = document.querySelector(".menu__icon");
const menuBody = document.querySelector(".menu__body");
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle("_lock");
    iconMenu.classList.toggle("_active");
    menuBody.classList.toggle("_active");
  });
}

//MENU TABS
const menuLinks = document.querySelectorAll(".menu__link");

menuLinks.forEach((menuLink) => {
  menuLink.addEventListener("click", function (e) {
    const currentLink = e.target;

    menuLinks.forEach((otherLink) => {
      if (otherLink.classList.contains("menu__link--active")) {
        otherLink.classList.remove("menu__link--active");
      }
    });

    currentLink.classList.add("menu__link--active");
  });
});

//MENU TABS ON SCROLL
$(window).scroll(function (event) {
  var scroll = $(window).scrollTop();
  if (
    scroll >= $("#home").offset().top - $(".header").outerHeight() &&
    scroll <= $("#home").outerHeight()
  ) {
    $(".menu__link--home").addClass("menu__link--active");
  }

  if (
    scroll <= $("#home").offset().top - $(".header").outerHeight() ||
    scroll >= $("#home").outerHeight()
  ) {
    $(".menu__link--home").removeClass("menu__link--active");
  }
});

$(window).scroll(function (event) {
  var scroll = $(window).scrollTop();
  if (
    scroll >= $("#movies").offset().top - $(".header").outerHeight() &&
    scroll <= $("#home").outerHeight() + $("#movies").outerHeight()
  ) {
    $(".menu__link--projects").addClass("menu__link--active");
  }

  if (
    scroll <= $("#movies").offset().top - $(".header").outerHeight() ||
    scroll >= $("#home").outerHeight() + $("#movies").outerHeight()
  ) {
    $(".menu__link--projects").removeClass("menu__link--active");
  }
});

$(window).scroll(function (event) {
  var scroll = $(window).scrollTop();
  if (
    scroll >= $("#contact").offset().top - $(".header").outerHeight() &&
    scroll <=
      $("#home").outerHeight() +
        $("#movies").outerHeight() +
        $("#contact").outerHeight()
  ) {
    $(".menu__link--contact").addClass("menu__link--active");
  }

  if (
    scroll <= $("#contact").offset().top - $(".header").outerHeight() ||
    scroll >=
      $("#home").outerHeight() +
        $("#movies").outerHeight() +
        $("#contact").outerHeight()
  ) {
    $(".menu__link--contact").removeClass("menu__link--active");
  }
});

//SCROLL

//this is where we apply opacity to the arrow
$(window).scroll(function () {
  //get scroll position
  var topWindow = $(window).scrollTop();
  //multipl by 1.5 so the arrow will become transparent half-way up the page
  var topWindow = topWindow * 1.5;

  //get height of window
  var windowHeight = $(window).height();

  //set position as percentage of how far the user has scrolled
  var position = topWindow / windowHeight;
  //invert the percentage
  position = 1 - position;

  //define arrow opacity as based on how far up the page the user has scrolled
  //no scrolling = 1, half-way up the page = 0
  $(".hero__arrow").css("opacity", position);
});

//Code stolen from css-tricks for smooth scrolling:
$(function () {
  $(".yakor").click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html,body").animate(
          {
            scrollTop: target.offset().top - 70,
          },
          1000
        );
        return false;
      }
    }
  });
});

//SLIDER
const wrapper = document.querySelector(".scroll__wrapper");
const el = document.querySelector(".scroll");
const filler = document.querySelector(".scroll__filler");
const position = document.querySelector(".scroll__position-inner");
const inner = document.querySelector(".scroll__inner");
const btns = {
  prev: document.querySelector(".scroll__btn.prev"),
  next: document.querySelector(".scroll__btn.next"),
};

const lerp = (a, b, n) => {
  return (1 - n) * a + n * b;
};

const padding = 20;

let scrollNow = 0;

filler.style.width = inner.offsetWidth + padding * 2 + "px";
position.style.width =
  (wrapper.offsetWidth / (inner.offsetWidth + padding * 2)) * 100 + "%";

const offset = 150;
const angle = 25;
const z = 15;

function render() {
  let now = lerp(scrollNow, wrapper.scrollLeft, 0.02);
  gsap.set(el, { x: -now });
  gsap.set(position, { x: (now / wrapper.offsetWidth) * 100 + "%" });

  document.querySelectorAll(".scroll__item").forEach((item) => {
    let elPos = item.offsetLeft + item.offsetWidth / 2 - scrollNow;

    if (elPos > wrapper.offsetWidth - offset) {
      let q = (wrapper.offsetWidth - elPos) / offset;
      gsap.set(item, { rotateY: -(angle - q * angle), z: z - z * q });
    } else if (elPos < offset) {
      let q = elPos / offset;
      gsap.set(item, { rotateY: angle - q * angle, z: z - z * q });
    } else {
      gsap.set(item, { rotateY: 0, z: 0 });
    }
  });

  scrollNow = now;

  if (wrapper.scrollLeft === 0) btns.prev.disabled = true;
  else if (
    inner.offsetWidth - wrapper.scrollLeft ===
    wrapper.offsetWidth - padding * 2
  )
    btns.next.disabled = true;
  else {
    btns.prev.disabled = false;
    btns.next.disabled = false;
  }
  requestAnimationFrame(render);
}

render();

function nextBtn() {
  window.innerWidth < 1230
    ? (wrapper.scrollLeft +=
        document.querySelector(".scroll__item").offsetWidth * 1 - 20)
    : (wrapper.scrollLeft +=
        document.querySelector(".scroll__item").offsetWidth * 2 - 20);
  if (window.innerWidth < 800 && window.innerWidth > 700) {
    wrapper.scrollLeft +=
      document.querySelector(".scroll__item").offsetWidth * 2 - 20;
  }
  if (window.innerWidth < 700 && window.innerWidth > 500) {
    wrapper.scrollLeft +=
      document.querySelector(".scroll__item").offsetWidth * 1 - 20;
  }

  if (window.innerWidth < 576) {
    wrapper.scrollLeft +=
      document.querySelector(".scroll__item").offsetWidth / 100 - 20;
  }
}
function prevBtn() {
  window.innerWidth < 1230
    ? (wrapper.scrollLeft -=
        document.querySelector(".scroll__item").offsetWidth * 1 - 20)
    : (wrapper.scrollLeft -=
        document.querySelector(".scroll__item").offsetWidth * 2 - 20);
  if (window.innerWidth < 800 && window.innerWidth > 700) {
    wrapper.scrollLeft -=
      document.querySelector(".scroll__item").offsetWidth * 2 - 20;
  }
  if (window.innerWidth < 700 && window.innerWidth > 500) {
    wrapper.scrollLeft -=
      document.querySelector(".scroll__item").offsetWidth * 1 - 20;
  }

  if (window.innerWidth < 576) {
    wrapper.scrollLeft -=
      document.querySelector(".scroll__item").offsetWidth / 100 - 20;
  }
}
