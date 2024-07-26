//initlizing variables
let hexCodes = [];
let fontNames = [];
let emails = [];
let passwords = [];

//function when we click on btn Add_hex_Code
document
  .getElementById("hexInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addHexCode();
    }
  });

//function when we click on btn Add_font_Name
document
  .getElementById("fontInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addFontName();
    }
  });

//function when we click on btn Add_Hex_Code
function addHexCode() {
  const hexInput = document.getElementById("hexInput");
  const hexCode = hexInput.value;
  if (hexCode) {
    hexCodes.push(hexCode);
    displayHexCodes(); //calling another function
    hexInput.value = "";
    hexInput.focus();
  }
}

function addFontName() {
  const fontInput = document.getElementById("fontInput");
  const fontName = fontInput.value;
  if (fontName) {
    fontNames.push(fontName);
    displayFontNames();
    fontInput.value = "";
    fontInput.focus();
  }
}

function addEmail() {
  let emailinput = document.getElementById("emailinput");
  let email = emailinput.value;
  if (email) {
    emails.push(email);
    displayEmails();
    emailinput.value = "";
    emailinput.focus();
  }
}
function addPassword() {
  let pw_input = document.getElementById("password");
  let password = pw_input.value;
  if (password) {
    passwords.push(password);
    displayPassword();
    pw_input.value = "";
    pw_input.focus();
  }
}
//function for displaying the Code after btn Add_Hex_code clicked.
function displayHexCodes() {
  const hexContainer = document.getElementById("hexCodesContainer");
  hexContainer.innerHTML = "";
  hexCodes.forEach((code) => {
    const outerdiv = document.createElement("div");
    const colorBox = document.createElement("div");
    const colorcode = document.createElement("p");
    outerdiv.className = "flex-container";
    colorBox.className = "color-box";
    colorBox.style.backgroundColor = code;
    colorcode.innerText = code;
    outerdiv.appendChild(colorBox);
    outerdiv.appendChild(colorcode);
    hexContainer.appendChild(outerdiv);
  });
}

//function for displaying the Code after btn Add_Font_Name clicked.
function displayFontNames() {
  const fontContainer = document.getElementById("fontNamesContainer");
  fontContainer.innerHTML = "";
  fontNames.forEach((name) => {
    const fontNameDiv = document.createElement("div");
    fontNameDiv.className = "font-name";
    fontNameDiv.innerText = name;
    fontContainer.appendChild(fontNameDiv);
  });
}

function displayEmails() {
  const emailContainer = document.getElementById("emailcontainer");
  emailContainer.innerHTML = "";
  emails.forEach((email) => {
    const emailDiv = document.createElement("div");
    emailDiv.className = "email_info";
    emailDiv.innerText = email;
    emailContainer.appendChild(emailDiv);
  });
}

function displayPassword() {
  const pw_Container = document.getElementById("pw_container");
  pw_Container.innerHTML = "";
  passwords.forEach((password) => {
    const password_div = document.createElement("div");
    password_div.className = "password_info";
    password_div.innerText = password;
    pw_Container.appendChild(password_div);
  });
}

//Generate Pdf function
function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const img = new Image();
  img.src = "logo.png";

  img.onload = function () {
    doc.setFontSize(26);
    doc.addImage("logo.png", "PNG", 50, 15, 40, 15);
    const companyName = document.getElementById("companyNameInput").value;
    doc.setFontSize(26);
    doc.setFont("Arial", "bold");
    doc.text(20, 40, `Project Completion Details - ${companyName}`);

    //Hex codes displaying
    doc.setFontSize(16);
    doc.setFont("Arial", "bold");
    doc.text(25, 50, "Hex Colour Codes Used:");
    doc.setFont("Arial", "normal");
    hexCodes.forEach((code, index) => {
      doc.setFillColor(code);
      doc.rect(30, 59 + index * 12, 10, 10, "F");
      doc.text(45, 66 + index * 12, code);
    });

    //Font displaying
    doc.setFont("Arial", "bold");
    doc.text(25, 75 + hexCodes.length * 10, "Fonts Used:");
    doc.setFont("Arial", "normal");
    fontNames.forEach((name, index) => {
      doc.text(40, 85 + hexCodes.length * 10 + index * 10, name);
    });

    //mail.hostinger Link
    doc.setFont("Arial", "bold");
    doc.text(30, 110 + fontNames.length * 10, "Access your Email ");
    doc.setTextColor(0, 0, 255);
    doc.textWithLink("here", 76, 110 + fontNames.length * 10, {
      url: "https://mail.hostinger.com/",
    });
    doc.setDrawColor(0, 0, 255);
    doc.line(
      76,
      111 + fontNames.length * 10,
      76 + doc.getTextWidth("here"),
      111 + fontNames.length * 10
    );

    //Tablle code
    let value = fontNames.length * 10 + 120;
    const tableBody = emails.map((item, index) => [item, passwords[index]]);
    doc.autoTable({
      startY: value,
      head: [["EMAIL", "PASSWORD"]],
      body: tableBody,
      // tableWidth: 150,
    });

    //generating file Pdf
    let fileName = `Project Completion Details - ${companyName}.pdf`;
    doc.save(fileName);
  };
}
