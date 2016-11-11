$(document).ready(function() {
   $('#register-form').on("submit", function(event) {
    event.preventDefault();
    $.post({
      url: '/register',
      data: $(this).serialize(),
    }).done(function(data) {
      window.location.href = data;
    });
  });
  $("#log-in-form").on("submit", function(event) {
    event.preventDefault();
    $.post({
      url: '/login',
      data: $(this).serialize(),
    }).done(function(data) {
      window.location.href = data;
    });
  });
});
