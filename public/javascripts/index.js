var inSize = true;
var currentTweetNumber = 0;

$(document).ready(function() {
  $("form").on("change", "#upload", function() {
    controllers.readFile(this);
  });
  $("#message").on("keyup", function() {
    if (event.keyCode === 13 && inSize) {
      event.preventDefault();
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
  $("tbody").on("click", ".delete-button", function(event) {
    controllers.deleteTweet(this.id);
  });
});

var tweetList = {
  tweets: [],
  addTweet: function(tweetNumber, tweetText, imageSrc) {
    this.tweets.push({
      tweetNumber: tweetNumber,
      tweetText: tweetText,
      imageSrc: imageSrc
    });
  },
  deleteTweet: function(tweetNumber) {
    for (var i = 0; i < this.tweets.length; i++) {
      tweet = this.tweets[i];
      if (tweet.tweetNumber === tweetNumber) {
        this.tweets.splice(i, 1);
      }
    }
  }
};

var controllers = {
  readFile: function(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        $("#file").attr("src", e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
      $("#file").css("display", "block");
    }
  },
  updateLength: function() {
    var remainingCharacters = 140 - $("#message").val().length;
    $("#length").html(remainingCharacters);
    if (remainingCharacters === 140) {
      inSize = false;
      $("#characters").css("color", "black");      
    } else if (remainingCharacters < 0) {
      inSize = false;
      $("#characters").css("color", "red");
    } else {
      inSize = true;
      $("#characters").css("color", "black");
    }
  },
  addTweet: function() {
    currentTweetNumber++;
    var tweetText = $("#message").val();
    var imageSrc = $("#file").attr("src");
    tweetList.addTweet(currentTweetNumber, tweetText, imageSrc);
    view.addTweet(currentTweetNumber, tweetText, imageSrc);
    view.resetMessage();
    view.resetFile();
  },
  deleteTweet: function(tweetNumber) {
    tweetList.deleteTweet(tweetNumber);
    view.deleteTweet(tweetNumber);
  }
};

var view = {
  resetMessage: function() {
    $("#message").val("");
  },
  resetFile: function() {
    $("#upload").replaceWith($("#upload").clone());
    $("#file").attr("src", "#");
    $("#file").css("display", "none");
  },p
  addTweet: function(tweetNumber, tweetText, imageSrc) {
    tweet = 
    $("tbody").prepend("<tr id='" + tweetNumber + "'> <td>\
      <div class='col-md-10'>\
      <img src='" + imageSrc + "' id='image" + tweetNumber + "'>" + 
      tweetText + "</div> <div class='col-md-2'>\
      <button type='button' class='delete-button btn btn-danger' id=" + tweetNumber + ">Delete</button>\
      </td> </tr>");
    if ($("#image" + tweetNumber).attr("src") != "#") {
      $("#image" + tweetNumber).css("display", "block");
    }
  },
  deleteTweet: function(tweetNumber) {
    $("tr[id=" + tweetNumber + "]").empty();
  }
};