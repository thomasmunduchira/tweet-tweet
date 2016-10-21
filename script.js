var inSize = true;

$(document).ready(function() {
  $("form").on("change", "#upload", function() {
    controllers.readFile(this);
  });
  $("#message").on("keyup", function() {
    if (event.keyCode === 13 && inSize) {
      controllers.addTweet();
    }
    controllers.updateLength();
  });
  $("#submit-button").on("click", function() {
    if (inSize) {
      controllers.addTweet();
    }
    controllers.updateLength();
  });
  $("tbody").on("click", ".delete-button", function() {
    controllers.deleteTweet(this.id);
  });
});

var tweetList = {
  tweets: [],
  addTweet: function(tweetText, imageSrc) {
    this.tweets.push({
      tweetText: tweetText,
      imageSrc: imageSrc
    });
  },
  deleteTweet: function(position) {
    this.tweets.splice(position, 1);
  }
}

var controllers = {
  resetMessage: function() {
    $("#message").val("");
  },
  resetFile: function() {
    $("#upload").replaceWith($("#upload").clone())
    $("#file").attr("src", "#");
    $("#file").css("display", "none");
  },
  readFile: function(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        $("#file").attr("src", e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
      $("#file").css("display", "block");
    }
  },
  updateLength: function() {
    var remainingCharacters = 140 - $("#message").val().length;
    $("#length").html(remainingCharacters);
    if (remainingCharacters >= 0) {
      inSize = true;
      $("#characters").css("color", "black");
    } else {
      inSize = false;
      $("#characters").css("color", "red");
    }
  },
  addTweet: function() {
    var tweetText = $("#message").val();
    var imageSrc = $("#file").attr("src");
    tweetList.addTweet(tweetText, imageSrc);
    this.resetMessage();
    this.resetFile();
    view.displayTweets();
  },
  deleteTweet: function(position) {
    tweetList.deleteTweet(position);
    view.displayTweets();
  }
}

var view = {
  displayTweets: function() {
    $("tbody").empty();
    for (var i = 0; i < tweetList.tweets.length; i++) {
      tweet = tweetList.tweets[i];
      $("tbody").prepend(
        "<tr> <th> <div class='row'> <div class='ten columns'>\
        <img src='" + tweet.imageSrc + "' id='image" + i + "'>" + 
        tweet.tweetText + "</div> <div class='two columns'>\
        <input class='button delete-button' type='button' value='Delete'\
        id='" + i + "'> </div> </th> </tr>");
      if ($("#image" + i).attr("src") != "#") {
        $("#image" + i).css("display", "block");
      }
    }
  }
}