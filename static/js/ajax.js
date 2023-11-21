$("#ajaxTest").on("click", () => {
  $.ajax({
    url: "/ajaxPoint",
    data: { phoneNumber: "phoneNumber" },
    method: "POST",
    dataType: "json",
  }).done((json) => {
    $("#output").html(json.testing[0]?.phoneNumber);
  });
});
