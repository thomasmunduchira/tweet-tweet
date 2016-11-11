var inSize = true;

$(document).ready(function() {
  controllers.displayAllTweets();
  controllers.updateLength();
  $("form").on("change", "#upload", function() {
    controllers.readFile(this);
  });
  $("#message").on("keydown", function(event) {
    if (event.keyCode === 13 && inSize) {
      event.preventDefault();
      controllers.addTweet();
    }
  });  
  $("#message").on("keyup", function(event) {
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
  $("#log-out-button").on("click", function() {
    $.get({
      url: '/logout'
    });
  });
});

var tweetList = {
  getAllTweets: function() {
    $.get({
      url: '/allTweets'
    }).done(function(tweets) {
      tweets.forEach(function(tweet) {
        var tweetId = tweet._id;
        var tweetText = tweet.tweetText;
        var imageSrc = tweet.imageSrc;
        view.addTweet(tweetId, tweetText, imageSrc);
      });
      view.resetFocus();
    });
  },
  addTweet: function(tweetText, imageSrc) {
    $.post({
      url: '/addTweet',
      data: {
        tweetText: tweetText, 
        imageSrc: imageSrc
      }
    }).done(function(tweetId) {
      view.addTweet(tweetId, tweetText, imageSrc);
      view.resetFocus();
    });
  },
  deleteTweet: function(tweetId) {
    $.post({
      url: '/deleteTweet',
      data: {
        tweetId: tweetId
      }
    }).done(function() {
      view.deleteTweet(tweetId);
    });
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
    var textColor = "black";
    var isDisabled = false;
    if (remainingCharacters === 140) {
      inSize = false;
      isDisabled = true;
    } else if (remainingCharacters < 0) {
      inSize = false;
      textColor = "red";
      isDisabled = true;
    } else {
      inSize = true;
    }
    $("#characters").css("color", textColor);
    $("#submit-button").prop("disabled", isDisabled);   
  },
  displayAllTweets:function() {
    tweetList.getAllTweets();
  },
  addTweet: function() {
    var tweetText = $("#message").val();
    var imageSrc = $("#file").attr("src");
    tweetList.addTweet(tweetText, imageSrc);
    view.resetMessage();
    view.resetFile();
  },
  deleteTweet: function(tweetId) {
    tweetList.deleteTweet(tweetId);
  }
};

var view = {
  resetFocus: function() {
    $("#message").focus();
  },
  resetMessage: function() {
    $("#message").val("");
  },
  resetFile: function() {
    $("#upload").replaceWith($("#upload").clone());
    $("#file").attr("src", "#");
    $("#file").css("display", "none");
  },
  addTweet: function(tweetId, tweetText, imageSrc) {
    $("tbody").prepend("<tr id='" + tweetId + "'> <td>\
      <div class='col-md-10'>\
      <img src='" + imageSrc + "' id='image" + tweetId + "'>" + 
      tweetText + "</div> <div class='col-md-2'>\
      <button type='button' class='delete-button btn btn-danger' id=" + tweetId + ">Delete</button>\
      </td> </tr>");
    if ($("#image" + tweetId).attr("src") != "#") {
      $("#image" + tweetId).css("display", "block");
    }
  },
  deleteTweet: function(tweetId) {
    $("tr[id=" + tweetId + "]").empty();
  }
};