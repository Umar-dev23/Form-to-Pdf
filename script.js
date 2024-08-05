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
let h1_font = "";
let h2_font = "";
let h3_font = "";
let h456_font = "";
let body_font = "";

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

//function that take input value from Form and store it in upper decalred variables.
function storeinvariables() {
  companyName = document.getElementById("companyNameInput").value;
  client_Name = document.getElementById("clientName_input").value;
  client_email = document.getElementById("clientEmail_input").value;
  WebsiteUrl = document.getElementById("websiteUrl_input").value;
  wp_LoginUrl = document.getElementById("wp_login_input").value;
  wp_Username = document.getElementById("wp_Uname_input").value;
  wp_password = document.getElementById("wp_password_iput").value;
}

//function when we click on btn Add_Primary_Code
function addPrimaryHexCode() {
  const hexInput = document.getElementById("hexInput");
  const hexCode = hexInput.value;
  if (hexCode) {
    primaryColor = "#" + hexCode;
    displayHexCodes();
  }
}

//function when we click on btn Add_secondary_Code
function addSecondaryHexCode() {
  const hexInput = document.getElementById("hexInput");
  const hexCode = hexInput.value;
  if (hexCode) {
    secondaryColor = "#" + hexCode;
    displayHexCodes();
  }
}

//function when we click on btn Add_Text_Hex_Code
function addNormalHexCode() {
  const hexInput = document.getElementById("hexInput");
  const hexCode = hexInput.value;
  if (hexCode) {
    hexCodes.push("#" + hexCode);
    displayHexCodes();
    hexInput.focus();
  }
}

//functin for h1_font adding behind on click of Add H1 Font
function add_h1_font() {
  h1_font = document.getElementById("fontInput").value;
  displayFonts();
  webfont();
}
function add_h2_font() {
  h2_font = document.getElementById("fontInput").value;
  displayFonts();
  webfont();
}
function add_h3_font() {
  h3_font = document.getElementById("fontInput").value;
  displayFonts();
  webfont();
}
function add_h456_font() {
  h456_font = document.getElementById("fontInput").value;
  displayFonts();
  webfont();
}
function add_body_font() {
  body_font = document.getElementById("fontInput").value;
  displayFonts();
  webfont();
}

//function for Email Password of Uper saving. storin them in an arrays. of Emails, and Passwords.
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

//function behind the Delete button of hex codes
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

//function behind the Delete button of fonts added behind.
function del_font(number) {
  if (number === 1) {
    h1_font = "";
  } else if (number === 2) {
    h2_font = "";
  } else if (number === 3) {
    h3_font = "";
  } else if (number === 4) {
    h456_font = "";
  } else if (number === 5) {
    body_font = "";
  } else {
    console.log("Error in del_font function....");
  }
  displayFonts();
}

//function for creating a div for color display.
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

//function that call create div function to create and display user added hex codes.
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

//create div for font showing function is doing...
function createDivForFont(font, index, headtext) {
  const fontContainer = document.getElementById("fontConatiner");

  const outerdiv = document.createElement("div");
  outerdiv.className = "flex-container";
  outerdiv.style.display = "block";

  const innerdiv = document.createElement("div");
  innerdiv.className = "inner-div-font";

  const heading = document.createElement("h4");
  heading.style.marginRight = "6px";
  heading.innerText = `${headtext}:`;

  const pforfont = document.createElement("h4");
  pforfont.innerText = font;

  const cross = document.createElement("button");
  cross.innerText = "Delete";
  cross.className = "cross";
  cross.classList.add("cross_flat");
  cross.onclick = function () {
    del_font(index);
  };

  innerdiv.appendChild(heading);
  innerdiv.appendChild(pforfont);
  outerdiv.appendChild(innerdiv);
  outerdiv.appendChild(cross);
  fontContainer.appendChild(outerdiv);
}

//function for displaying Fonts on The screen
function displayFonts() {
  const fontContainer = document.getElementById("fontConatiner");
  fontContainer.innerHTML = "";
  if (h1_font) {
    createDivForFont(h1_font, 1, "H1");
  }
  if (h2_font) {
    createDivForFont(h2_font, 2, "H2");
  }
  if (h3_font) {
    createDivForFont(h3_font, 3, "H3");
  }
  if (h456_font) {
    createDivForFont(h456_font, 4, "H4, H5, H6");
  }
  if (body_font) {
    createDivForFont(body_font, 5, "Body");
  }
}

//separate function for deleting any email or password from emails, passwords arrays.
function del_value(index) {
  emails.splice(index, 1);
  passwords.splice(index, 1);
  display_Email_Passwords();
}

//function for displaying Emails Passwords taking values from arrays.
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
function webfont() {
  WebFont.load({
    google: {
      families: [h1_font, h2_font, h3_font, h456_font, body_font],
    },
    active: function () {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (h1_font) {
        ctx.font = `bold 100px ${h1_font}`;
        ctx.fillText(`H1     ${h1_font}`, 30, 140);
      }
      if (h2_font) {
        ctx.font = `bold 85px ${h2_font}`;
        ctx.fillText(`H2     ${h2_font}`, 30, 290);
      }
      if (h3_font) {
        ctx.font = `bold 75px ${h3_font}`;
        ctx.fillText(`H3     ${h3_font}`, 30, 430);
      }
      if (h456_font) {
        ctx.font = `65px ${h456_font}`;
        ctx.fillText(`H4, H5, H6    ${h456_font}`, 30, 570);
      }
      if (body_font) {
        ctx.font = `50px ${body_font}`;
        ctx.fillText(`Body Font:   ${body_font}`, 30, 690);
      }
    },
  });
}

//Generate Pdf function
function generatePDF() {
  storeinvariables(); //call for store values in form to in variables defined at the start of the code..
  const { jsPDF } = window.jspdf; //import pdf.js
  const doc = new jsPDF(); //making object of jsPDF.
  const date_time = new Date(); //calling for getting current date and time.
  const img = new Image();
  img.src = "./images/Aethon_logo1.png"; //logo

  //importing font-style
  doc.addFont("/fonts/Montserrat-Regular.ttf", "Montserrat", "normal");
  doc.addFont("/fonts/Montserrat-Bold.ttf", "Montserrat", "bold");
  doc.setFont("Montserrat");
  doc.setFontSize(28);

  // Continue with your PDF generation after the font is added
  setPageColor(doc, "#ee2d4c");
  showlogo(doc);
  doc.setTextColor("#ffffff");
  doc.setFontSize(76);
  doc.setFont("Montserrat", "bold");
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
  doc.setFont("Montserrat", "bold");
  doc.text(50, 220, "www.aethonint.digital");
  doc.setFontSize(14);
  doc.text(55, 250, `Client: ${client_Name}`);
  doc.text(55, 260, `Email: ${client_email}`);
  placeFooter(doc);
  //--------------------------------------------End of Page: 01------------------------------------------------------
  //requesting for new page:02
  doc.addPage();
  doc.setTextColor("#000000");
  const pageWidth = doc.internal.pageSize.getWidth();
  const usableWidth = pageWidth - 2 * margin;
  showlogo(doc);
  doc.setFontSize(16);
  doc.setFont("Montserrat", "normal");
  //date showing
  doc.text(
    margin,
    50,
    `Date: ${date_time.getDate()}/${
      date_time.getMonth() + 1
    }/${date_time.getFullYear()}`
  );
  doc.text(margin, 70, `Dear ${client_Name}`);

  // Main content of letter showing
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
  doc.text(margin, yOffset + 10, "Warm Regards");
  doc.setFont("Montserrat", "bold");
  doc.text(margin, yOffset + 20, `${pm_Name}`);
  doc.text(margin, yOffset + 30, "(Project Manager)");
  placeFooter(doc);
  //--------------------------------------------End of Page: 02------------------------------------------------------

  //-------------------------------------------Start of Page: 03------------------------------------------------------

  //requesting for new page:03
  doc.addPage();
  showlogo(doc);
  doc.setFontSize(36);
  doc.setTextColor("#ee2d4c");
  doc.setFont("Montserrat", "bold");
  doc.text(48, 45, "Website Details");
  doc.setLineWidth(1);
  doc.setDrawColor("#ee2d4c");
  doc.line(48, 47, 48 + doc.getTextWidth("Website Details"), 47);

  //website details showing as .. Website link, Url, login username password,.....
  doc.setFontSize(16);
  doc.setTextColor("#000000");
  doc.setFont("Montserrat", "bold");
  doc.text(margin + 10, 90, "Website URL: ");
  doc.setFont("Montserrat", "normal");
  doc.text(margin + 15 + doc.getTextWidth("Website URL: "), 90, WebsiteUrl);
  doc.setFont("Montserrat", "bold");
  doc.text(margin + 10, 100, "Admin Login URL: ");
  doc.setFont("Montserrat", "normal");
  doc.text(
    margin + 15 + doc.getTextWidth("Admin Login URL: "),
    100,
    wp_LoginUrl
  );
  doc.setFont("Montserrat", "bold");
  doc.text(margin + 10, 110, "Admin User Name: ");
  doc.setFont("Montserrat", "normal");
  doc.text(
    margin + 15 + doc.getTextWidth("Admin User Name: "),
    110,
    wp_Username
  );
  doc.setFont("Montserrat", "bold");
  doc.text(margin + 10, 120, "Admin Password: ");
  doc.setFont("Montserrat", "normal");
  doc.text(
    margin + 15 + doc.getTextWidth("Admin Password: "),
    120,
    wp_password
  );

  //mail.hostinger Link showing
  doc.setFont("Montserrat", "bold");
  doc.text(25, 145, "Access your Emails ");
  doc.setTextColor(0, 0, 255);
  doc.textWithLink("here", 83, 145, {
    url: "https://mail.hostinger.com/",
  });

  //creating the line under the here
  doc.setLineWidth(0);
  doc.setDrawColor(0, 0, 255);
  doc.line(83, 146, 83 + doc.getTextWidth("here"), 146);

  //Tablle code for email and password showing in the from taking value arrays of emails, passwords
  const tableBody = emails.map((item, index) => [item, passwords[index]]);
  doc.autoTable({
    startY: 150,
    head: [["EMAIL", "PASSWORD"]],
    body: tableBody,
    styles: {
      font: "Montserrat", // Apply Montserrat to table text
    },
    headStyles: {
      fillColor: "#ee2d4c", // Red for header background
      textColor: "#ffffff", // White text color for header
    },
  });
  placeFooter(doc);
  //---------------------------------------------End of Page: 03------------------------------------------------------

  //-------------------------------------------Start of Page: 04------------------------------------------------------\
  //requesting for new page:04

  doc.addPage();
  showlogo(doc);
  doc.setFontSize(36);
  doc.setTextColor("#ee2d4c");
  doc.setFont("Montserrat", "bold");
  doc.text(60, 46, "Color Details");
  doc.setLineWidth(1);
  doc.setDrawColor("#ee2d4c");
  doc.line(60, 48, 60 + doc.getTextWidth("Color Details"), 48);

  //Hex codes displaying
  doc.setFontSize(22);
  doc.setTextColor("#000000");
  doc.setFont("Montserrat", "bold");
  doc.text(25, 80, "Primary: ");
  doc.setFont("Montserrat", "normal");
  doc.text(25 + doc.getTextWidth("Primary:  "), 80, `${primaryColor}`);
  doc.setFillColor(primaryColor);
  doc.rect(140, 65, 25, 25, "F");
  placeborder(doc, 0, 140, 65, 25, 25);

  doc.setFont("Montserrat", "bold");
  doc.text(25, 115, "Secondary: ");
  doc.setFont("Montserrat", "normal");
  doc.text(25 + doc.getTextWidth("Secondary:  "), 115, `${secondaryColor}`);
  doc.setFillColor(secondaryColor);
  doc.rect(140, 100, 25, 25, "F");
  doc.setFont("Montserrat", "bold");
  placeborder(doc, 0, 140, 100, 25, 25);

  doc.text(25, 150, "Other Colors Used: ");
  doc.setFont("Montserrat", "normal");
  let startY = 160;
  let spacing = 30;
  let currentIndex = 0; // To keep track of current index across pages
  let pageAdded = false;

  //code for showing text based colors taking value from array.. hex_normal_codes
  hexCodes.forEach((code, index) => {
    if (index <= 3) {
      let currentY = startY + index * spacing + 10;
      doc.text(60, currentY + 4, code);
      doc.setFillColor(code);
      doc.rect(140, currentY - 10, 25, 25, "F");
      placeborder(doc, 0, 140, currentY - 10, 25, 25);
    }
    //remember one thing that too many if-else is placed error is why?
    //Answer: Because, atleast if the length of color storing array become big from 4 it should create new page. automatically, and display the remaing on next page..
    else if (index > 3 && !pageAdded) {
      doc.addPage();
      showlogo(doc);
      pageAdded = true;
      currentIndex = 0;
      let currentY = startY + currentIndex * spacing - 120;
      doc.text(60, currentY, code);
      doc.setFillColor(code);
      doc.rect(140, currentY - 10, 25, 25, "F");
      placeborder(doc, 0, 140, currentY - 10, 25, 25);
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
      placeborder(doc, 0, 140, currentY - 10, 25, 25);
    }
    currentIndex++;
  });
  placeFooter(doc);
  //--------------------------------------------End of Page: 04------------------------------------------------------

  //-------------------------------------------Start of Page: 05------------------------------------------------------
  //requesting for new page:05
  doc.addPage();
  showlogo(doc);
  doc.setFontSize(36);
  doc.setTextColor("#ee2d4c");
  doc.setFont("Montserrat", "bold");
  doc.text(63, 46, "Typography");
  doc.setLineWidth(1);
  doc.setDrawColor("#ee2d4c");
  doc.line(63, 49, 63 + doc.getTextWidth("Typography"), 49);

  const canvas = document.getElementById("canvas");
  const imgData = canvas.toDataURL("image/png", 0.3);
  doc.addImage(imgData, "PNG", 15, 48);
  placeFooter(doc);

  //--------------------------------------------End of Page: 05------------------------------------------------------

  //-----------------------------------------Start of Page: 06------------------------------------------------------
  //requesting for new page:06
  doc.addPage();
  showlogo(doc);
  doc.setFontSize(36);
  doc.setTextColor("#ee2d4c");
  doc.setFont("Montserrat", "bold");
  doc.text(42, 46, "Additional Details");
  doc.setLineWidth(1);
  doc.setDrawColor("#ee2d4c");
  doc.line(42, 48, 42 + doc.getTextWidth("Additional Details"), 48);

  //content in the additional page is fixed and constant.....
  doc.setFontSize(16);
  doc.setFont("Montserrat", "normal");
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
  //--------------------------------------------End of Page: 06------------------------------------------------------

  //-------------------------------------------Start of Page: 07------------------------------------------------------
  //requesting another page: 07: Thankyou
  doc.addPage();
  showlogo(doc);
  setPageColor(doc, "#ee2d4c");
  doc.setFontSize(116);
  doc.setTextColor("#ffffff");
  doc.setFont("Montserrat", "bold");
  doc.text(margin + 15, 140, "Thank");
  doc.text(margin + 35, 180, "You");
  placeFooter(doc);
  //--------------------------------------------End of Page: 07------------------------------------------------------

  //generating file Pdf
  let fileName = `Website Delivery Report - ${companyName}.pdf`;
  doc.save(fileName);
}

//function for showing logo in pdf:
function showlogo(doc) {
  doc.addImage("./images/Aethon_logo1.png", "PNG", 87, 0, 40, 38);
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
  doc.setFont("Montserrat", "normal");
  doc.text(80, 290, "www.aethonint.digital");
}

//for creating borders around... colors code displaying..... to prevent from if white color comes shows in border....
function placeborder(doc, line_width, left, top, width, height) {
  doc.setDrawColor("#000000"); // Border color
  doc.setLineWidth(line_width);
  doc.rect(left, top, width, height);
}
