//initlizing variables
let hexCodes = [];
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
  .getElementById("emailinput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addEmail();
    }
  });

//function when we click on btn Add_Hex_Code
function addHexCode() {
  const hexInput = document.getElementById("hexInput");
  const hexCode = hexInput.value;
  if (hexCode) {
    hexCodes.push(hexCode);
    displayHexCodes(); //calling another function
    hexInput.focus();
  }
}

function add_Email_Password() {
  let emailinput = document.getElementById("emailinput");
  let pw_input = document.getElementById("password");

  let email = emailinput.value;
  let password = pw_input.value;

  if (email && password) {
    emails.push(email);
    passwords.push(password);
    display_Email_Passwords();
    emailinput.focus();
  } else {
    alert("Please Add Email and Password both!");
  }
}

function displayHexCodes() {
  const hexContainer = document.getElementById("hexCodesContainer");
  hexContainer.innerHTML = "";
  hexCodes.forEach((code, index) => {
    const outerdiv = document.createElement("div");
    const colorBox = document.createElement("div");
    const innerdiv = document.createElement("div");
    const colorcode = document.createElement("p");

    outerdiv.className = "flex-container";
    colorBox.className = "color-box";
    innerdiv.className = "inner-div";
    //colorcode.style.color =
    colorBox.style.backgroundColor = code;
    colorcode.innerText = code;

    const cross = document.createElement("p");
    cross.innerText = "x";
    cross.className = "cross";
    cross.onclick = () => del_hex_code(index);

    innerdiv.appendChild(colorcode);
    innerdiv.appendChild(cross);
    outerdiv.appendChild(colorBox);
    outerdiv.appendChild(innerdiv);

    hexContainer.appendChild(outerdiv);
  });
}
function del_hex_code(index) {
  hexCodes.splice(index, 1);
  displayHexCodes();
}
function del_value(index) {
  emails.splice(index, 1);
  passwords.splice(index, 1);
  display_Email_Passwords();
}

function display_Email_Passwords() {
  const emailContainer = document.getElementById("emailcontainer");
  emailContainer.innerHTML = "";

  emails.forEach((email, index) => {
    const epContainer = document.createElement("div");
    epContainer.className = "ep_info";

    const emailDiv = document.createElement("div");
    emailDiv.className = "email_info";
    emailDiv.innerText = email;

    const passwordDiv = document.createElement("div");
    passwordDiv.className = "password_info";
    passwordDiv.innerText = passwords[index];

    const cross = document.createElement("p");
    cross.innerText = "x";
    cross.className = "cross";
    cross.onclick = () => del_value(index);

    epContainer.appendChild(emailDiv);
    epContainer.appendChild(passwordDiv);
    epContainer.appendChild(cross);

    emailContainer.appendChild(epContainer);
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
    doc.text(20, 40, `Website Delivery Report - ${companyName}`);

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

    //mail.hostinger Link
    doc.setFont("Arial", "bold");
    doc.text(25, 80 + hexCodes.length * 10, "Access your Emails ");
    doc.setTextColor(0, 0, 255);
    doc.textWithLink("here", 71, 80 + hexCodes.length * 10, {
      url: "https://mail.hostinger.com/",
    });
    doc.setDrawColor(0, 0, 255);
    doc.line(
      71,
      81 + hexCodes.length * 10,
      71 + doc.getTextWidth("here"),
      81 + hexCodes.length * 10
    );

    //Tablle code
    let value = hexCodes.length * 10 + 100;
    const tableBody = emails.map((item, index) => [item, passwords[index]]);
    doc.autoTable({
      startY: value,
      head: [["EMAIL", "PASSWORD"]],
      body: tableBody,
      // tableWidth: 150,
    });

    //generating file Pdf
    let fileName = `Website Delivery Report - ${companyName}.pdf`;
    doc.save(fileName);
  };
}
