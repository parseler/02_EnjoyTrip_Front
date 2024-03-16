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
