const paymentForm = document.getElementById("paymentForm");
const cardNumberInput = document.getElementById("cardNumber");
const expiryDateInput = document.getElementById("expiryDate");
const cvcInput = document.getElementById("cvc");
const nameOnCardInput = document.getElementById("nameOnCard");
const payButton = document.getElementById("payButton");

paymentForm.addEventListener("submit", function (event) {
  let isValid = true;

  if (!isCardNumberValid(cardNumberInput.value)) {
    showError(cardNumberInput, "Invalid card number.");
    isValid = false;
  }

  if (!isExpiryDateValid(expiryDateInput.value)) {
    showError(expiryDateInput, "Invalid expiry date.");
    isValid = false;
  }

  if (!isCVCValid(cvcInput.value)) {
    showError(cvcInput, "Invalid CVC/CVV.");
    isValid = false;
  }

  if (!isNameOnCardValid(nameOnCardInput.value)) {
    showError(nameOnCardInput, "Invalid name on card.");
    isValid = false;
  }

  if (!isValid) {
    event.preventDefault();
  }
  
});
payButton.addEventListener("click", function () {
    // Redirect to the Confirmation.html page
    window.location.href = "Confirmation.html";

  });

// Enable the "Pay to Proceed" button when all fields are valid
cardNumberInput.addEventListener("input", enablePayButton);
expiryDateInput.addEventListener("input", enablePayButton);
cvcInput.addEventListener("input", enablePayButton);
nameOnCardInput.addEventListener("input", enablePayButton);

function enablePayButton() {
  if (isCardNumberValid(cardNumberInput.value) && 
      isExpiryDateValid(expiryDateInput.value) && 
      isCVCValid(cvcInput.value) && 
      isNameOnCardValid(nameOnCardInput.value)) {
    payButton.removeAttribute("disabled");
  } else {
    payButton.setAttribute("disabled", "disabled");
  }
}

function isCardNumberValid(cardNumber) {
  //  card number validation logic
  return /^[0-9]{16}$/.test(cardNumber);
}

function isExpiryDateValid(expiryDate) {
  //  expiry date validation logic
  return /^[0-9]{2}\/[0-9]{2}$/.test(expiryDate); 
}

function isCVCValid(cvc) {
  //  CVC validation logic
  return /^[0-9]{3,4}$/.test(cvc); 
}

function isNameOnCardValid(name) {
  //  name  validation logic
  return /^[a-zA-Z\s]+$/.test(name); 
}

function showError(inputElement, errorMessage) {
  const errorElement = document.createElement("p");
  errorElement.className = "error-message";
  errorElement.textContent = errorMessage;

  const parentElement = inputElement.parentElement;
  parentElement.insertBefore(errorElement, inputElement.nextSibling);
}
// Retrieve summary values from localStorage
const storedSummaryValues = JSON.parse(localStorage.getItem("summaryValues"));
const formData = JSON.parse(localStorage.getItem("formData"));

if (formData && formData.fullName && formData.email && formData.phoneNumber) {
    // Set the values in the placeholders
    document.getElementById("name-placeholder").textContent = formData.fullName;
    document.getElementById("email-placeholder").textContent = formData.email;
    document.getElementById("mobile-placeholder").textContent = formData.phoneNumber;
  } else {
    console.log("Form data not available in local storage.");
  }

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

