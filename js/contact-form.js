/*
--------------------------------
Ajax Contact Form
--------------------------------
+ https://github.com/pinceladasdaweb/Ajax-Contact-Form
+ A Simple Ajax Contact Form developed in PHP with HTML5 Form validation.
+ Has a fallback in jQuery for browsers that do not support HTML5 form validation.
+ version 1.0.1
+ Copyright 2014 Pedro Rogerio
+ Licensed under the MIT license
+ https://github.com/pinceladasdaweb/Ajax-Contact-Form
*/

(function ($, window, document, undefined) {
  "use strict";

  var $form = $("#contact-form");

  $form.submit(function (e) {
    // remove the error class
    $(".form-group").removeClass("has-error");
    $(".help-block").remove();

    // get the form data
    var formData = {
      name: $('input[name="name"]').val(),
      email: $('input[name="email"]').val(),
      phone: $('input[name="phone"]').val(),
      subject: $('input[name="subject"]').val(),
      message: $('textarea[name="message"]').val(),
    };

    // process the form
    $.ajax({
      type: "POST",
      url: "contact-form.php",
      data: formData,
      dataType: "json",
      encode: true,
    })
      .done(function (data) {
        // handle errors
        if (!data.success) {
          if (data.errors.name) {
            $("#your-fname").addClass("has-error");
            $("#your-fname")
              .find(".col-lg-12")
              .append(
                '<span class="help-block">' + data.errors.name + "</span>"
              );
          }

          if (data.errors.email) {
            $("#your-email").addClass("has-error");
            $("#your-email")
              .find(".col-lg-12")
              .append(
                '<span class="help-block">' + data.errors.email + "</span>"
              );
          }

          if (data.errors.phone) {
            $("#your-phone").addClass("has-error");
            $("#your-phone")
              .find(".col-lg-12")
              .append(
                '<span class="help-block">' + data.errors.email + "</span>"
              );
          }

          if (data.errors.subject) {
            $("#your-subject").addClass("has-error");
            $("#your-subject")
              .find(".col-lg-12")
              .append(
                '<span class="help-block">' + data.errors.subject + "</span>"
              );
          }

          if (data.errors.message) {
            $("#your-message").addClass("has-error");
            $("#your-message")
              .find(".col-lg-12")
              .append(
                '<span class="help-block">' + data.errors.message + "</span>"
              );
          }
        } else {
          // display success message
          $form.html(
            '<div class="alert alert-success">' + data.message + "</div>"
          );
        }
      })
      .fail(function (data) {
        // for debug
        console.log(data);
      });

    e.preventDefault();
  });
})(jQuery, window, document);
