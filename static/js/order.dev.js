"use strict";

var removeComma = function removeComma(anyStr) {
  return anyStr.replace(/,/g, "");
};

var regStr = function regStr(someValue) {
  return someValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

var imAlive = 0;
console.log(removeComma("40,000"));
var iPaidIt = 0;
(void 0).addEventListener("click", function (e) {
  //console.log(e.target);
  var totalPrice = 0;

  if ($(".orderMenuPrice").length == 0) {
    $(".totalPriceResult").html("");
  } else {
    $(".orderMenuPrice").each(function (i, v) {
      totalPrice += Number(removeComma(v.innerHTML));
    });
    $(".totalPriceResult").html(regStr(totalPrice));
  }

  switch (e.target.id) {
    case "orderBt":
      var _tempStr = ""; //$("#modalOnBackground").css("display", "block");
      //$("#selectPage").css("display", "block");

      var menuArray = [];
      var menuTitle = $(".orderMenuName");
      menuTitle.each(function (i, v) {
        menuArray.push(v.innerHTML);
      });
      console.log(menuArray);

      if (menuArray.length != 0) {
        iPaidIt = 1;
        $(".allBox").css("display", "block");
        $(".totalWrapBox").css("display", "none");
      } else {
        console.log("addMenu");
        $("#modalOnBackground").css("display", "block");
        $(".mainModal").css("display", "block");
        $(".mainModalText").text("선택 메뉴가 없습니다.");
        $("#mainModalCloseBt").text("돌아가기");
      }

      $(".menuOrderList").html("");
      console.log(menuArray.length);

      for (var i = 0; i < menuArray.length; i++) {
        var countValue = $("#countValueBox".concat(i + 1)).html();
        var priceValue = $("#orderMenuPrice".concat(i + 1)).attr("data-price");
        var menuIdDataValue = $("#countValueBox".concat(i + 1)).attr("data-menuid");
        console.log(priceValue);
        console.log(menuIdDataValue);
        _tempStr = "\n      <li>\n        <div class=\"menuNum\">".concat(i + 1, "</div>\n        <div class=\"menuName\">").concat(menuArray[i], "</div>\n        <div class=\"menuCountBox\">\n          <button class=\"menuMinusBtn\" id=\"minusBtn\">-</button>\n          <div class=\"menuCount\" data-menuid=").concat(menuIdDataValue, ">").concat(countValue, "</div>\n          <button class=\"menuPlusBtn\" id=\"plusBtn\">+</button>\n        </div>\n        <div class=\"menuAmount\" data-price=").concat(priceValue, " data-menuid=").concat(menuIdDataValue, ">").concat(regStr(priceValue * countValue), "</div>\n        <button class=\"menuDelete\">\uC0AD\uC81C</button>\n      </li>\n      ");
        $(".menuOrderList").html($(".menuOrderList").html() + _tempStr);
      }

      updateOrderTotal();
      break;

    case "cansleBt":
    case "acceptBt":
      $("#selectPage").css("display", "none"); //$("#modalOnBackground").css("display", "none");

      if ($(".mainModal").css("display") == "block") {
        $("#modalOnBackground").css("display", "block");
        $(".mainModalText").text("이미 선택하셨습니다 :)");
        $("#mainModalCloseBt").text("돌아가기");
      } else {
        $("#modalOnBackground").css("display", "none");
      }

      break;

    case "maindishImage":
    case "maindishTabName":
      $("#mainMenuWrap1").siblings().removeClass("mainMenuWrapOn");
      $("#mainMenuWrap1").addClass("mainMenuWrapOn");
      $("#maindishTab").css("transform", "scale(1.1)");
      $("#maindishTab").css("opacity", "100%");
      $("#maindishTab").siblings().css("transform", "scale(0.9)");
      $("#maindishTab").siblings().css("opacity", "70%");
      break;

    case "noodleImage":
    case "noodleTabName":
      $("#mainMenuWrap2").siblings().removeClass("mainMenuWrapOn");
      $("#mainMenuWrap2").addClass("mainMenuWrapOn");
      $("#noodleTab").css("transform", "scale(1.1)");
      $("#noodleTab").css("opacity", "100%");
      $("#noodleTab").siblings().css("transform", "scale(0.9)");
      $("#noodleTab").siblings().css("opacity", "70%");
      break;

    case "singleImage":
    case "singleTabName":
      $("#mainMenuWrap3").siblings().removeClass("mainMenuWrapOn");
      $("#mainMenuWrap3").addClass("mainMenuWrapOn");
      $("#singleMenuTab").css("transform", "scale(1.1)");
      $("#singleMenuTab").css("opacity", "100%");
      $("#singleMenuTab").siblings().css("transform", "scale(0.9)");
      $("#singleMenuTab").siblings().css("opacity", "70%");
      break;

    case "sodaImage":
    case "sodaTabName":
      $("#mainMenuWrap4").siblings().removeClass("mainMenuWrapOn");
      $("#mainMenuWrap4").addClass("mainMenuWrapOn");
      $("#sodaTab").css("transform", "scale(1.1)");
      $("#sodaTab").css("opacity", "100%");
      $("#sodaTab").siblings().css("transform", "scale(0.9)");
      $("#sodaTab").siblings().css("opacity", "70%");
      break;

    case "alcoholImage":
    case "alcoholTabName":
      $("#mainMenuWrap5").siblings().removeClass("mainMenuWrapOn");
      $("#mainMenuWrap5").addClass("mainMenuWrapOn");
      $("#alcoholTab").css("transform", "scale(1.1)");
      $("#alcoholTab").css("opacity", "100%");
      $("#alcoholTab").siblings().css("transform", "scale(0.9)");
      $("#alcoholTab").siblings().css("opacity", "70%");
      break;

    case "mainMenuRightBt":
      document.querySelector(".mainMenuWrapOn").scrollLeft += 860;
      break;

    case "mainMenuLeftBt":
      document.querySelector(".mainMenuWrapOn").scrollLeft += -860;
      break;

    case "mainModalCloseBt":
      $(".mainModal").css("display", "none");
      $("#modalOnBackground").css("display", "none");
      break;
  }
});
var menuIdData = "";

var _loop = function _loop(i) {
  $("#setMenuList".concat(i, " > div")).on("click", function (e) {
    $("#modalOnBackground").css("display", "block");
    var imgPop = $("#setMenuUrl".concat(i)).val();
    var titlePop = $("#setMenuTitle".concat(i)).val();
    var descPop = $("#setMenuDesc".concat(i)).val();
    var infoPop = $("#setMenuInfo".concat(i)).val();
    var allerPop = $("#setMenuAllergyInfo".concat(i)).val();
    var pricePop = $("#setMenuPrice".concat(i)).val();
    menuIdData = $("#setMenuIdData".concat(i)).val();
    $("#selectPage").css("display", "block");
    $(".selectMenuImageBox").css("background-image", "url(./img/mainMenu/".concat(imgPop, ")"));
    $(".selectMenuName").html("".concat(titlePop));
    $(".selectMenuPrice").html("".concat(pricePop));
    $("#selectMenuDesc").html("".concat(descPop));
    $("#selectMenuInfo").html("".concat(infoPop));
    $("#selectMenuAllergy").html("".concat(allerPop));
  });
};

for (var i = 0; i < Number($("#setMenuLength").val()); i++) {
  _loop(i);
}

var _loop2 = function _loop2(_i) {
  $("#noodleMenuList".concat(_i, " > div")).on("click", function (e) {
    $("#modalOnBackground").css("display", "block");
    var imgPop = $("#noodleMenuUrl".concat(_i)).val();
    var titlePop = $("#noodleMenuTitle".concat(_i)).val();
    var descPop = $("#noodleMenuDesc".concat(_i)).val();
    var infoPop = $("#noodleMenuInfo".concat(_i)).val();
    var allerPop = $("#noodleMenuAllergyInfo".concat(_i)).val();
    var pricePop = $("#noodleMenuPrice".concat(_i)).val();
    menuIdData = $("#noodleMenuIdData".concat(_i)).val();
    $("#selectPage").css("display", "block");
    $(".selectMenuImageBox").css("background-image", "url(./img/noodleMenu/".concat(imgPop, ")"));
    $(".selectMenuName").html("".concat(titlePop));
    $(".selectMenuPrice").html("".concat(pricePop));
    $("#selectMenuDesc").html("".concat(descPop));
    $("#selectMenuInfo").html("".concat(infoPop));
    $("#selectMenuAllergy").html("".concat(allerPop));
  });
};

for (var _i = 0; _i < Number($("#noodleMenuLength").val()); _i++) {
  _loop2(_i);
}

var _loop3 = function _loop3(_i2) {
  $("#singleMenuList".concat(_i2, " > div")).on("click", function (e) {
    $("#modalOnBackground").css("display", "block");
    var imgPop = $("#singleMenuUrl".concat(_i2)).val();
    var titlePop = $("#singleMenuTitle".concat(_i2)).val();
    var descPop = $("#singleMenuDesc".concat(_i2)).val();
    var infoPop = $("#singleMenuInfo".concat(_i2)).val();
    var allerPop = $("#singleMenuAllergyInfo".concat(_i2)).val();
    var pricePop = $("#singleMenuPrice".concat(_i2)).val();
    menuIdData = $("#singleMenuIdData".concat(_i2)).val();
    $("#selectPage").css("display", "block");
    $(".selectMenuImageBox").css("background-image", "url(./img/singleMenu/".concat(imgPop, ")"));
    $(".selectMenuName").html("".concat(titlePop));
    $(".selectMenuPrice").html("".concat(pricePop));
    $("#selectMenuDesc").html("".concat(descPop));
    $("#selectMenuInfo").html("".concat(infoPop));
    $("#selectMenuAllergy").html("".concat(allerPop));
  });
};

for (var _i2 = 0; _i2 < Number($("#singleMenuLength").val()); _i2++) {
  _loop3(_i2);
}

var _loop4 = function _loop4(_i3) {
  $("#sodaMenuList".concat(_i3, " > div")).on("click", function (e) {
    $("#modalOnBackground").css("display", "block");
    var imgPop = $("#sodaMenuUrl".concat(_i3)).val();
    var titlePop = $("#sodaMenuTitle".concat(_i3)).val();
    var descPop = $("#sodaMenuDesc".concat(_i3)).val();
    var infoPop = $("#sodaMenuInfo".concat(_i3)).val();
    var allerPop = $("#sodaMenuAllergyInfo".concat(_i3)).val();
    var pricePop = $("#sodaMenuPrice".concat(_i3)).val();
    menuIdData = $("#sodaMenuIdData".concat(_i3)).val();
    $("#selectPage").css("display", "block");
    $(".selectMenuImageBox").css("background-image", "url(./img/sodaMenu/".concat(imgPop, ")"));
    $(".selectMenuName").html("".concat(titlePop));
    $(".selectMenuPrice").html("".concat(pricePop));
    $("#selectMenuDesc").html("".concat(descPop));
    $("#selectMenuInfo").html("".concat(infoPop));
    $("#selectMenuAllergy").html("".concat(allerPop));
  });
};

for (var _i3 = 0; _i3 < Number($("#sodaMenuLength").val()); _i3++) {
  _loop4(_i3);
}

var _loop5 = function _loop5(_i4) {
  $("#alcoholMenuList".concat(_i4, " > div")).on("click", function (e) {
    $("#modalOnBackground").css("display", "block");
    var imgPop = $("#alcoholMenuUrl".concat(_i4)).val();
    var titlePop = $("#alcoholMenuTitle".concat(_i4)).val();
    var descPop = $("#alcoholMenuDesc".concat(_i4)).val();
    var infoPop = $("#alcoholMenuInfo".concat(_i4)).val();
    var allerPop = $("#alcoholMenuAllergyInfo".concat(_i4)).val();
    var pricePop = $("#alcoholMenuPrice".concat(_i4)).val();
    menuIdData = $("#alcoholMenuIdData".concat(_i4)).val();
    $("#selectPage").css("display", "block");
    $(".selectMenuImageBox").css("background-image", "url(./img/alcoholMenu/".concat(imgPop, ")"));
    $(".selectMenuName").html("".concat(titlePop));
    $(".selectMenuPrice").html("".concat(pricePop));
    $("#selectMenuDesc").html("".concat(descPop));
    $("#selectMenuInfo").html("".concat(infoPop));
    $("#selectMenuAllergy").html("".concat(allerPop));
  });
};

for (var _i4 = 0; _i4 < Number($("#alcoholMenuLength").val()); _i4++) {
  _loop5(_i4);
}

var tempStr = "";
var countMenu = 1;
$(".calculateMiddle").html("");
$("#acceptBt").on("click", function () {
  var foodTitle = $(".selectMenuName").html();
  var foodPrice = $(".selectMenuPrice").html();
  var foodFlag = false;
  $(".orderMenuName").each(function (i, v) {
    if (v.innerHTML == foodTitle) {
      foodFlag = true;
    }
  });
  console.log(foodFlag);

  if (!foodFlag) {
    tempStr = "\n  <ul id=\"menuCal".concat(countMenu, "\">\n    <li>\n      <div class=\"orderMenuNum\">").concat(countMenu, "</div>\n      <div class=\"orderMenuName pointFont\">").concat(foodTitle, "</div>\n      <div class=\"orderMenuPlusOrMinus\">\n        <button class=\"mainMenuMinusBt hoverEffect\" id=\"mainMenuMinusBt").concat(countMenu, "\"> - </button>\n        <div class=\"countValueBox\" id=\"countValueBox").concat(countMenu, "\" data-menuid=\"").concat(menuIdData, "\">1</div>\n        <button class=\"mainMenuPlusBt hoverEffect\" id=\"mainMenuPlusBt").concat(countMenu, "\"> + </button>\n      </div>\n      <div class=\"orderMenuPrice\" id=\"orderMenuPrice").concat(countMenu, "\" data-price=\"").concat(removeComma(foodPrice), "\">").concat(regStr(foodPrice), "</div>\n      <button id=\"orderDelete").concat(countMenu, "\" class=\"orderMenuDelete hoverEffect\" type=\"button\" data-count=\"").concat(countMenu, "\"> \uCDE8\uC18C </button>\n    </li>\n  </ul>\n  ");
    $(".calculateMiddle").html($(".calculateMiddle").html() + tempStr);
    ++countMenu;
  } else {
    console.log("already");
    $("#modalOnBackground").css("display", "block");
    $(".mainModal").css("display", "block");
    $(".mainModalText").text("선택 메뉴가 없습니다.");
  }

  foodFlag = false;
  document.querySelector(".calculateMiddle").scrollTop += 62;
});
$(document).on("click", ".orderMenuDelete", function (e) {
  $(this).closest("ul").remove();
  countMenu--;
  $(".orderMenuNum").each(function (i, v) {
    v.innerHTML = i + 1;
  });
  $(".orderMenuPrice").each(function (i, v) {
    v.setAttribute("id", "orderMenuPrice".concat(i + 1));
  });
  $(".countValueBox").each(function (i, v) {
    v.setAttribute("id", "countValueBox".concat(i + 1));
  });
});
$(document).on("click", ".mainMenuPlusBt", function (e) {
  var insideVal = Number($(e.target).prev().html());
  var insidePrice = Number($(e.target).parent().next().attr("data-price"));
  console.log(insidePrice);
  insideVal += 1;
  $(e.target).prev().html(insideVal);
  $(e.target).parent().next().html(regStr(insidePrice * insideVal));
});
$(document).on("click", ".mainMenuMinusBt", function (e) {
  var insideVal = Number($(e.target).next().html());
  var insidePrice = Number($(e.target).parent().next().attr("data-price"));
  console.log(insidePrice);
  insideVal -= 1;
  insideVal == 0 && (insideVal = 1);
  $(e.target).next().html(insideVal);
  $(e.target).parent().next().html(regStr(insidePrice * insideVal));
});
$("#resetBt").on("click", function () {
  $(".calculateMiddle").html("");
  countMenu = 1;
});
var isItWork = false;

var tooMuchTimeYouUse = function tooMuchTimeYouUse() {
  setTimeout(function () {
    $(".mainModalText").text("30초 후에 종료됩니다.");
    $(".mainModalCloseBt").text("취소");
    var timer = 30;

    var timeDown = function timeDown() {
      setTimeout(function () {
        isItWork = true;

        if (imAlive === 0 && iPaidIt === 0) {
          $(".mainModal").css("display", "block");
          $("#modalOnBackground").css("display", "block");
          timer--;
          $(".mainModalText").text("".concat(timer, "\uCD08 \uD6C4\uC5D0 \uC885\uB8CC\uB429\uB2C8\uB2E4."));

          if (timer === 0) {
            $("#moveToIndexBt").trigger("click");
          }

          timeDown();
        }
      }, 1000);
    };

    timeDown();
  }, 60000);
};

tooMuchTimeYouUse();
$(".mainModalCloseBt").on("click", function () {
  $(".mainModalCloseBt").text() === "취소" && (imAlive = 1) && tooMuchTimeYouUse();
});