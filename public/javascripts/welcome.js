$(document).ready(function() {
  $("#register-button-2").on("click", function() {
    var username = $("#register-username-input").val();
    var password = $("#register-password-input").val();
    var passwordConfirm = $("#register-password-confirm-input").val();
    $.post({
      url: '/register',
      data: {
        username: username,
        password: password,
        passwordConfirm: passwordConfirm
      }
    }).done(function(data) {
      console.log("Done" + data);
    });
  });
  $("#log-in-button-2").on("click", function() {
    var username = $("#log-in-username-input").val();
    var password = $("#log-in-password-input").val();
    $.post({
      url: '/login',
      data: {
        username: username,
        password: password
      }
    }).done(function(data) {
      console.log('Done');
    });
  });
});