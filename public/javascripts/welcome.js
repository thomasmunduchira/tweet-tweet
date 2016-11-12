$(document).ready(function() {
  $('#register-form').on("submit", function(event) {
    event.preventDefault();
    $.post({
      url: '/register',
      data: $(this).serialize(),
    }).done(function(data) {
      if (data.success) {
        window.location.href = data.redirect;
      } else {
        console.log(data.message);
      }
    }).fail(function(err) {
      console.log('Failed:', err);
    });
  });
  $("#log-in-form").on("submit", function(event) {
    event.preventDefault();
    $.post({
      url: '/login',
      data: $(this).serialize(),
    }).done(function(data) {
      if (data.success) {
        window.location.href = data.redirect;
      } else {
        console.log(data.message);
      }
    }).fail(function(err) {
      console.log('Failed:', err);
    });
  });
});
