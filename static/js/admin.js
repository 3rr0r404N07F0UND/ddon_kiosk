// 경고 모달창 함수 - alertModal(경고내용);
function alertModal0(alertContent) {
  $(".alertModalBg0").css({ display: "block" });
  $(".alertModalContent0").text(alertContent);
  $(".alertModalBtn0").click(function () {
    $(".alertModalBg0").css({ display: "none" });
    $(".alertModalContent0").text("");
  });
}
//비밀번호 입력 모달 - 번호 눌렀을 때 입력창에 숫자 입력, 4자 입력 제한
$(".numberPad0").click(function () {
  let maxLength = 4;
  if ($(".phoneNumberInput0 input").val().length >= maxLength) {
    return;
  } else {
    let number = $(this).text();
    $(".phoneNumberInput0 input").val(
      $(".phoneNumberInput0 input").val() + number
    );
  }
});
//비밀번호 입력 모달 - 지우기(화살표)를 눌렀을 때 지워짐
$("#removeBtn0").click(function () {
  $(".phoneNumberInput0 input").val(
    $(".phoneNumberInput0 input").val().slice(0, -1)
  );
});
//비밀번호 입력 모달 - 초기화를 눌렀을 때 초기화
$("#resetBtn0").click(function () {
  $(".phoneNumberInput0 input").val("");
});
//비밀번호 1234이면 넘어가기
$("#okButton").click(function () {
  if (true) {
    $("#inputSubmitButton").trigger("click");
    $("#inputPW").val("");
  } else {
    alertModal0("올바른 비밀번호가 아닙니다.");
    $("#inputPW").val("");
  }
});

$("#inputPW").on("input", function () {
  $("#inputPW").val(
    $("#inputPW")
      .val()
      .replace(/[^0-9]/, "")
  );
});

