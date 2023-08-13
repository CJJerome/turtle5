document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("myForm");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    // Validate inputs
    const fullName = document.getElementById("full-name").value;
    const email = document.getElementById("email").value;
    const confirmEmail = document.getElementById("confirm-email").value;
    const phoneNumber = document.querySelector("input[name='phone']").value;

    if (fullName.trim() === "") {
      alert("Please enter a valid full name.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (email !== confirmEmail) {
      alert("Email addresses do not match.");
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      alert("Please enter a valid phone number.");
      return;
    }

    // Store inputs in local storage
    const formData = {
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber
    };

    localStorage.setItem("formData", JSON.stringify(formData));
    
    // Redirect to Payment.html
    window.location.href = "Payment.html";
  });

  function isValidEmail(email) {
    //  email validation 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPhoneNumber(phoneNumber) {
    //  phone number validation
    const phoneRegex = /^[+]?[\d\s\-]*$/;
    return phoneRegex.test(phoneNumber);
  }


// Retrieve the stored summary values from localStorage
const storedSummaryValues = JSON.parse(localStorage.getItem("summaryValues"));
const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));

// Update the summary table in the "Payment" page with the stored values
document.getElementById("date-placeholder").textContent = storedSummaryValues.date;
document.getElementById("time-placeholder").textContent = storedSummaryValues.time;
document.getElementById("duration-placeholder").textContent = storedSummaryValues.duration;
document.getElementById("tickets-placeholder").textContent = storedSummaryValues.tickets;
document.getElementById("adult-price-placeholder").textContent = "$" + storedSummaryValues.slAdultPrice;
document.getElementById("child-price-placeholder").textContent = "$" + storedSummaryValues.slChildPrice;
document.getElementById("foreigner-adult-price-placeholder").textContent = "$" + storedSummaryValues.foreignerAdultPrice;
document.getElementById("foreigner-child-price-placeholder").textContent = "$" + storedSummaryValues.foreignerChildPrice;
document.getElementById("total-payable-placeholder").textContent = "$" + storedSummaryValues.totalPayable;

if (storedUserDetails) {
    //   details in the summary table
    document.getElementById("name-placeholder").textContent = storedUserDetails.fullName;
    document.getElementById("mobile-placeholder").textContent = storedUserDetails.phoneNumber;
    document.getElementById("email-placeholder").textContent = storedUserDetails.email;
}
});