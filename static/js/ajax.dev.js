"use strict";

$("#ajaxTest").on("click", function () {
  $.ajax({
    url: "/ajaxPoint",
    data: {
      phoneNumber: "phoneNumber"
    },
    method: "POST",
    dataType: "json"
  }).done(function (json) {
    $("#output").html(json.testing[0].phoneNumber);
  });
});