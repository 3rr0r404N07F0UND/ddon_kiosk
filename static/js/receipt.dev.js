"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var redirectPage = function redirectPage() {
  setTimeout(function () {
    $("#submitInput").trigger("click");
  }, 5000);
};

redirectPage();

var regStr = function regStr(someValue) {
  return someValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

var displayOrder = Number($(".receiptTopBox >p:nth-child(2)").html()) % 100 + 1;
$(".receiptTopBox >p:nth-child(2)").html(displayOrder);
$(".receiptMenuFirst").each(function (i, v) {
  var arrayHtml = JSON.parse(v.innerHTML);
  var numberToArray = []; // const arrayHtml2 = [];
  // const arrayOrderCountChecker = [];
  // const countOrder = 1;
  // let sameNumberChecker = arrayHtml.shift();
  // while (true) {
  //   if (sameNumberChecker == arrayHtml[0]) {
  //     arrayHtml.shift;
  //     countOrder++;
  //     if (!arrayHtml.length) {
  //       arrayOrderCountChecker.push(countOrder);
  //       break;
  //     }
  //   } else {
  //     arrayOrderCountChecker.push(countOrder);
  //     console.log(arrayOrderCountChecker);
  //     arrayHtml2.push(sameNumberChecker);
  //     //console.log(arrayHtml2);
  //     sameNumberChecker = arrayHtml.shift();
  //     //console.log(sameNumberChecker);
  //     if (!arrayHtml.length) {
  //       arrayHtml2.push(sameNumberChecker);
  //       arrayOrderCountChecker.push(countOrder);
  //     }
  //     countOrder = 1;
  //   }
  // }
  // arrayHtml = [...arrayHtml2];
  //console.log(arrayHtml);

  var j = 1;
  var menuCountArray = [];
  var testing = 0;

  while (j < 50) {
    testing = arrayHtml.filter(function (v1) {
      return v1 == j;
    });
    menuCountArray.push(testing.length);
    j++;
  }

  var outputOrderCount = menuCountArray.filter(function (v2) {
    return v2 > 0;
  });
  console.log(outputOrderCount);
  sameNumberDelSet = new Set(arrayHtml);
  sameNumberDel = _toConsumableArray(sameNumberDelSet);

  while (sameNumberDel.length) {
    switch (sameNumberDel.shift()) {
      case 1:
        numberToArray.push("도리텐 정식");
        break;

      case 2:
        numberToArray.push("민치카츠 정식");
        break;

      case 3:
        numberToArray.push("치킨그릴 정식");
        break;

      case 4:
        numberToArray.push("믹스 후라이 정식");
        break;

      case 5:
        numberToArray.push("치킨 난반 정식");
        break;

      case 6:
        numberToArray.push("큐브스테이크 정식");
        break;

      case 7:
        numberToArray.push("쇼가야키 정식");
        break;

      case 8:
        numberToArray.push("화로구이 정식");
        break;

      case 9:
        numberToArray.push("함박 그릴 정식");
        break;

      case 10:
        numberToArray.push("스키야키 정식");
        break;

      case 11:
        numberToArray.push("연어회 정식");
        break;

      case 12:
        numberToArray.push("호르몬그릴 정식");
        break;

      case 13:
        numberToArray.push("호르몬 모츠나베 정식");
        break;

      case 14:
        numberToArray.push("붕장어구이 정식");
        break;

      case 15:
        numberToArray.push("생선구이 정식");
        break;

      case 16:
        numberToArray.push("본카레 정식");
        break;

      case 17:
        numberToArray.push("스테미너 낫토 정식");
        break;

      case 18:
        numberToArray.push("사오리(학꽁치)튀김");
        break;

      case 19:
        numberToArray.push("키즈정식");
        break;

      case 20:
        numberToArray.push("나가사키 해물라면");
        break;

      case 21:
        numberToArray.push("삿뽀로 미소라멘");
        break;

      case 22:
        numberToArray.push("쇼가야키");
        break;

      case 23:
        numberToArray.push("치킨그릴");
        break;

      case 24:
        numberToArray.push("화로구이 8~10p");
        break;

      case 25:
        numberToArray.push("붕장어");
        break;

      case 26:
        numberToArray.push("연어사시미");
        break;

      case 27:
        numberToArray.push("치킨난반");
        break;

      case 28:
        numberToArray.push("스위트포테이토");
        break;

      case 29:
        numberToArray.push("시샤모");
        break;

      case 30:
        numberToArray.push("치킨가라아게");
        break;

      case 31:
        numberToArray.push("스키야키");
        break;

      case 32:
        numberToArray.push("믹스후라이");
        break;

      case 33:
        numberToArray.push("민치카츠");
        break;

      case 34:
        numberToArray.push("감자고로케");
        break;

      case 35:
        numberToArray.push("스노우크랩");
        break;

      case 36:
        numberToArray.push("스테미너 낫토");
        break;

      case 37:
        numberToArray.push("호르몬 모츠나베");
        break;

      case 38:
        numberToArray.push("연어구이");
        break;

      case 39:
        numberToArray.push("고등어구이 1/2");
        break;

      case 40:
        numberToArray.push("콜라");
        break;

      case 41:
        numberToArray.push("사이다");
        break;

      case 42:
        numberToArray.push("닥터페퍼");
        break;

      case 43:
        numberToArray.push("환타");
        break;

      case 44:
        numberToArray.push("일본주");
        break;

      case 45:
        numberToArray.push("사케");
        break;

      case 46:
        numberToArray.push("아사히 생맥주");
        break;

      case 47:
        numberToArray.push("산토리 하이볼");
        break;

      case 48:
        numberToArray.push("한라산 소주");
        break;

      case 49:
        numberToArray.push("히비키 위스키");
        break;
    }
  }

  var lastOutputArray = [];
  numberToArray.forEach(function (v1, i1) {
    lastOutputArray.push("".concat(v1, " ").concat(outputOrderCount[i1], "\uAC1C <br />"));
  });
  lastOutputArray = String(lastOutputArray);
  v.innerHTML = lastOutputArray.replace(/,/g, "");
});
/*
$(".receiptMenuText > div:nth-child(2)").html(
  regStr($(".receiptMenuText > div:nth-child(2)").html())
);
*/

$(".numberComma").each(function (i, v) {
  $(v).html(regStr($(v).html()));
});