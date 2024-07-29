//initlizing variables
let hexCodes = [];
let emails = [];
let passwords = [];
let client_Name = "Client_Name";
let client_email = "Client_Email will be displayed";
let pm_Name = "To Be Sent{His/Her Name}";

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
    cross.innerText = "Delete";
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
  const emailContainer = document.getElementById("ep_container");
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
    cross.innerText = "Delete";
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
  const date_time = new Date();
  const img = new Image();
  img.src = "logo.png";

  setPageColor(doc, "#ee2d4c");
  img.onload = function () {
    showlogo(doc);

    doc.setTextColor("#ffffff");
    doc.setFontSize(76);
    const companyName = document.getElementById("companyNameInput").value;
    doc.setFont("Helvetica", "bold");
    // Set font properties
    const margin = 20;
    doc.setFontSize(76);
    doc.text(margin + 20, 65, "WEB");
    doc.text(margin + 20, 100, "SITE");
    // Draw a single border around both texts
    doc.setDrawColor("#ffffff"); // Border color
    doc.setLineWidth(3);
    doc.rect(30, 35, 85, 80);

    doc.setFontSize(36);
    doc.text(30, 130, `Delivery Report - ${companyName}`);

    doc.text(
      30,
      145,
      `${date_time.getDate()}/${
        date_time.getMonth() + 1
      }/${date_time.getFullYear()}`
    );

    doc.setFontSize(26);
    doc.setFont("Helvetica", "bold");
    doc.text(50, 220, "www.aethonint.digital");
    doc.setFontSize(14);
    doc.text(55, 250, `Client: ${client_Name}`);
    doc.text(55, 260, `Email: ${client_email}`);
    doc.setFontSize(12);
    doc.text(75, 290, "www.aethonint.digital");
    //requesting for new page:02
    doc.addPage();
    doc.setTextColor("#000000");
    const pageWidth = doc.internal.pageSize.getWidth();
    const usableWidth = pageWidth - 2 * margin;

    showlogo(doc);

    doc.setFontSize(16);
    doc.setFont("Helvetica", "normal");

    // Date
    doc.text(
      margin,
      50,
      `Date: ${date_time.getDate()}/${
        date_time.getMonth() + 1
      }/${date_time.getFullYear()}`
    );

    // Greeting
    doc.text(margin, 70, `Dear ${client_Name}!`);

    // Main content
    const mainContent = [
      "We are pleased to present you with the details of your newly developed website. It has been a pleasure working with you to bring your vision to life, and we are confident that this website will meet your expectations and serve your needs effectively.",
      "Please find below all the pertinent information regarding your website, including login details, fonts and colour codes.",
      "Should you have any questions or require further assistance, please do not hesitate to contact us. Thank you for entrusting us with your website project.",
    ];

    // Starting y-coordinate for the main content
    let yOffset = 90;

    // Split each line to fit within the usable width
    mainContent.forEach((text) => {
      const lines = doc.splitTextToSize(text, usableWidth);
      doc.text(lines, margin, yOffset);
      yOffset += lines.length * 10; // Adjust the vertical position for each paragraph
    });

    doc.text(margin, yOffset + 5, "Warm Regards");
    doc.setFont("Helvetica", "bold");
    doc.text(margin, yOffset + 15, `${pm_Name}`);
    doc.text(margin, yOffset + 25, "(Project Manager)");

    //requesting for new page:03
    doc.addPage();

    showlogo(doc);
    //Hex codes displaying
    doc.setFontSize(16);
    doc.setFont("Helvetica", "bold");
    doc.text(25, 60, "Hex Colour Codes Used:");
    doc.setFont("Helvetica", "normal");
    hexCodes.forEach((code, index) => {
      doc.setFillColor(code);
      doc.rect(30, 69 + index * 12, 10, 10, "F");
      doc.text(45, 76 + index * 12, code);
    });

    //mail.hostinger Link
    doc.setFont("Helvetica", "bold");
    doc.text(25, 90 + hexCodes.length * 10, "Access your Emails ");
    doc.setTextColor(0, 0, 255);
    doc.textWithLink("here", 79, 90 + hexCodes.length * 10, {
      url: "https://mail.hostinger.com/",
    });
    //creating the line under the here
    doc.setDrawColor(0, 0, 255);
    doc.line(
      79,
      91 + hexCodes.length * 10,
      79 + doc.getTextWidth("here"),
      91 + hexCodes.length * 10
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

    //requesting another page: 07: Thankyou
    doc.addPage();
    setPageColor(doc, "#ff5454");
    doc.setFontSize(116);
    doc.setTextColor("#ffffff");
    doc.setFont("Helvetica", "bold");
    doc.text(margin + 30, 140, "Thank");
    doc.text(margin + 45, 180, "You");

    //generating file Pdf
    let fileName = `Website Delivery Report - ${companyName}.pdf`;
    doc.save(fileName);
  };
}

//function for showing logo in pdf:
function showlogo(doc) {
  doc.addImage("logo.png", "PNG", 80, 10, 40, 15);
}

function setPageColor(doc, color) {
  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();
  const backgroundColor = color;
  doc.setFillColor(backgroundColor);
  doc.rect(0, 0, pageWidth, pageHeight, "F");
}
