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

  var users = JSON.parse(localStorage.getItem("users"));
  if (!users) users = [];

  console.log(users + user);
  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "login.html";
}

function login() {
  var id = document.querySelector("#id").value;
  var password = document.querySelector("#password").value;
  var rememberCheck = document.querySelector("#remember-check").checked;

  var users = JSON.parse(localStorage.getItem("users"));
  var userExist = false;

  users.forEach((user) => {
    if (user.id == id && user.password == password) {
      user.isLogin = true;
      localStorage.setItem("users", JSON.stringify(users));
      userExist = true;
      window.location.replace("index.html");
    }
  });

  if (!userExist) {
    alert("아이디또는 비밀번호를 확인해주세요");
  }
}

function withdraw() {
  var users = JSON.parse(localStorage.getItem("users"));

  users = users.filter((user) => {
    if (user.isLogin) {
      return false; // 해당 사용자를 제거하기 위해 false를 반환
    }
    return true; // 다른 사용자는 유지하기 위해 true를 반환
  });
  localStorage.setItem("users", JSON.stringify(users));
  window.location.replace("index.html");
}

function modify() {
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

  var users = JSON.parse(localStorage.getItem("users"));
  if (!users) users = [];

  users.forEach((user) => {
    if (user.isLogin) {
      user.name = name;
      user.id = id;
      user.email = email;
      user.password = password;
    }
  });

  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "index.html";
}

function logout() {
  users = [];
  var users = JSON.parse(localStorage.getItem("users"));

  users.forEach((user) => {
    if (user.isLogin) {
      user.isLogin = false;
    }
  });

  localStorage.setItem("users", JSON.stringify(users));
  window.location.replace("index.html");
}

function loginUserBar() {
  var loginNav = document.querySelector("#loginUserCheck");

  var users = JSON.parse(localStorage.getItem("users"));

  if (!users) return;
  var loginUserExist = false;

  users.forEach((user) => {
    if (user.isLogin) {
      loginUserExist = true;
    }
  });

  if (!loginUserExist) return;

  loginNav.innerHTML = `
    <a href="#" onclick="logout()" class="me-3">로그아웃</a>
    <a href="mypage.html" class="me-3">마이페이지</a>
    <a href="#" class="mx-2"><span class="bi-instagram"></span></a>
  `;
}

window.onload = function () {
  loginUserBar();
};

// 사이드바 열기/닫기 상태를 나타내는 변수
var isSidebarOpen = false;

// 사이드바 열기/닫기 기능을 구현하는 함수
function toggleSidebar() {
  var sidebar = document.getElementById("sidebar"); // 사이드바 요소 가져오기
  var mainbar = document.getElementById("main-map");
  var map = document.getElementById("map");

  // 사이드바의 표시 상태를 변경하고 isSidebarOpen 변수 업데이트
  if (!isSidebarOpen) {
    sidebar.style.display = "block";
    mainbar.classList.remove("col-md-11");
    mainbar.classList.add("col-md-8");
    isSidebarOpen = true; // 사이드바가 열린 상태로 업데이트
  } else {
    sidebar.style.display = "none";
    mainbar.classList.remove("col-md-8");
    mainbar.classList.add("col-md-11");
    isSidebarOpen = false; // 사이드바가 닫힌 상태로 업데이트
  }
}

// 검색 시 사이드바 열기기능을 구현하는 함수
function btnSearchSidebar() {
  var sidebar = document.getElementById("sidebar"); // 사이드바 요소 가져오기
  var mainbar = document.getElementById("main-map");
  var map = document.getElementById("map");

  // 사이드바가 숨겨져 있는 경우 보이도록 변경
  if (!isSidebarOpen) {
    sidebar.style.display = "block";
    mainbar.classList.remove("col-md-11");
    mainbar.classList.add("col-md-8");
    isSidebarOpen = true; // 사이드바가 열린 상태로 업데이트
  }
  // map.style.width = "100%";
}

