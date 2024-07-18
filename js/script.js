var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteURL");
var submitBtn = document.getElementById("subButton");
var deleteBtn = document.querySelectorAll(".delete");
var visitBtn = document.querySelectorAll(".visit");
var warning = document.querySelector(".warning");
var nameReg = /^[A-Z][a-z]{1,}(\s[A-Z][a-z]{1,})*$/;
var urlReg =
  /^(https?:\/\/)?(([\da-zA-Z-]+\.)*[\da-zA-Z-]+\.[a-zA-Z]{2,})(:\d{2,5})?(\/[\w.-]*)*(\?[\w=&%.-]*)?(#[\w=-]*)?$/;
var bookMarks = [];

if (localStorage.getItem("bookmark") !== null) {
  bookMarks = JSON.parse(localStorage.getItem("bookmark"));
  displayBookmark();
} else {
  bookMarks = [];
}

function addBookmark() {
  if (
    siteName.classList.contains("is-valid") &&
    siteUrl.classList.contains("is-valid")
  ) {
    var bookmark = {
      sName: siteName.value,
      sUrl: siteUrl.value,
    };
    bookMarks.push(bookmark);
    localStorage.setItem("bookmark", JSON.stringify(bookMarks));
    displayBookmark(bookMarks.length - 1);
    reset();
    siteName.classList.remove("is-valid");
    siteUrl.classList.remove("is-valid");
  } else {
    warning.classList.replace("d-none", "d-flex");
  }
}

function displayBookmark() {
  var mark = ``;
  for (var i = 0; i < bookMarks.length; i++) {
    mark += `<tr>
            <td>${i + 1}</td>
            <td>${bookMarks[i].sName}</td>
            <td><button class="btn btn-primary visit"
            onclick="visitWebsite(${i})"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
            <td><button class="btn btn-primary delete"
            onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
            </tr>`;
  }
  document.getElementById("tableItems").innerHTML = mark;
}

function visitWebsite(index) {
  var webReg = /^https?:\/\//;
  if (webReg.test(bookMarks[index].sUrl)) {
    window.open(bookMarks[index].sUrl, "_blank");
  } else {
    window.open(`https://${bookMarks[index].sUrl}`, "_blank");
  }
}

function deleteBookmark(index) {
  bookMarks.splice(index, 1);
  displayBookmark();
  localStorage.setItem("bookmark", JSON.stringify(bookMarks));
}

function reset() {
  siteName.value = "";
  siteUrl.value = "";
}

function validBookmark(item, regex) {
  if (regex.test(item.value)) {
    item.classList.add("is-valid");
    item.classList.remove("is-invalid");
  } else {
    item.classList.add("is-invalid");
    item.classList.remove("is-valid");
  }
}

siteName.addEventListener("input", function () {
  validBookmark(siteName, nameReg);
});

siteUrl.addEventListener("input", function () {
  validBookmark(siteUrl, urlReg);
});

function closeWarning() {
  warning.classList.replace("d-flex", "d-none");
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeWarning();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addBookmark();
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("warning")) {
    closeWarning();
  }
});
