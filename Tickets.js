document.addEventListener("DOMContentLoaded", function () {
  // Retrieve elements from the DOM
  const reservationDateInput = document.getElementById("reservation-date");
  const durationSelect = document.getElementById("duration");
  const adultsInput = document.getElementById("adults");
  const childrenInput = document.getElementById("children");
  const infantsInput = document.getElementById("infants");
  const foreignerAdultsInput = document.getElementById("foreigner-adults");
  const foreignerChildrenInput = document.getElementById("foreigner-children");
  const summaryTable = document.getElementById("summary-table");
  const continueButton = document.querySelector(".button");

      function calculateTotalDuration(selectedOptions) {
        if (selectedOptions.length === 0) {
            return 0;
        }

        // Get the start and end times from the first and last selected options
        const startTime = selectedOptions[0].value.split("-")[0];
        const endTime = selectedOptions[selectedOptions.length - 1].value.split("-")[1];

        const startHour = parseInt(startTime.split(":")[0]);
        const endHour = parseInt(endTime.split(":")[0]);

        return endHour - startHour;
    }


  // Update summary table based on selected options
  function updateSummary() {
      // Calculate total number of tickets
      const totalTickets = parseInt(adultsInput.value) + parseInt(childrenInput.value) +
          parseInt(infantsInput.value) + parseInt(foreignerAdultsInput.value) +
          parseInt(foreignerChildrenInput.value);

      // Calculate total price
      const slAdultPrice = 6 * parseInt(adultsInput.value);
      const slChildPrice = 3 * parseInt(childrenInput.value);
      const foreignerAdultPrice = (durationSelect.selectedOptions[0].getAttribute("data-peak") === null) ?
          10 * parseInt(foreignerAdultsInput.value) : 13 * parseInt(foreignerAdultsInput.value);
      const foreignerChildPrice = (durationSelect.selectedOptions[0].getAttribute("data-peak") === null) ?
          5 * parseInt(foreignerChildrenInput.value) : 8 * parseInt(foreignerChildrenInput.value);
      const totalPayable = slAdultPrice + slChildPrice + foreignerAdultPrice + foreignerChildPrice;
      const totalDuration = calculateTotalDuration(durationSelect.selectedOptions);
      summaryTable.querySelector("#duration-placeholder").textContent = totalDuration + " hours";

      // Update summary table
      summaryTable.querySelector("#date-placeholder").textContent = reservationDateInput.value;
      summaryTable.querySelector("#time-placeholder").textContent = durationSelect.selectedOptions[0].textContent;
      summaryTable.querySelector("#duration-placeholder").textContent = durationSelect.selectedOptions.length + " hours";
      summaryTable.querySelector("#tickets-placeholder").textContent = totalTickets;
      summaryTable.querySelector("#adult-price-placeholder").textContent = "$" + slAdultPrice.toFixed(2);
      summaryTable.querySelector("#child-price-placeholder").textContent = "$" + slChildPrice.toFixed(2);
      summaryTable.querySelector("#foreigner-adult-price-placeholder").textContent = "$" + foreignerAdultPrice.toFixed(2);
      summaryTable.querySelector("#foreigner-child-price-placeholder").textContent = "$" + foreignerChildPrice.toFixed(2);
      summaryTable.querySelector("#total-payable-placeholder").textContent = "$" + totalPayable.toFixed(2);

      // Store the summary values in localStorage
    const summaryValues = {
      date: reservationDateInput.value,
      time: durationSelect.selectedOptions[0].textContent,
      duration: totalDuration + " hours",
      tickets: totalTickets,
      slAdultPrice: slAdultPrice.toFixed(2),
      slChildPrice: slChildPrice.toFixed(2),
      foreignerAdultPrice: foreignerAdultPrice.toFixed(2),
      foreignerChildPrice: foreignerChildPrice.toFixed(2),
      totalPayable: totalPayable.toFixed(2)
  };

  localStorage.setItem("summaryValues", JSON.stringify(summaryValues));

  

      // Enable or disable "Continue with Purchase" button based on selected options
      continueButton.disabled = totalTickets === 0 || durationSelect.selectedOptions.length === 0;
  }

  // Event listeners for inputs
  reservationDateInput.addEventListener("change", updateSummary);
  durationSelect.addEventListener("change", updateSummary);
  adultsInput.addEventListener("input", updateSummary);
  childrenInput.addEventListener("input", updateSummary);
  infantsInput.addEventListener("input", updateSummary);
  foreignerAdultsInput.addEventListener("input", updateSummary);
  foreignerChildrenInput.addEventListener("input", updateSummary);
});

