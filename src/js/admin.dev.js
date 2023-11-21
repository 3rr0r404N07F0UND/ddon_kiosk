"use strict";

$("#inputPW").on("input", function () {
  $("#inputPW").val($("#inputPW").val().replace(/[^0-9]/g, ""));

  if ($("#inputPW").val() === "1234") {
    $("#inputSubmitButton").trigger("click");
  }
});