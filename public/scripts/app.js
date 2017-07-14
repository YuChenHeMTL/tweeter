$(document).ready(function (){

  /*
   * Client-side JS logic goes here
   * jQuery is already loaded
   * Reminder: Use (and do all your DOM work in) jQuery's document ready function
   */

//The main function that creates each tweets when it receives an object
//it gives css attributes to elements as they are created
// Likes
// create a like counter
// create a button for heart
// create a form for the button
// set the type as submit

  function createTweetElement (obj){
      let article = $("<article>").addClass("tweet");
      let twheader = $("<header>");
      let twmain = $("<main>");
      let twfooter = $("<footer>");
      let img = $("<img>").attr("src", obj.user.avatars.small);
      let h2 = $("<h2>").text(obj.user.name);
      let pHandle= $("<p>").text(obj.user.handle);
      let pContent = $("<p>").text(obj.content.text);
      let pTime = $("<p>").text(`${getTimeDifference(obj.created_at)} ${obj.likes} likes`);
      let divIcon = $("<div>").addClass("footer-icons");
      let iFlag = $("<i>").addClass("fa fa-flag hover");
      let iRotate = $("<i>").addClass("fa fa-retweet hover");
      let iHeart = $("<i>").addClass("fa fa-heart hover button").data("ObjectId", obj._id);
      divIcon.append(iFlag, iRotate, iHeart);
      twheader.append(img, h2, pHandle);
      twmain.append(pContent);
      twfooter.append(pTime, divIcon);
      article.append(twheader, twmain, twfooter);
    return article;
  }

//function to display time on the bottom left of tweets

  function getTimeDifference (timeCreated){
    let currentTime = new Date().getTime();
    let timeDifference;
    if (currentTime > timeCreated) {
    timeDifference = currentTime - timeCreated;
    } else {
    timeDifference = timeCreated - currentTime;
    }
    timeDifference = Math.floor(timeDifference/1000);
    numberSeconds = timeDifference;
    numberMinutes = Math.floor(numberSeconds/60);
    numberHours = Math.floor(numberMinutes/60);
    numberDays = Math.floor(numberHours/24);
    numberMonths = Math.floor(numberDays/30);
    numberYears = Math.floor(numberDays/365);
    if (numberMonths < 12 && numberMonths > 0){
      //if the number of months is between 12 and 0, display the number of months
      if (numberMonths === 1){
        return numberMonths + " month ago";
      } else {
        return numberMonths + " months ago";
      }
    } else if (numberDays < 30 && numberDays > 0) {
      //if the number of days is between 30 and 0, display the number of days

      if (numberDays === 1){
        return numberDays + " day ago";
      } else {
        return numberDays + " days ago";
      }

    } else if (numberHours < 24 && numberHours > 0) {
      //if the number of hours is between 24 and 0, display the number of hours

      if (numberHours === 1){
      return numberHours + " hour ago";
      } else {
      return numberHours + " hours ago";
      }

    } else if (numberMinutes < 60 && numberMinutes > 0){
      //if the number of minutes is between 60 and 0, display the number of minutes

      if (numberMinutes === 1){
      return numberMinutes + " minute ago";
      } else {
      return numberMinutes + " minutes ago";
      }

    } else if (numberSeconds < 60){
      //if the number of seconds is between 60 and 0, display the number of seconds

      if (numberSeconds === 0){
      return "Just Now";
      } else {
      return numberSeconds + " seconds ago";
      }

    } else {
      //if all of the options above doesnt count, display number of years
      if (numberYears === 1){
      return numberYears + " year ago";
      } else {
      return numberYears + " years ago";
      }
    }
  }

  // render all tweet objects as real tweets

  function renderTweets (arr) {
    for (let i = 0; i < arr.length; i++){
      let tweet = createTweetElement(arr[i]);
      $("#tweets-container").append(tweet);
    }
  }

  // This function processes the textarea of the form of submission

  function submitData (){
    $("#main-text").on("submit", function (event){
      event.preventDefault();

      //prevent the automatic submission of the form

      let charCounter = $(this).closest(".new-tweet").find("textarea").val().length;
      if (charCounter === 0){

        //if no character is entered, return "input empty" and don't submit

        $(".inputEmpty").slideDown(200, function (){
          setTimeout(function (){
            $(".inputEmpty").slideUp(200);
          }, 500);
        });
      } else if (charCounter > 140){

        //if character length is bigger than 140, return "input too large" and don't submit

        $(".inputTooLarge").slideDown(200, function (){
          setTimeout(function (){
            $(".inputTooLarge").slideUp(200);
          }, 500);
        });
      } else {

        //if successful, POST data in ajax

        $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).closest("form").find("textarea").serialize(),
        success: function (alltweets) {
          $("#tweets-container").empty();
          loadTweets();
          }
        });
        $(this).closest(".new-tweet").find("textarea").val("");
        //reset the textarea after successful POST
      }
    });
  }

  // calling the function
  submitData();

  //Function that transforms all tweet objects in the database into actual tweets

  function loadTweets(){
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: function (alltweets) {
      renderTweets(alltweets);
      $(".counter").text(140);
      }
    });
  }

  //calling the function renderTweets
  loadTweets();

  $("#tweets-container").on("click", ".button", function(){
    let someID = $(this).data("ObjectId");
      $(this).closest(".fa.fa-heart").css("color", "#079b62");
      $.ajax({
        url:`/tweets/${someID}/like`,
        method: "POST",
        data: {someID: someID}
      }).done(function (){
        // $("#tweets-container").empty();
        // loadTweets();
        location.reload();
      });
    // }else if ($(this).css("color") === "#079b62"){
    //   $(this).closest(".fa.fa-heart").css("color", "#66c5b7");
    //   $.ajax({
    //     url:`/tweets/${someID}/unlike`,
    //     method: "POST",
    //     data: {someID: someID}
    //   }).done(function (){
    //     // $("#tweets-container").empty();
    //     // loadTweets();
    //   });
  })
});
