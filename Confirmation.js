
// Retrieve the stored summary values from localStorage
const storedSummaryValues = JSON.parse(localStorage.getItem("summaryValues"));
const formData = JSON.parse(localStorage.getItem("formData"));

if (formData && formData.fullName && formData.email && formData.phoneNumber) {
    // Set the values in the placeholders
    document.getElementById("name-placeholder").textContent = formData.fullName;
    document.getElementById("email-placeholder").textContent = formData.email;
    document.getElementById("mobile-placeholder").textContent = formData.phoneNumber;
  } else {
    // Handle the case when data is not available
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

