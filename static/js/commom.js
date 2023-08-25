// 택스트 editor
$(document).ready(function() {
    $('#summernote').summernote();
  });


// 썸네일 등록 js
function setThumbnail(event) {
    var reader = new FileReader();

    reader.onload = function(event) {
      var img = document.createElement("img");
      img.setAttribute("src", event.target.result);
      document.querySelector("div#image_container").appendChild(img);
      document.querySelector("div#image_container").style.width='300px';
      document.querySelector("div#image_container").style.overflow = 'hidden';
    };

    reader.readAsDataURL(event.target.files[0]);
}

//공통헤더
$(function() {
  $("header").load("/header.html")
  $("footer").load("/footer.html")
})


// 닉네임 변경
document.addEventListener('DOMContentLoaded', function () {
  const userList = document.getElementById('user-list');
  const changeNicknameForm = document.getElementById('change-nickname-form');
  const changeNicknameButton = document.getElementById('change-nickname-button');

  // 초기 사용자 목록을 표시합니다.
  updateUsers();

  changeNicknameButton.addEventListener('click', function () {
      const username = document.getElementById('username').value;
      const newNickname = document.getElementById('new_nickname').value;

      if (username && newNickname) {
          changeNickname(username, newNickname);
      }
  });

  async function updateUsers() {
      try {
          const response = await fetch('/get_users'); // 서버에서 사용자 목록을 가져옵니다.
          const users = await response.json();

          userList.innerHTML = ''; // 기존 목록 초기화

          users.forEach(function (user) {
              const listItem = document.createElement('li');
              listItem.textContent = `${user.username}: ${user.nickname}`;
              userList.appendChild(listItem);
          });
      } catch (error) {
          console.error('Error updating users:', error);
      }
  }

  async function changeNickname(username, newNickname) {
      try {
          const response = await fetch('/change_nickname', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ username, newNickname })
          });

          if (response.ok) {
              updateUsers(); // 사용자 목록을 업데이트합니다.
          } else {
              console.error('Nickname change failed');
          }
      } catch (error) {
          console.error('Error changing nickname:', error);
      }
  }
});


