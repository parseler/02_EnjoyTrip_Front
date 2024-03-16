function postboard() {
  var title = document.getElementById("boardTitle").value;
  var content = document.getElementById("boardContent").value;

  if (!title || !content) return;
  // 모든 유효성 검사를 통과했을 때
  var board = {
    title: title,
    content: content,
  };

  var boards = JSON.parse(localStorage.getItem("boards"));
  if (!boards) boards = [];

  boards.push(board);

  localStorage.setItem("boards", JSON.stringify(boards));
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

// 페이지가 로드될 때 실행되는 함수
window.onload = function () {
  loginUserBar();
  displayBoards(); // 게시물 목록을 표시
};

// 게시물을 HTML로 만들어주는 함수
function createBoardHTML(board) {
  var boardHTML = '<div class="card mt-3">';
  boardHTML += '<div class="card-body">';
  boardHTML += '<h1 class="card-title">' + board.title + "</h1>";
  boardHTML += '<h5 class="card-content">' + board.content + "</h5>";
  boardHTML += "</div>";
  boardHTML += "</div>";
  return boardHTML;
}

// 게시물 목록을 표시하는 함수
function displayBoards() {
  var boardListDiv = document.getElementById("boardList");
  var boards = JSON.parse(localStorage.getItem("boards"));

  if (!boards) {
    boardListDiv.innerHTML = "<p>등록된 게시물이 없습니다.</p>";
    return;
  }

  var boardsHTML = "";
  boards.forEach(function (board) {
    boardsHTML += createBoardHTML(board);
  });
  boardListDiv.innerHTML = boardsHTML;
}

// 게시물을 추가하는 함수
function postBoard() {
  var title = document.getElementById("boardTitle").value;
  var content = document.getElementById("boardContent").value;

  if (!title || !content) return;
  // 모든 유효성 검사를 통과했을 때
  var board = {
    title: title,
    content: content,
  };

  var boards = JSON.parse(localStorage.getItem("boards"));
  if (!boards) boards = [];

  boards.push(board);

  localStorage.setItem("boards", JSON.stringify(boards));

  // 추가된 게시물을 표시
  displayBoards();
}


// favorite으로부터 정보 받아와서 공유게시판에 출력
document.addEventListener('DOMContentLoaded', function () {

  var fvt =[];

  var favorite = {
    title: "aaa",
    content: "aaa",
  };
  fvt.push(favorite);
  var favorite = {
    title: "aaa",
    content: "aaa",
  };
  fvt.push(favorite);

  localStorage.setItem("favorites", JSON.stringify(fvt));

  // favoriteboardList 요소를 가져옵니다.
  var favoriteboardList = document.getElementById('favoriteboardList');

  // 로컬 스토리지에서 favorite 데이터를 가져옵니다.
  var favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // favorite 데이터를 favoriteboardList에 추가합니다.
  favorites.forEach(function (favorite) {
      var favoriteItem = document.createElement('div');
      var btn = document.createElement('button');
      btn.type = "button";
      btn.classList.add('btn');
      btn.classList.add('btn-primary');
      btn.textContent = "공유하기";

      favoriteItem.classList.add('favorite-item');
      favoriteItem.innerHTML = '<h2>' + favorite.title + '</h2><p>' + favorite.content + '</p>';
      // 버튼을 favoriteItem에 추가합니다.
      favoriteItem.appendChild(btn);
      favoriteItem.appendChild(document.createElement("hr"));
      favoriteboardList.appendChild(favoriteItem);
  });
});

