var inSize = true;

$(document).ready(function() {
  $("form").on("change", "#upload", function() {
    controllers.readFile(this);
  });
  $("#message").on("keydown", function() {
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
  addTweet: function(tweetText, imageSrc) {
    $.post({
      url: '/addTweet',
      data: {
        tweetText: tweetText, 
        imageSrc: imageSrc
      },
    }).done(function(tweetId) {
      view.addTweet(tweetId, tweetText, imageSrc);
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