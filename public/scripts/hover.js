$(document).ready(function (){
  $("#tweets-container").on("mouseenter", ".tweet", function (){
    $(this).find(".footer-icons").show();
  })
  $("#tweets-container").on("mouseleave", ".tweet", function (){
    $(this).find(".footer-icons").hide();
  })
})

// This shows the icons when the user mouse hovers a tweet.
// And when the mouse leaves, it hides the icons.