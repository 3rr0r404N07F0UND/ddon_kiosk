// 경고 모달창 함수 - alertModal(경고내용);
function alertModal(alertContent) {
  $(".alertModalBg").css({ display: "block" });
  $(".alertModalContent").text(alertContent);
  $(".alertModalBtn").click(function () {
    $(".alertModalBg").css({ display: "none" });
    $(".alertModalContent").text("");
  });
}
// 주문내역 페이지 - 삭제 버튼 누를 경우 주문내역 하나 삭제
$(document).on("click", ".menuDelete", function () {
  if($('.menuOrderList').children().length> 1){ // 메뉴 0개 일때 결제 x
    $(this).closest("li").remove();
    updateOrderTotal();
    $(".menuNum").each((i, v) => {
      v.innerHTML = i + 1;
    });
  } else {

  }
});
// 주문내역 페이지 - 플러스 버튼 누를 경우 주문 수량 증가
$(document).on("click", ".menuPlusBtn", function (e) {
  let menuCount = parseInt($(this).siblings(".menuCount").text());
  let menuCountBox = $(this).closest(".menuCountBox");
  //let menuAmount = $(`#${e.currentTarget.parentElement.parentElement.id}`).find(".menuAmount").html();
  let menuAmount = Number($(e.target).parent().next().attr("data-price"));
  console.log(menuAmount);
  //const menuAmount = 10000;
  if (menuCount < 99) {
    $(this)
      .siblings(".menuCount")
      .text(menuCount + 1);
    //menuCountBox.find(".menuAmount").text(menuAmount * (menuCount + 1));
    /*$(`${e.currentTarget.parentElement.parentElement.id}`)
        .find(".menuAmount")
        .text(menuAmount * (menuCount + 1)); */
    menuCount = parseInt($(this).siblings(".menuCount").text());
    $(this)
      .parent()
      .siblings(".menuAmount")
      .html(regStr(menuAmount * menuCount));
    updateOrderTotal();
  }
});
// 주문내역 페이지 - 마이너스 버튼 누를 경우 주문 수량 감소
$(document).on("click", ".menuMinusBtn", function (e) {
  let menuCount = parseInt($(this).siblings(".menuCount").text());
  console.log(menuCount);
  let menuCountBox = $(this).closest(".menuCountBox");
  //let menuAmount = $(this).parent().parent().find(".menuAmount").html();
  let menuAmount = Number($(e.target).parent().next().attr("data-price"));
  if (menuCount > 0) {
    $(this)
      .siblings(".menuCount")
      .text(menuCount - 1);
    menuCount = parseInt($(this).siblings(".menuCount").text());
    $(this)
      .parent()
      .siblings(".menuAmount")
      .html(regStr(menuAmount * menuCount));
    updateOrderTotal();
  }
  if (menuCount == 0) {
    $(this).closest("li").remove();
  }
});
//주문내역 페이지 - 총 주문 수량, 총 주문 금액 반영 함수
function updateOrderTotal() {
  let totalMenuCount = 0;
  let totalMenuPrice = 0;
  $(".menuCount").each((i, v) => {
    let count = parseInt($(v).text());
    console.log(count);
    totalMenuCount += count;
  });
  $(".menuAmount").each((i, v) => {
    let price = parseInt(removeComma($(v).text()));
    console.log($(v).text());
    totalMenuPrice += price;
    console.log(price);
  });
  $("#allOrderCount").text(totalMenuCount);
  if (totalMenuPrice != 0) {
    totalMenuPrice = regStr(totalMenuPrice);
  }
  $("#allPrice").text(totalMenuPrice);
}
//주문내역 창 - 이전 버튼 눌렀을 때 주문내역 내용 초기화, 주문내역 창 사라짐
$("#footerBtnBack, .titleLeft").click(function () {
  iPaidIt = 0;
  if (isItWork) {
    isItWork = 0;
    tooMuchTimeYouUse();
  }
  $(".menuOrderList").text("");
  $(".allBox").css({ display: "none" });
  $(".totalWrapBox").css({ display: "block" });
});
//결제하기 버튼을 눌렀을 때 포인트 적립 번호입력 모달 생성---------------------------
$("#footerBtnOk").click(function () {
  $(".modalBg").css({ display: "block" });
  $(".phoneNumberBox").css({ display: "block" });
});
//포인트 번호 입력 모달 - 번호 눌렀을 때 입력창에 숫자 입력, 전화번호 8자 입력 제한
$(".numberPad").click(function () {
  let maxLength = 11;
  if ($(".phoneNumberInput input").val().length >= maxLength) {
    return;
  } else {
    let number = $(this).text();
    $(".phoneNumberInput input").val(
      $(".phoneNumberInput input").val() + number
    );
  }
});
//포인트 번호 입력 모달
$("#okPoint").on("click", () => {
  if ($("#phoneNumberAjax").val().length == 11) {
    let phoneNumberAjaxValue = $("#phoneNumberAjax").val();
    const pointNumberArray = [...phoneNumberAjaxValue];
    console.log(pointNumberArray);
    const outputArray = [];
    let outputPhoneNumber = "";
    for (let i = 0; pointNumberArray.length; i++) {
      outputArray.push(pointNumberArray.shift());
      if (i == 2 || i == 6) {
        outputArray.push("-");
      }
    }
    for (const element of outputArray) {
      outputPhoneNumber += element;
    }
    console.log(outputArray);
    console.log(outputPhoneNumber);
    $("#phoneNumber").val(outputPhoneNumber);
    $("#phoneNumber1").val(outputPhoneNumber);
    $.ajax({
      url: "/ajaxPoint",
      data: { phoneNumber: outputPhoneNumber },
      method: "POST",
      dataType: "json",
    }).done((json) => {
      $("#havePoint").html(json.testing[0]?.point);
    });
  }
});
//포인트 번호 입력 모달 - 지우기(화살표)를 눌렀을 때 지워짐
$("#removeBtn").click(function () {
  $(".phoneNumberInput input").val(
    $(".phoneNumberInput input").val().slice(0, -1)
  );
});
//포인트 번호 입력 모달 - 초기화를 눌렀을 때 초기화됨
$("#resetBtn").click(function () {
  $(".phoneNumberInput input").val("");
});

//포인트 번호 입력 모달 - 적립안함을 누르면 포인트 사용 모달 생성(포인트 입력창 사라짐, 보유 포인트 0)--------
$("#notPoint").click(function () {
  $(".phoneNumberBox").css({ display: "none" });
  $(".usePointBox").css({ display: "block" });
  $(".numberInputBox").prop("disabled", true);
  $(".keyPadArea").css({ visibility: "hidden" });
  $("#havePoint").text("0");
  $("#totalPrice").text($("#allPrice").text());
  $("#finalTotalPrice").text($("#allPrice").text());
  //포인트 사용 모달 - 취소 누르면 모달 사라지고, 주문내역 창만 뜸
  $("#paymentCancelBtn").click(function () {
    $(".usePointBox, .modalBg").css({ display: "none" });
  });
  //포인트 사용 모달 - 포인트 입력 후 결제를 누르면 카드 결제 모달 생성
  $(".paymentGoBtn").on("click", () => {
    $(".usePointBox").css({ display: "none" });
    //////$(".")
  });
  //카드 결제 모달 - 취소를 누르면 모달이 사라지고, 주문내역창만 뜸
});
//포인트 번호 입력 모달 - 포인트 입력 후 결제를 누르면 포인트 사용 모달 생성----------------------------------
$("#okPoint").click(function () {
  let regex = /^01([0|1|6|7|8|9])-?\d{3,4}-?\d{4}$/;
  if (!regex.test($(".phoneNumberInput input").val())) {
    alertModal("올바른 전화번호 형태가 아닙니다.");
    $(".phoneNumberInput input").val("");
  } else {
    $(".phoneNumberBox").css({ display: "none" });
    $(".usePointBox").css({ display: "block" });
    $("#totalPrice").text($("#allPrice").text());
    $("#finalTotalPrice").text($("#allPrice").text());
  }
});
$("#numberInputBox").on("input", () => {
  $("#numberInputBox").val(($("#numberInputBox").val()).replace(/[^0-9]/g, ""));
  if(/^0[\d]/.test($("#numberInputBox").val())) {
    $("#numberInputBox").val(($("#numberInputBox").val()).replace(/^0/, ""));
  }
})
//포인트 사용 모달 - 포인트 숫자 입력, 총금액에서 사용포인트를 빼 최종금액을 나타냄
$(".numberPad2").click(function () {
  let number = parseInt($(this).text());
  $(".numberInputBox").val($(".numberInputBox").val() + number);
    if(/^0[\d]/.test($("#numberInputBox").val())) {
    $("#numberInputBox").val(($("#numberInputBox").val()).replace(/^0/, ""));
  }
  

  $("#finalTotalPrice").text(
    parseInt(removeComma($("#totalPrice").text())) -
      parseInt($(".numberInputBox").val())
  );
  $("#finalTotalPrice").html(regStr($("#finalTotalPrice").html()));
  if (parseInt($("#finalTotalPrice").text()) < 0) {
    alertModal("입력한 포인트가 총 금액보다 많습니다.");
    $("#finalTotalPrice").text($("#allPrice").text());
    $(".numberInputBox").val("");
  }
});
//포인트 사용 모달 - 지우기(화살표)를 눌렀을 때 지워짐
$("#removeBtn2").click(function () {
  $(".numberInputBox").val($(".numberInputBox").val().slice(0, -1));
  $("#finalTotalPrice").text(
    parseInt(removeComma($("#totalPrice").text())) -
      parseInt($(".numberInputBox").val())
  );
  $("#finalTotalPrice").html(regStr($("#finalTotalPrice").html()));
  if ($("#numberInputBox").val() == "") {
    $("#finalTotalPrice").text($("#totalPrice").text());
  }
});
//
//포인트 사용 모달 - 초기화를 눌렀을 때 초기화됨
$("#resetBtn2").click(function () {
  $(".numberInputBox").val("");
});
//포인트 사용 모달 - 취소 누르면 모달 사라지고, 주문내역 창만 뜸, 지금까지 입력한 값 초기화////////////////////////////////////////
$("#paymentCancelBtn").click(function () {
  $(".usePointBox, .modalBg").css({ display: "none" });
  $(".phoneNumberInput input").val("");
  $(".numberInputBox").val("");
  $("#finalTotalPrice").text("");
  $(".keyPadArea").css({ visibility: "visible" });
  $(".numberInputBox").prop("disabled", false);
});
//포인트 사용 모달 - 포인트 입력 후 결제를 누르면 카드 결제 모달 생성
$("#paymentGoBtn").click(function () {
  //포인트 사용 모달 - 보유포인트 보다 사용포인트가 많을 경우 경고
  let havePoint = removeComma($("#havePoint").text());
  let numberInputBox = removeComma($(".numberInputBox").val());
  havePoint = Number(havePoint);
  numberInputBox = Number(numberInputBox);
  if (numberInputBox > havePoint) {
    alertModal("입력한 포인트가 보유 포인트보다 많습니다.");
    $(".numberInputBox").val("");
    $("#finalTotalPrice").text($("#allPrice").text());
    return;
  } else {
    $(".usePointBox").css({ display: "none" });
    $(".cardModalBox").css({ display: "block" });
    $("#pointUse").val($("#numberInputBox").val());
    console.log($("#numberInputBox").val());
    $("#pointUse1").val($("#numberInputBox").val());
    setTimeout(function () {
      //
      cancelButtonTrueFalse = false;
      if (!cancelButtonTrueFalse) {
        $(".cardModalBox").css({ display: "none" });
        $(".paymentModal").css({ display: "block" });
        setTimeout(function () {
          $(".paymentModal").css({ display: "none" });
          $(".completeModal").css({ display: "block" });
          setTimeout(() => {
            $(".completeModal").css("display", "none");
            $(".modalBg").css("display", "none");
          }, 10000);
          let tenCount = 9;
          let goCountTen = setInterval(function () {
            $("#timeOutSecond").text(tenCount);
            tenCount--;
            if (tenCount == 0) {
              clearInterval(goCountTen);
              $(".completeModalBtn").trigger("click");
            }
          }, 1000);
          $("#timeOutSecond").text(10);
        }, 4000);
      }
    }, 2000);
  }
});
let cancelButtonTrueFalse = false;
$("#cardCancelButton").on("click", () => {
  cancelButtonTrueFalse = true;
});
$("#footerBtnOk").on("click", () => {
  $("#totalPriceReq").val($("#allPrice").html());
  $("#totalPriceReq1").val($("#allPrice").html());
  const menuIdArray = [];
  $(".menuCountBox").each((i, v) => {
    let menuIdRemember = $(v).find(".menuCount").data("menuid");
    console.log(menuIdRemember);
    let menuIdCount = $(v).find(".menuCount").text();
    console.log(menuIdCount);
    for (let i = 0; i < menuIdCount; i++) {
      menuIdArray.push(menuIdRemember);
    }
  });
  console.log(menuIdArray);
  $("#orderHistory").val(menuIdArray);
  $("#orderHistory1").val(menuIdArray);
});
