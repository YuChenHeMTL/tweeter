$(document).ready(function (){
  // var submitData = require("/app.js")
  $(".new-tweet").on("keyup", function (e){
    let charCounter = $(this).closest(".new-tweet").find("textarea").val().length;
    $(".counter").text(140 - charCounter);
    if ($(".counter").text() < 0 ) {
      $("span.counter").addClass("notValid");
    } else if ($(".counter").text() > -1 && $("span").hasClass("notValid")){
      $("span.counter").removeClass("notValid")
    }
      // if (charCounter === 1){
      //   $(".inputEmpty").slideDown(200, function (){
      //     setTimeout(function (){
      //       $(".inputEmpty").slideUp(200)
      //     }, 500)
      //     $(this).closest(".new-tweet").find("textarea").val("");
      //   });
      // } else if (charCounter > 140){
      //   alert("wow")
      //   $(".inputTooLarge").slideDown(200, function (){
      //     setTimeout(function (){
      //       $(".inputTooLarge").slideUp(200)
      //     }, 500)
      //   })
      // } else {
      //   $("form").submit();
      // }
  });
});
