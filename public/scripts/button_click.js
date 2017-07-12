$(document).ready(function (){
  $(".newTweet-toggle").on("click", function (){
    if ($(".new-tweet").css("display") === "none"){
      $(window).scrollTop(0);
      $(".new-tweet").slideDown(300);
      $("textarea").focus();
      $(".newTweet-toggle").css("color", "#37b29f")
      $(".newTweet-toggle").css("background-color", "#e7fdff")
    } else {
      $(".new-tweet").slideUp(400);
      $(".newTweet-toggle").css("color", "black")
      $(".newTweet-toggle").css("background-color", "white")
    }
  })
})