document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /**
   * Sticky header on scroll
   */
  const selectHeader = document.querySelector("#header");
  if (selectHeader) {
    document.addEventListener("scroll", () => {
      window.scrollY > 100
        ? selectHeader.classList.add("sticked")
        : selectHeader.classList.remove("sticked");
    });
  }

  /**
   * Mobile nav toggle
   */

  const mobileNavToogleButton = document.querySelector(".mobile-nav-toggle");

  if (mobileNavToogleButton) {
    mobileNavToogleButton.addEventListener("click", function (event) {
      event.preventDefault();
      mobileNavToogle();
    });
  }

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToogleButton.classList.toggle("bi-list");
    mobileNavToogleButton.classList.toggle("bi-x");
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navbar a").forEach((navbarlink) => {
    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll(".navbar .dropdown > a");

  navDropdowns.forEach((el) => {
    el.addEventListener("click", function (event) {
      if (document.querySelector(".mobile-nav-active")) {
        event.preventDefault();
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("dropdown-active");

        let dropDownIndicator = this.querySelector(".dropdown-indicator");
        dropDownIndicator.classList.toggle("bi-chevron-up");
        dropDownIndicator.classList.toggle("bi-chevron-down");
      }
    });
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector(".scroll-top");
  if (scrollTop) {
    const togglescrollTop = function () {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    };
    window.addEventListener("load", togglescrollTop);
    document.addEventListener("scroll", togglescrollTop);
    scrollTop.addEventListener(
      "click",
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    );
  }

  /**
   * Hero Slider
   */
  var swiper = new Swiper(".sliderFeaturedPosts", {
    spaceBetween: 0,
    speed: 500,
    centeredSlides: true,
    loop: true,
    slideToClickedSlide: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".custom-swiper-button-next",
      prevEl: ".custom-swiper-button-prev",
    },
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", () => {
    aos_init();
  });
});

function register() {
  var password = document.getElementById("password").value;
  var passwordCheck = document.getElementById("password-check").value;

  // 비밀번호와 비밀번호 확인 일치 여부 확인
  if (password !== passwordCheck) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  var name = document.getElementById("name").value;
  var id = document.getElementById("id").value;
  var email = document.querySelector("#email").value;

  // 모든 유효성 검사를 통과했을 때
  var user = {
    name: name,
    id: id,
    password: password,
    email: email,
    isLogin: false,
  };

  localStorage.setItem("user", JSON.stringify(user));
  window.location.href = "login.html";
}

function login() {
  var id = document.querySelector("#id").value;
  var password = document.querySelector("#password").value;
  var rememberCheck = document.querySelector("#remember-check").checked;

  var user = JSON.parse(localStorage.getItem("user"));

  if (user.id == id && user.password == password) {
    user.isLogin = true;
    localStorage.setItem("user", JSON.stringify(user));
    window.location.replace("index.html");
  } else {
    alert("존재하지 않는 아이디 또는 잘못된 비밀번호입니다.");
  }
}

function logout() {
  localStorage.clear();
  window.location.replace("index.html");
}

function UserLoginCheck() {
  // 로그인 기능 구현
  var user = JSON.parse(localStorage.getItem("user"));
  if (user == null) return false;
  if (user.isLogin == false) return false;
  return true;
}

function loginUserBar() {
  var loginNav = document.querySelector("#loginUserCheck");

  var user = JSON.parse(localStorage.getItem("user"));

  if (user == null) return;
  if (!user.isLogin) return;
  loginNav.innerHTML = `
    <a href="#" onclick="logout()" class="me-3">로그아웃</a>
    <a href="mypage.html" class="me-3">마이페이지</a>
    <a href="#" class="mx-2"><span class="bi-instagram"></span></a>
  `;
}

window.onload = function () {
  UserLoginCheck();
  loginUserBar();
};
