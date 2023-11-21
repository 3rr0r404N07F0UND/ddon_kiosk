"use strict";

$(document).ready(function () {
  // 경고 모달창 함수 - alertModal(경고내용);
  function alertModal(alertContent) {
    $(".alertModalBg").css({
      "display": "block"
    });
    $(".alertModalContent").text(alertContent);
    $(".alertModalBtn").click(function () {
      $(".alertModalBg").css({
        "display": "none"
      });
      $(".alertModalContent").text("");
    });
  } // 주문내역 페이지 - 삭제 버튼 누를 경우 주문내역 하나 삭제


  $(".menuDelete").click(function () {
    $(this).closest("li").remove();
    updateOrderTotal();
  }); // 주문내역 페이지 - 플러스 버튼 누를 경우 주문 수량 증가

  $(".menuPlusBtn").on("click", function (e) {
    var menuCount = parseInt($(this).siblings(".menuCount").text());
    var menuCountBox = $(this).closest(".menuCountBox");
    var menuAmount = parseInt(menuCountBox.find(".menuAmount").text());

    if (menuCount < 99) {
      $(this).siblings(".menuCount").text(menuCount + 1); //menuCountBox.find(".menuAmount").text(menuAmount * (menuCount + 1));

      console.log(e.currentTarget.id.parentElement);
      updateOrderTotal();
    }
  }); // 주문내역 페이지 - 마이너스 버튼 누를 경우 주문 수량 감소

  $(".menuMinusBtn").on("click", function () {
    var menuCount = parseInt($(this).siblings(".menuCount").text());

    if (menuCount > 0) {
      $(this).siblings(".menuCount").text(menuCount - 1);
      $(this).closest("li").find(".menuAmount").text(menuAmount / menuCount * menuCount);
      updateOrderTotal();
    }
  }); //주문내역 페이지 - 총 주문 수량, 총 주문 금액 반영 함수

  function updateOrderTotal() {
    var totalMenuCount = 0;
    var totalMenuPrice = 0;
    $(".menuCount").each(function () {
      var count = parseInt($(this).text());
      totalMenuCount += count;
    });
    $(".menuAmount").each(function () {
      var price = parseInt($(this).text());
      totalMenuPrice += price;
    });
    $("#allOrderCount").text(totalMenuCount);
    $("#allPrice").text(totalMenuPrice);
  } //결제하기 버튼을 눌렀을 때 포인트 적립 번호입력 모달 생성---------------------------


  $(".footerBtn").click(function () {
    $(".modalBg").css({
      "display": "block"
    });
    $(".phoneNumberBox").css({
      "display": "block"
    }); //포인트 번호 입력 모달 - 번호 눌렀을 때 입력창에 숫자 입력, 전화번호 8자 입력 제한

    $(".numberPad").click(function () {
      var maxLength = 11;

      if ($(".phoneNumberInput input").val().length >= maxLength) {
        return;
      } else {
        var number = $(this).text();
        $(".phoneNumberInput input").val($(".phoneNumberInput input").val() + number);
      }
    }); //포인트 번호 입력 모달 - 지우기(화살표)를 눌렀을 때 지워짐

    $("#removeBtn").click(function () {
      $(".phoneNumberInput input").val($(".phoneNumberInput input").val().slice(0, -1));
    }); //포인트 번호 입력 모달 - 초기화를 눌렀을 때 초기화됨

    $("#resetBtn").click(function () {
      $(".phoneNumberInput input").val("");
    }); //포인트 번호 입력 모달 - 적립안함을 누르면 포인트 사용 모달 생성(포인트 입력창 사라짐, 보유 포인트 0)--------

    $("#notPoint").click(function () {
      $(".phoneNumberBox").css({
        "display": "none"
      });
      $(".usePointBox").css({
        "display": "block"
      });
      $(".numberInputBox").prop("disabled", true);
      $(".keyPadArea").css({
        "visibility": "hidden"
      });
      $("#havePoint").text("0");
      $("#totalPrice").text($("#allPrice").text());
      $("#finalTotalPrice").text($("#allPrice").text()); //포인트 사용 모달 - 취소 누르면 모달 사라지고, 주문내역 창만 뜸

      $("#paymentCancelBtn").click(function () {
        $(".usePointBox, .modalBg").css({
          "display": "none"
        });
      }); //포인트 사용 모달 - 포인트 입력 후 결제를 누르면 카드 결제 모달 생성--ERROR....

      $("#paymentGoBtn").click(function () {
        $(".usePointBox").css({
          "display": "none"
        });
      }); //카드 결제 모달 - 취소를 누르면 모달이 사라지고, 주문내역창만 뜸

      $(".cardModalBox button").click(function () {
        $(".cardModalBox, .modalBg").css({
          "display": "none"
        });
        $(".phoneNumberInput input").val("");
        $(".numberInputBox").val("");
        $("#finalTotalPrice").text("");
      });
    }); //포인트 번호 입력 모달 - 포인트 입력 후 결제를 누르면 포인트 사용 모달 생성----------------------------------

    $("#okPoint").click(function () {
      var regex = /^01([0|1|6|7|8|9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;

      if (!regex.test($(".phoneNumberInput input").val())) {
        alertModal("올바른 전화번호 형태가 아닙니다.");
        $(".phoneNumberInput input").val("");
      } else {
        $(".phoneNumberBox").css({
          "display": "none"
        });
        $(".usePointBox").css({
          "display": "block"
        });
        $("#totalPrice").text($("#allPrice").text());
        $("#finalTotalPrice").text($("#allPrice").text());
      } //포인트 사용 모달 - 포인트 숫자 입력, 총금액에서 사용포인트를 빼 최종금액을 나타냄


      $(".numberPad2").click(function () {
        var number = parseInt($(this).text());
        $(".numberInputBox").val($(".numberInputBox").val() + number);
        $("#finalTotalPrice").text(parseInt($("#totalPrice").text()) - parseInt($(".numberInputBox").val()));

        if (parseInt($("#finalTotalPrice").text()) < 0) {
          alertModal("입력한 포인트가 보유포인트보다 많습니다.");
          $("#finalTotalPrice").text($("#allPrice").text());
          $(".numberInputBox").val("");
        }
      }); //포인트 사용 모달 - 지우기(화살표)를 눌렀을 때 지워짐

      $("#removeBtn2").click(function () {
        $(".numberInputBox").val($(".numberInputBox").val().slice(0, -1));
      }); //포인트 사용 모달 - 초기화를 눌렀을 때 초기화됨

      $("#resetBtn2").click(function () {
        $(".numberInputBox").val("");
      }); //포인트 사용 모달 - 취소 누르면 모달 사라지고, 주문내역 창만 뜸, 지금까지 입력한 값 초기화

      $("#paymentCancelBtn").click(function () {
        $(".usePointBox, .modalBg").css({
          "display": "none"
        });
        $(".phoneNumberInput input").val("");
        $(".numberInputBox").val("");
        $("#finalTotalPrice").text("");
      }); //포인트 사용 모달 - 포인트 입력 후 결제를 누르면 카드 결제 모달 생성

      $("#paymentGoBtn").click(function () {
        //포인트 사용 모달 - 보유포인트 보다 사용포인트가 많을 경우 경고
        var havePoint = parseInt($("#havePoint").text());
        var numberInputBox = parseInt($(".numberInputBox").val());
        console.log(numberInputBox);

        if (numberInputBox > havePoint) {
          alertModal('입력한 포인트가 보유 포인트보다 많습니다.');
          $(".numberInputBox").val("");
          $("#finalTotalPrice").text($("#allPrice").text());
          return;
        } else {
          $(".usePointBox").css({
            "display": "none"
          });
          $(".cardModalBox").css({
            "display": "block"
          });
        }
      }); //카드 결제 모달 - 취소 누를 경우 모달 사라짐, 주문내역 창만 뜸

      $(".cardModalBox button").click(function () {
        $(".cardModalBox, .modalBg").css({
          "display": "none"
        });
        $(".phoneNumberInput input").val("");
        $(".numberInputBox").val("");
        $("#finalTotalPrice").text("");
      });
    });
  });
});