let removeComma = (anyStr) => {
  return anyStr.replace(/,/g, "");
};

let regStr = (someValue) => {
  return someValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
let imAlive = 0;
console.log(removeComma("40,000"));
let iPaidIt = 0;
this.addEventListener("click", (e) => {
  //console.log(e.target);
  let totalPrice = 0;
  if ($(".orderMenuPrice").length == 0) {
    $(".totalPriceResult").html("");
  } else {
    $(".orderMenuPrice").each((i, v) => {
      totalPrice += Number(removeComma(v.innerHTML));
    });
    $(".totalPriceResult").html(regStr(totalPrice));
  }

  switch (e.target.id) {
    case "orderBt":
      let tempStr = "";
      //$("#modalOnBackground").css("display", "block");
      //$("#selectPage").css("display", "block");
      let menuArray = [];
      let menuTitle = $(".orderMenuName");
      menuTitle.each((i, v) => {
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
      for (let i = 0; i < menuArray.length; i++) {
        let countValue = $(`#countValueBox${i + 1}`).html();
        let priceValue = $(`#orderMenuPrice${i + 1}`).attr("data-price");
        let menuIdDataValue = $(`#countValueBox${i + 1}`).attr("data-menuid");
        console.log(priceValue);
        console.log(menuIdDataValue);
        tempStr = `
      <li>
        <div class="menuNum">${i + 1}</div>
        <div class="menuName">${menuArray[i]}</div>
        <div class="menuCountBox">
          <button class="menuMinusBtn" id="minusBtn">-</button>
          <div class="menuCount" data-menuid=${menuIdDataValue}>${countValue}</div>
          <button class="menuPlusBtn" id="plusBtn">+</button>
        </div>
        <div class="menuAmount" data-price=${priceValue} data-menuid=${menuIdDataValue}>${regStr(
          priceValue * countValue
        )}</div>
        <button class="menuDelete">삭제</button>
      </li>
      `;

        $(".menuOrderList").html($(".menuOrderList").html() + tempStr);
      }
      updateOrderTotal();
      break;
    case "cansleBt":
    case "acceptBt":
      $("#selectPage").css("display", "none");
      backgroundOnline = false;
      //$("#modalOnBackground").css("display", "none");
      if ($(".mainModal").css("display") == "block") {
        $("#modalOnBackground").css("display", "block");
        backgroundOnline = false;
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
      if (!backgroundOnline) {
        $("#modalOnBackground").css("display", "none");
      }
      imAlive = 1;
      break;
  }
});
let backgroundOnline = false;
let menuIdData = "";
for (let i = 0; i < Number($("#setMenuLength").val()); i++) {
  $(`#setMenuList${i} > div`).on("click", (e) => {
    $("#modalOnBackground").css("display", "block");
    backgroundOnline = true;
    let imgPop = $(`#setMenuUrl${i}`).val();
    let titlePop = $(`#setMenuTitle${i}`).val();
    let descPop = $(`#setMenuDesc${i}`).val();
    let infoPop = $(`#setMenuInfo${i}`).val();
    let allerPop = $(`#setMenuAllergyInfo${i}`).val();
    let pricePop = $(`#setMenuPrice${i}`).val();
    menuIdData = $(`#setMenuIdData${i}`).val();
    $("#selectPage").css("display", "block");
    $(".selectMenuImageBox").css(
      "background-image",
      `url(./img/mainMenu/${imgPop})`
    );
    $(".selectMenuName").html(`${titlePop}`);
    $(".selectMenuPrice").html(`${pricePop}`);
    $("#selectMenuDesc").html(`${descPop}`);
    $("#selectMenuInfo").html(`${infoPop}`);
    $("#selectMenuAllergy").html(`${allerPop}`);
  });
}
for (let i = 0; i < Number($("#noodleMenuLength").val()); i++) {
  $(`#noodleMenuList${i} > div`).on("click", (e) => {
    $("#modalOnBackground").css("display", "block");
    backgroundOnline = true;
    let imgPop = $(`#noodleMenuUrl${i}`).val();
    let titlePop = $(`#noodleMenuTitle${i}`).val();
    let descPop = $(`#noodleMenuDesc${i}`).val();
    let infoPop = $(`#noodleMenuInfo${i}`).val();
    let allerPop = $(`#noodleMenuAllergyInfo${i}`).val();
    let pricePop = $(`#noodleMenuPrice${i}`).val();
    menuIdData = $(`#noodleMenuIdData${i}`).val();

    $("#selectPage").css("display", "block");
    $(".selectMenuImageBox").css(
      "background-image",
      `url(./img/noodleMenu/${imgPop})`
    );
    $(".selectMenuName").html(`${titlePop}`);
    $(".selectMenuPrice").html(`${pricePop}`);
    $("#selectMenuDesc").html(`${descPop}`);
    $("#selectMenuInfo").html(`${infoPop}`);
    $("#selectMenuAllergy").html(`${allerPop}`);
  });
}
for (let i = 0; i < Number($("#singleMenuLength").val()); i++) {
  $(`#singleMenuList${i} > div`).on("click", (e) => {
    $("#modalOnBackground").css("display", "block");
    backgroundOnline = true;
    let imgPop = $(`#singleMenuUrl${i}`).val();
    let titlePop = $(`#singleMenuTitle${i}`).val();
    let descPop = $(`#singleMenuDesc${i}`).val();
    let infoPop = $(`#singleMenuInfo${i}`).val();
    let allerPop = $(`#singleMenuAllergyInfo${i}`).val();
    let pricePop = $(`#singleMenuPrice${i}`).val();
    menuIdData = $(`#singleMenuIdData${i}`).val();
    $("#selectPage").css("display", "block");
    $(".selectMenuImageBox").css(
      "background-image",
      `url(./img/singleMenu/${imgPop})`
    );
    $(".selectMenuName").html(`${titlePop}`);
    $(".selectMenuPrice").html(`${pricePop}`);
    $("#selectMenuDesc").html(`${descPop}`);
    $("#selectMenuInfo").html(`${infoPop}`);
    $("#selectMenuAllergy").html(`${allerPop}`);
  });
}
for (let i = 0; i < Number($("#sodaMenuLength").val()); i++) {
  $(`#sodaMenuList${i} > div`).on("click", (e) => {
    $("#modalOnBackground").css("display", "block");
    backgroundOnline = true;
    let imgPop = $(`#sodaMenuUrl${i}`).val();
    let titlePop = $(`#sodaMenuTitle${i}`).val();
    let descPop = $(`#sodaMenuDesc${i}`).val();
    let infoPop = $(`#sodaMenuInfo${i}`).val();
    let allerPop = $(`#sodaMenuAllergyInfo${i}`).val();
    let pricePop = $(`#sodaMenuPrice${i}`).val();
    menuIdData = $(`#sodaMenuIdData${i}`).val();

    $("#selectPage").css("display", "block");
    $(".selectMenuImageBox").css(
      "background-image",
      `url(./img/sodaMenu/${imgPop})`
    );
    $(".selectMenuName").html(`${titlePop}`);
    $(".selectMenuPrice").html(`${pricePop}`);
    $("#selectMenuDesc").html(`${descPop}`);
    $("#selectMenuInfo").html(`${infoPop}`);
    $("#selectMenuAllergy").html(`${allerPop}`);
  });
}
for (let i = 0; i < Number($("#alcoholMenuLength").val()); i++) {
  $(`#alcoholMenuList${i} > div`).on("click", (e) => {
    $("#modalOnBackground").css("display", "block");
    backgroundOnline = true;
    let imgPop = $(`#alcoholMenuUrl${i}`).val();
    let titlePop = $(`#alcoholMenuTitle${i}`).val();
    let descPop = $(`#alcoholMenuDesc${i}`).val();
    let infoPop = $(`#alcoholMenuInfo${i}`).val();
    let allerPop = $(`#alcoholMenuAllergyInfo${i}`).val();
    let pricePop = $(`#alcoholMenuPrice${i}`).val();
    menuIdData = $(`#alcoholMenuIdData${i}`).val();

    $("#selectPage").css("display", "block");
    $(".selectMenuImageBox").css(
      "background-image",
      `url(./img/alcoholMenu/${imgPop})`
    );
    $(".selectMenuName").html(`${titlePop}`);
    $(".selectMenuPrice").html(`${pricePop}`);
    $("#selectMenuDesc").html(`${descPop}`);
    $("#selectMenuInfo").html(`${infoPop}`);
    $("#selectMenuAllergy").html(`${allerPop}`);
  });
}

let tempStr = "";
let countMenu = 1;
$(".calculateMiddle").html("");
$("#acceptBt").on("click", () => {
  let foodTitle = $(".selectMenuName").html();
  let foodPrice = $(".selectMenuPrice").html();
  let foodFlag = false;
  $(".orderMenuName").each((i, v) => {
    if (v.innerHTML == foodTitle) {
      foodFlag = true;
    }
  });
  console.log(foodFlag);
  if (!foodFlag) {
    tempStr = `
  <ul id="menuCal${countMenu}">
    <li>
      <div class="orderMenuNum">${countMenu}</div>
      <div class="orderMenuName pointFont">${foodTitle}</div>
      <div class="orderMenuPlusOrMinus">
        <button class="mainMenuMinusBt hoverEffect" id="mainMenuMinusBt${countMenu}"> - </button>
        <div class="countValueBox" id="countValueBox${countMenu}" data-menuid="${menuIdData}">1</div>
        <button class="mainMenuPlusBt hoverEffect" id="mainMenuPlusBt${countMenu}"> + </button>
      </div>
      <div class="orderMenuPrice" id="orderMenuPrice${countMenu}" data-price="${removeComma(
      foodPrice
    )}">${regStr(foodPrice)}</div>
      <button id="orderDelete${countMenu}" class="orderMenuDelete hoverEffect" type="button" data-count="${countMenu}"> 취소 </button>
    </li>
  </ul>
  `;
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
  $(".orderMenuNum").each((i, v) => {
    v.innerHTML = i + 1;
  });
  $(".orderMenuPrice").each((i, v) => {
    v.setAttribute("id", `orderMenuPrice${i + 1}`);
  });
  $(".countValueBox").each((i, v) => {
    v.setAttribute("id", `countValueBox${i + 1}`);
  });
});

$(document).on("click", ".mainMenuPlusBt", (e) => {
  let insideVal = Number($(e.target).prev().html());
  let insidePrice = Number($(e.target).parent().next().attr("data-price"));
  console.log(insidePrice);
  insideVal += 1;
  $(e.target).prev().html(insideVal);
  $(e.target)
    .parent()
    .next()
    .html(regStr(insidePrice * insideVal));
});

$(document).on("click", ".mainMenuMinusBt", (e) => {
  let insideVal = Number($(e.target).next().html());
  let insidePrice = Number($(e.target).parent().next().attr("data-price"));
  console.log(insidePrice);
  insideVal -= 1;
  insideVal == 0 && (insideVal = 1);
  $(e.target).next().html(insideVal);
  $(e.target)
    .parent()
    .next()
    .html(regStr(insidePrice * insideVal));
});
$("#resetBt").on("click", () => {
  $(".calculateMiddle").html("");
  countMenu = 1;
});
let isItWork = false;
const tooMuchTimeYouUse = () => {
  setTimeout(() => {
    imAlive = 0;
    $(".mainModalText").text("30초 후에 종료됩니다.");
    $(".mainModalCloseBt").text("취소");
    let timer = 30;
    const timeDown = () => {
      setTimeout(() => {
        $(".mainModalCloseBt").text("취소");
        isItWork = true;
        if (imAlive === 0 && iPaidIt === 0) {
          $(".mainModal").css("display", "block");
          $("#modalOnBackground").css("display", "block");
          timer--;
          $(".mainModalText").text(`${timer}초 후에 종료됩니다.`);
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
$(".mainModalCloseBt").on("click", () => {
  $(".mainModalCloseBt").text() === "취소" &&
    (imAlive = 1) &&
    tooMuchTimeYouUse();
});
