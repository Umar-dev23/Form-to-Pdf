//initlizing variables
let hexCodes = [];
let emails = [];
let passwords = [];
let client_Name = "";
let client_email = "";
let pm_Name = "Sean";
let primaryColor = null;
let secondaryColor = null;
let companyName = "";
let WebsiteUrl = "";
let wp_LoginUrl = "";
let wp_Username = "";
let wp_password = "";

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

function storeinvariables() {
  companyName = document.getElementById("companyNameInput").value;
  client_Name = document.getElementById("clientName_input").value;
  client_email = document.getElementById("clientEmail_input").value;
  WebsiteUrl = document.getElementById("websiteUrl_input").value;
  wp_LoginUrl = document.getElementById("wp_login_input").value;
  wp_Username = document.getElementById("wp_Uname_input").value;
  wp_password = document.getElementById("wp_password_iput").value;
}

//function when we click on btn Add_Hex_Code
function addPrimaryHexCode() {
  const hexInput = document.getElementById("hexInput");
  const hexCode = hexInput.value;
  if (hexCode) {
    primaryColor = hexCode;
    displayHexCodes();
  }
}

function addSecondaryHexCode() {
  const hexInput = document.getElementById("hexInput");
  const hexCode = hexInput.value;
  if (hexCode) {
    secondaryColor = hexCode;
    displayHexCodes();
  }
}

function addNormalHexCode() {
  const hexInput = document.getElementById("hexInput");
  const hexCode = hexInput.value;
  if (hexCode) {
    hexCodes.push(hexCode);
    displayHexCodes();
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
    emailinput.value = "";
    pw_input.value = "";
  } else {
    alert("Please Add Email and Password both!");
  }
}

function del_hex_code(index) {
  if (index === -1) {
    primaryColor = "";
  } else if (index === -2) {
    secondaryColor = "";
  } else {
    hexCodes.splice(index, 1);
  }
  displayHexCodes();
}

function createDivforColor(code, index, label = "") {
  const hexContainer = document.getElementById("hexCodesContainer");

  const outerdiv = document.createElement("div");
  outerdiv.className = "flex-container";

  const colorBox = document.createElement("div");
  colorBox.className = "color-box";
  colorBox.style.backgroundColor = code;

  const innerdiv = document.createElement("div");
  innerdiv.className = "inner-div";

  const colorcode = document.createElement("p");
  colorcode.innerText = label ? `${label}: ${code}` : code;

  const cross = document.createElement("button");
  cross.innerText = "Delete";
  cross.className = "cross";
  cross.onclick = function () {
    del_hex_code(index);
  };

  innerdiv.appendChild(colorcode);
  innerdiv.appendChild(cross);
  outerdiv.appendChild(colorBox);
  outerdiv.appendChild(innerdiv);
  hexContainer.appendChild(outerdiv);
}

function displayHexCodes() {
  const hexContainer = document.getElementById("hexCodesContainer");
  hexContainer.innerHTML = "";

  if (primaryColor) {
    createDivforColor(primaryColor, -1, "Primary Color");
  }
  if (secondaryColor) {
    createDivforColor(secondaryColor, -2, "Secondary Color");
  }
  hexCodes.forEach((code, index) => {
    createDivforColor(code, index);
  });
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
  storeinvariables(); //call for store values in form to in variables..
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const date_time = new Date();
  const img = new Image();
  img.src = "logo.png";
  const img1 = new Image();
  img1.src = "font_place.png";
  

  setPageColor(doc, "#ee2d4c");
  showlogo(doc);
  doc.setTextColor("#ffffff");
  doc.setFontSize(76);
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
  doc.line(31, 121, 114, 121);

  doc.setFontSize(40);
  doc.text(30, 140, "Delivery Report");
  doc.text(30, 158, `For: ${companyName}`);
  doc.text(
    30,
    178,
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
  placeFooter(doc);

  //requesting for new page:02
  doc.addPage();
  doc.setTextColor("#000000");
  const pageWidth = doc.internal.pageSize.getWidth();
  const usableWidth = pageWidth - 2 * margin;
  showlogo(doc);
  doc.setFontSize(16);
  doc.setFont("Helvetica", "normal");

  doc.text(
    margin,
    50,
    `Date: ${date_time.getDate()}/${
      date_time.getMonth() + 1
    }/${date_time.getFullYear()}`
  );
  doc.text(margin, 70, `Dear ${client_Name}`);

  // Main content
  const mainContent = [
    "We are pleased to present you with the details of your newly developed website. It has been a pleasure working with you to bring your vision to life, and we are confident that this website will meet your expectations and serve your needs effectively.",
    "Please find below all the pertinent information regarding your website, including login details, fonts and colour codes.",
    "Should you have any questions or require further assistance, please do not hesitate to contact us. Thank you for entrusting us with your website project.",
  ];

  // Split each line to fit within the usable width
  let yOffset = 90;
  mainContent.forEach((text) => {
    const lines = doc.splitTextToSize(text, usableWidth);
    doc.text(lines, margin, yOffset);
    yOffset += lines.length * 10; // Adjust the vertical position for each paragraph
  });
  doc.text(margin, yOffset + 5, "Warm Regards");
  doc.setFont("Helvetica", "bold");
  doc.text(margin, yOffset + 15, `${pm_Name}`);
  doc.text(margin, yOffset + 25, "(Project Manager)");
  placeFooter(doc);

  //requesting for new page:03
  doc.addPage();
  showlogo(doc);
  doc.setFontSize(36);
  doc.setTextColor("#ee2d4c");
  doc.setFont("Helvetica", "bold");
  doc.text(55, 45, "Website Details");
  doc.setLineWidth(1);
  doc.setDrawColor("#ee2d4c");
  doc.line(55, 47, 55 + doc.getTextWidth("Website Details"), 47);

  doc.setFontSize(16);
  doc.setTextColor("#000000");
  doc.setFont("Helvetica", "bold");
  doc.text(margin + 10, 90, "Website URL: ");
  doc.setFont("Helvetica", "normal");
  doc.text(margin + 15 + doc.getTextWidth("Website URL: "), 90, WebsiteUrl);
  doc.setFont("Helvetica", "bold");
  doc.text(margin + 10, 100, "WordPress Login URL: ");
  doc.setFont("Helvetica", "normal");
  doc.text(
    margin + 15 + doc.getTextWidth("WordPress Login URL: "),
    100,
    wp_LoginUrl
  );
  doc.setFont("Helvetica", "bold");
  doc.text(margin + 10, 110, "WordPress User Name: ");
  doc.setFont("Helvetica", "normal");
  doc.text(
    margin + 15 + doc.getTextWidth("WordPress User Name: "),
    110,
    wp_Username
  );
  doc.setFont("Helvetica", "bold");
  doc.text(margin + 10, 120, "WordPress Password: ");
  doc.setFont("Helvetica", "normal");
  doc.text(
    margin + 15 + doc.getTextWidth("WordPress Password: "),
    120,
    wp_password
  );

  //mail.hostinger Link
  doc.setFont("Helvetica", "bold");
  doc.text(25, 145, "Access your Emails ");
  doc.setTextColor(0, 0, 255);
  doc.textWithLink("here", 79, 145, {
    url: "https://mail.hostinger.com/",
  });

  //creating the line under the here
  doc.setLineWidth(0);
  doc.setDrawColor(0, 0, 255);
  doc.line(79, 146, 79 + doc.getTextWidth("here"), 146);

  //Tablle code
  const tableBody = emails.map((item, index) => [item, passwords[index]]);
  doc.autoTable({
    startY: 150,
    head: [["EMAIL", "PASSWORD"]],
    body: tableBody,
    headStyles: {
      fillColor: "#ee2d4c", // Red for header background
      textColor: "#ffffff", // White text color for header
    },
  });
  placeFooter(doc);

  //requesting for new page:04

  doc.addPage();
  showlogo(doc);
  doc.setFontSize(36);
  doc.setTextColor("#ee2d4c");
  doc.setFont("Helvetica", "bold");
  doc.text(55, 40, "Color Details");
  doc.setLineWidth(1);
  doc.setDrawColor("#ee2d4c");
  doc.line(55, 42, 55 + doc.getTextWidth("Color Details"), 42);
  //Hex codes displaying

  doc.setFontSize(22);
  doc.setTextColor("#000000");
  doc.setFont("Helvetica", "bold");
  doc.text(25, 80, "Primary: ");
  doc.setFont("Helvetica", "normal");
  doc.text(25 + doc.getTextWidth("Primary:  "), 80, `${primaryColor}`);
  doc.setFillColor(primaryColor);
  doc.rect(140, 65, 25, 25, "F");

  doc.setFont("Helvetica", "bold");
  doc.text(25, 115, "Secondary: ");
  doc.setFont("Helvetica", "normal");
  doc.text(25 + doc.getTextWidth("Secondary:  "), 115, `${secondaryColor}`);
  doc.setFillColor(secondaryColor);
  doc.rect(140, 100, 25, 25, "F");
  doc.setFont("Helvetica", "bold");

  doc.text(25, 150, "Text: ");
  doc.setFont("Helvetica", "normal");
  let startY = 160;
  let spacing = 30;
  let currentIndex = 0; // To keep track of current index across pages
  let pageAdded = false;

  hexCodes.forEach((code, index) => {
    if (index <= 3) {
      let currentY = startY + index * spacing;
      doc.text(60, currentY, code);
      doc.setFillColor(code);
      doc.rect(140, currentY - 10, 25, 25, "F");
    } else if (index > 3 && !pageAdded) {
      doc.addPage();
      showlogo(doc);
      pageAdded = true;
      currentIndex = 0;
      let currentY = startY + currentIndex * spacing - 120;
      doc.text(60, currentY, code);
      doc.setFillColor(code);
      doc.rect(140, currentY - 10, 25, 25, "F");
    } else {
      if (currentIndex >= 8) {
        doc.addPage();
        showlogo(doc);
        currentIndex = 0;
      }
      let currentY = startY + currentIndex * spacing - 120;
      doc.text(60, currentY, code);
      doc.setFillColor(code);
      doc.rect(140, currentY - 10, 25, 25, "F");
    }
    currentIndex++;
  });
  placeFooter(doc);

  //requesting for new page:05
  doc.addPage();
  showlogo(doc);
  doc.setFontSize(36);
  doc.setTextColor("#ee2d4c");
  doc.setFont("Helvetica", "bold");
  doc.text(55, 40, "TypoGraphy");
  doc.setLineWidth(1);
  doc.setDrawColor("#ee2d4c");
  doc.line(55, 42, 55 + doc.getTextWidth("TypoGraphy"), 42);
  doc.addImage("font_place.png", "PNG", 20, 50, 170, 220);
  placeFooter(doc);

  //requesting for new page:06
  doc.addPage();
  showlogo(doc);
  doc.setFontSize(36);
  doc.setTextColor("#ee2d4c");
  doc.setFont("Helvetica", "bold");
  doc.text(55, 40, "Additional Details");
  doc.setLineWidth(1);
  doc.setDrawColor("#ee2d4c");
  doc.line(55, 42, 55 + doc.getTextWidth("Additional Details"), 42);

  doc.setFontSize(16);
  doc.setFont("Helvetica", "normal");
  doc.setTextColor("#000000");
  const additional_Content = [
    "Maintenance tasks are covered under the maintenance package, including updates, backups, and security monitoring.",
    "The website is mobile responsive and tested on major browsers and devices..",
  ];
  yOffset = 70;
  additional_Content.forEach((text) => {
    const lines = doc.splitTextToSize(text, usableWidth);
    doc.text(lines, margin, yOffset);
    yOffset += lines.length * 10; // Adjust the vertical position for each paragraph
  });
  placeFooter(doc);

  //requesting another page: 07: Thankyou
  doc.addPage();
  showlogo(doc);
  setPageColor(doc, "#ee2d4c");
  doc.setFontSize(116);
  doc.setTextColor("#ffffff");
  doc.setFont("Helvetica", "bold");
  doc.text(margin + 30, 140, "Thank");
  doc.text(margin + 45, 180, "You");
  placeFooter(doc);

  //generating file Pdf
  let fileName = `Website Delivery Report - ${companyName}.pdf`;
  doc.save(fileName);
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

function placeFooter(doc) {
  doc.setFontSize(12);
  doc.setTextColor("#000000");
  doc.setFont("Helvetica", "normal");
  doc.text(75, 290, "www.aethonint.digital");
}
