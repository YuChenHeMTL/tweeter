$(document).ready(function (){
  $("#tweets-container").on("mouseenter", ".tweet", function (){
    $(this).find(".footer-icons").show();
  })
  $("#tweets-container").on("mouseleave", ".tweet", function (){
    $(this).find(".footer-icons").hide()
  })
})