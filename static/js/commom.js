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


document.addEventListener('DOMContentLoaded', function () {
    const itemList = document.getElementById('item-list');
    const pagination = document.getElementById('pagination');
    
    const itemsPerPage = 5; // 페이지당 아이템 수
    const items = generateItems(20); // 가상의 아이템 생성
    
    let currentPage = 1; // 현재 페이지

    function generateItems(count) {
        const items = [];
        for (let i = 1; i <= count; i++) {
            items.push(`Item ${i}`);
        }
        return items;
    }

    function renderItems(page) {
        itemList.innerHTML = ''; // 목록 초기화

        const startIdx = (page - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        const displayedItems = items.slice(startIdx, endIdx);

        displayedItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            itemList.appendChild(listItem);
        });
    }

    function renderPagination() {
        pagination.innerHTML = ''; // 페이지네이션 초기화

        const totalPages = Math.ceil(items.length / itemsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.addEventListener('click', function () {
                currentPage = i;
                renderItems(currentPage);
                renderPagination();
            });
            pagination.appendChild(pageButton);
        }
    }

    // 초기 페이지 렌더링
    renderItems(currentPage);
    renderPagination();
});


// 메뉴 클릭시 font-color 변경

// function home_active(){
//     var home = document.getElementById("home");

//     home.style.color ="red"
// }

function hashtag(){
    const hashtag_btn = document.getElementById("hashtagbtn");
    const followbtn = document.getElementById("followbtn");
    const follow_c = document.getElementById("follow_content");
    const hashtag_c = document.getElementById("hashtag_content");

    hashtag_c.style.display="block";
    follow_c.style.display ="none";
    hashtag_btn.style.color = "#393939";
    followbtn.style.color = "#E2E3E4";
    
}

function follow(){
    const hashtag_btn = document.getElementById("hashtagbtn");
    const followbtn = document.getElementById("followbtn");
    const follow_c = document.getElementById("follow_content");
    const hashtag_c = document.getElementById("hashtag_content");

    follow_c.style.display ="block";
    hashtag_c.style.display ="none";
    followbtn.style.color = "#393939";
    hashtag_btn.style.color = "#E2E3E4";
    
}