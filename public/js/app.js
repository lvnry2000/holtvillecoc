const contactForm = document.querySelector(".msg");
let fullName = document.getElementById("fullName");
let emailAddress = document.getElementById("emailAddress");
let subject = document.getElementById("subject");
let message = document.getElementById("message");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let formData = {
    fullName: fullName.value,
    emailAddress: emailAddress.value,
    subject: subject.value,
    message: message.value,
  };
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.onload = function () {
    console.log(xhr.responseText);
    if (xhr.responseText == "success") {
      alert("Email sent");
      fullName.value = "";
      emailAddress.value = "";
      subject.value = "";
      message.value = "";
    } else {
      alert("Something went wrong");
    }
  };
  xhr.send(JSON.stringify(formData));
});
