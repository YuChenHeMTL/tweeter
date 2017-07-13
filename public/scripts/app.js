$(document).ready(function (){

  /*
   * Client-side JS logic goes here
   * jQuery is already loaded
   * Reminder: Use (and do all your DOM work in) jQuery's document ready function
   */
var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1499811678334
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1499811401678
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


  function createTweetElement (obj){
      let article = $("<article>").addClass("tweet");
      let twheader = $("<header>");
      let twmain = $("<main>");
      let twfooter = $("<footer>");
      let img = $("<img>").attr("src", obj.user.avatars.small);
      let h2 = $("<h2>").text(obj.user.name);
      let pHandle= $("<p>").text(obj.user.handle);
      let pContent = $("<p>").text(obj.content.text);
      let pTime = $("<p>").text(getTimeDifference(obj.created_at));
      let divIcon = $("<div>").addClass("footer-icons");
      let iFlag = $("<i>").addClass("btn flag hover");
      let iRotate = $("<i>").addClass("btn rotate hover");
      let iHeart = $("<i>").addClass("btn heart hover");
      divIcon.append(iFlag, iRotate, iHeart);
      twheader.append(img, h2, pHandle);
      twmain.append(pContent);
      twfooter.append(pTime, divIcon);
      article.append(twheader, twmain, twfooter)
    return article;
  }

  function getTimeDifference (timeStart){
    let currentTime = new Date().getTime();
    let timeDifference = currentTime - timeStart;
    timeDifference = Math.floor(timeDifference/1000 - 728);
    numberSeconds = timeDifference;
    numberMinutes = Math.floor(timeDifference/60);
    numberHours = Math.floor(timeDifference/60/60)
    numberDays = Math.floor(timeDifference/60/60/24);
    numberMonths = Math.floor(timeDifference/60/60/24/30);
    numberYears = Math.floor(timeDifference/60/60/24/365);
    if (numberMonths < 12 && numberMonths > 0){
      if (numberMonths === 1){
        return numberMonths + " month ago"
      } else {
        return numberMonths + " months ago"
      }
    } else if (numberDays < 30 && numberDays > 0) {
      if (numberDays === 1){
        return numberDays + " day ago"
      } else {
        return numberDays + " days ago"
      }

    } else if (numberHours < 24 && numberHours > 0) {
      if (numberHours === 1){
      return numberHours + " hour ago"
      } else {
      return numberHours + " hours ago"
      }

    } else if (numberMinutes < 60 && numberMinutes > 0){
      if (numberMinutes === 1){
      return numberMinutes + " minute ago"
      } else {
      return numberMinutes + " minutes ago"
      }

    } else if (numberSeconds < 60){
      if (numberSeconds === 1){
      return numberSeconds + " second ago"
      } else {
      return numberSeconds + " seconds ago"
      }

    } else {
      if (numberYears === 1){
      return numberYears + " year ago"
      } else {
      return numberYears + " years ago"
      }
    }
  }

  function renderTweets (arr) {
    for (let i = 0; i < arr.length; i++){
      let tweet = createTweetElement(arr[i]);
      $("#tweets-container").append(tweet);
    }
  }

  loadTweets();
  function submitData (){
    $("form").on("submit", function (event){
      event.preventDefault();
      let charCounter = $(this).closest(".new-tweet").find("textarea").val().length;
      if (charCounter === 0){
        $(".inputEmpty").slideDown(200, function (){
          setTimeout(function (){
            $(".inputEmpty").slideUp(200)
          }, 500)
        })
      } else if (charCounter > 140){
        $(".inputTooLarge").slideDown(200, function (){
          setTimeout(function (){
            $(".inputTooLarge").slideUp(200)
          }, 500)
        })
      } else {
        $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).closest("form").find("textarea").serialize(),
        success: function (alltweets) {
          $(".tweets-container").empty();
          loadTweets();
          // loadLastTweet();
          }
        })
        $(this).closest(".new-tweet").find("textarea").val("");
      }
    })
  }

  submitData()

  function loadTweets(){
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: function (alltweets) {
      renderTweets(alltweets);
      }
    });
  }
  function loadLastTweet(){
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: function (alltweets) {
      console.log([alltweets[alltweets.length -1]])
      renderTweets([alltweets[alltweets.length -1]]);
      }
    });
  }

})


