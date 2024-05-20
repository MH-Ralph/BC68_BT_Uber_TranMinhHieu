const UBER_CAR = "uberCar";
const UBER_SUV = "uberSUV";
const UBER_BLACK = "uberBlack";

const btn = document.querySelector(".contact100-form-btn");
const btnPrint = document.querySelector(".btn-print");
const overlay = document.querySelector(".overlay");
const table = document.querySelector(".box");

function caculated() {
  btn.onclick = () => {
    let PriceFirstKM;
    let Price1To19KM;
    let PriceMore19KM;
    let PriceTimeWaiting;
    let result;
    const vehicle = document.querySelector('input[type="radio"]:checked').value;
    const timeWaiting = document.querySelector("#txt-thoiGianCho").value * 1;
    const CountKm = document.querySelector("#txt-km").value * 1;

    PriceFirstKM = checkFirstKM(vehicle);
    Price1To19KM = checkPrice1To19KM(vehicle);
    PriceMore19KM = checkPriceMore19KM(vehicle);
    PriceTimeWaiting = checkPriceTimeWaiting(vehicle);

    if (CountKm <= 1) {
      result =
        CountKm * PriceFirstKM +
        Math.floor((timeWaiting / 3) * PriceTimeWaiting);
    } else if (CountKm > 1 && CountKm <= 19) {
      result =
        (CountKm - 1) * Price1To19KM +
        PriceFirstKM +
        Math.floor((timeWaiting / 3) * PriceTimeWaiting);
    } else if (CountKm > 19) {
      result =
        PriceFirstKM +
        18 * Price1To19KM +
        (CountKm - 19) * PriceMore19KM +
        Math.floor((timeWaiting / 3) * PriceTimeWaiting);
    }

    let resultFormat = result.toLocaleString("vi", {
      currency: "VND",
      style: "currency",
    });
    document.getElementById("divThanhTien").style.display = "block";
    document.getElementById("xuatTien").innerHTML = resultFormat;

    // In hóa đơn
    printInvoice(
      timeWaiting,
      CountKm,
      PriceFirstKM,
      Price1To19KM,
      PriceMore19KM,
      PriceTimeWaiting,
      resultFormat
    );
  };

  function printInvoice(
    timeWaiting,
    CountKm,
    PriceFirstKM,
    Price1To19KM,
    PriceMore19KM,
    PriceTimeWaiting,
    result
  ) {
    let kmFirst = 0;
    let kmFrom1To19 = 0;
    let kmAbove19 = 0;

    if (CountKm >= 1) {
      kmFirst = 1;
    } else {
      kmFirst = CountKm;
    }

    if (CountKm > 1 && CountKm <= 19) {
      kmFrom1To19 = CountKm - 1;
    } else if (CountKm > 19) {
      kmFrom1To19 = 18;
    }

    if (CountKm > 19) {
      kmAbove19 = CountKm - 19;
    }

    btnPrint.onclick = function (e) {
      overlay.classList.add("popup");

      // Ngăn sự kiện nổi bọt khi click vào table
      overlay.onclick = function (e) {
        overlay.classList.remove("popup");
      };
      table.onclick = function (e) {
        e.stopPropagation();
      };

      table.innerHTML = `
      <table class="table">
        <thead>
        <tr>
          <th class="text-center" scope="col" colspan="4">CHI TIẾT HÓA ĐƠN</th>
        </tr>
        <tr>
          <th scope="col">CHI TIẾT</th>
          <th scope="col">SỬ DỤNG</th>
          <th scope="col">ĐƠN GIÁ(1000đ)</th>
          <th scope="col">THÀNH TIỀN(1000đ)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">KM ĐẦU TIÊN</th>
          <td>${kmFirst}</td>
          <td>${PriceFirstKM}</td>
          <td>${kmFirst * PriceFirstKM}</td>
        </tr>

        <tr>
          <th scope="row">Từ 1 đến 19km</th>
          <td>${kmFrom1To19}</td>
          <td>${Price1To19KM}</td>
          <td>${kmFrom1To19 * Price1To19KM}</td>
        </tr>

        <tr>
          <th scope="row">Từ 19 trở lên</th>
          <td>${kmAbove19}</td>
          <td>${PriceMore19KM}</td>
          <td>${kmAbove19 * PriceMore19KM}</td>
        </tr>

        <tr>
          <th scope="row">Thời gian chờ</th>
          <td>${timeWaiting} phút</td>
          <td>${PriceTimeWaiting}</td>
          <td>${Math.floor((timeWaiting / 3) * PriceTimeWaiting)}</td>
        </tr>
      </tbody>
      
      <tfoot>
          <tr>
            <th class="text-lg-end" scope="row" colspan="3">TỔNG TIỀN</th>
            <td>${result}</td>
          </tr>
      </tfoot>
    </table>
    <button class="btn-print">Print</button>
        `;
    };
  }
}

caculated();

function checkFirstKM(vehicle) {
  switch (vehicle) {
    case UBER_CAR:
      return 8000;
    case UBER_SUV:
      return 9000;
    case UBER_BLACK:
      return 10000;
  }
}

function checkPrice1To19KM(vehicle) {
  switch (vehicle) {
    case UBER_CAR:
      return 7500;
    case UBER_SUV:
      return 8500;
    case UBER_BLACK:
      return 9500;
  }
}

function checkPriceMore19KM(vehicle) {
  switch (vehicle) {
    case UBER_CAR:
      return 7000;
    case UBER_SUV:
      return 8000;
    case UBER_BLACK:
      return 9000;
  }
}

function checkPriceTimeWaiting(vehicle) {
  switch (vehicle) {
    case UBER_CAR:
      return 2000;
    case UBER_SUV:
      return 3000;
    case UBER_BLACK:
      return 3500;
  }
}
