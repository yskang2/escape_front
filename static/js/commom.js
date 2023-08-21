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
})

