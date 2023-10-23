// Data Table
$(document).ready(function () {
  $("#example").DataTable({
    columnDefs: [{ orderable: false, targets: 1 }],
    language: {
      paginate: {
        previous: " Prev",
        next: "Next ",
      },
      lengthMenu: "",
    },
  });
});

// Sidebar
const navbar = document.querySelector(".col-navbar");
const cover = document.querySelector(".screen-cover");

const sidebar_items = document.querySelectorAll(".sidebar-item");

function toggleNavbar() {
  navbar.classList.toggle("d-none");
  cover.classList.toggle("d-none");
}

function toggleActive(e) {
  sidebar_items.forEach(function (v, k) {
    v.classList.remove("active");
  });
  e.closest(".sidebar-item").classList.add("active");
}

// Copylink
function copyLink() {
  var linkInput = document.getElementById("linkInput");
  linkInput.select();
  document.execCommand("copy");
}

// Deposits
function convertToTether() {
  const usdtAmount = parseFloat(document.getElementById("usdtAmount").value);
  const depositNetwork = document.getElementById("depositNetwork").value;

  let tetherAmount = 0;

  if (depositNetwork === "USDT-TRC20") {
    tetherAmount = usdtAmount * 1.0;
  } else if (depositNetwork === "USDT-ERC20") {
    tetherAmount = usdtAmount * 1.1;
  } else if (depositNetwork === "LTC-Litecoin") {
    tetherAmount = usdtAmount * 1.2;
  }

  document.getElementById(
    "conversionResult"
  ).textContent = `Convert ${usdtAmount} USDT to ${tetherAmount.toFixed(
    2
  )} ( ${depositNetwork} )`;
}

function showQRCode() {
  const depositNetwork = document.getElementById("depositNetwork").value;
  const qrCodeDiv = document.getElementById("qrcode");

  if (depositNetwork) {
    qrCodeDiv.style.display = "block";

    qrCodeDiv.innerHTML = "";

    const qrcode = new QRCode(qrCodeDiv, {
      text: depositNetwork,
      width: 128,
      height: 128,
    });

    convertToTether();
  } else {
    qrCodeDiv.style.display = "none";
    document.getElementById("conversionResult").textContent = "";
  }
}
