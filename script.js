document.addEventListener("DOMContentLoaded", function () {
  const sliders = document.querySelectorAll(".slider");
  const summaryValue = document.getElementById("summaryValue");
  const summaryCircle = document.querySelector(".summary-circle");
  const summaryIcons = document.querySelector(".summary-icons");

  sliders.forEach(function (slider) {
    const sliderValue = slider.parentNode.querySelector(".slider-value");
    const sliderCircle = slider.parentNode.querySelector(".slider-circle");

    sliderValue.textContent = "Value: " + slider.value;
    sliderCircle.textContent = slider.value;

    slider.addEventListener("input", function () {
      sliderValue.textContent = "Value: " + slider.value;
      sliderCircle.textContent = slider.value;

      const value = slider.value;
      const min = parseInt(slider.min);
      const max = parseInt(slider.max);

      if (value <= 20) {
        sliderCircle.style.backgroundColor = "red";
      } else if (value >= 20 && value <= 40) {
        sliderCircle.style.backgroundColor = "orange";
      } else if (value >= 40 && value <= 60) {
        sliderCircle.style.backgroundColor = "green";
      } else if (value >= 60 && value <= 80) {
        sliderCircle.style.backgroundColor = "orange";
      } else if (value >= 80) {
        sliderCircle.style.backgroundColor = "red";
      }

      // Calculate the summary value
      const sliderValues = Array.from(sliders).map((slider) =>
        parseInt(slider.value)
      );
      const summary = Math.round(
        sliderValues.reduce((a, b) => a + b) / sliders.length
      );

// Update the summary value and circle
summaryValue.textContent = "Summary: " + summary;
summaryCircle.textContent = summary;

// Create JSON object
const summaryData = {
  summary: summary
};

// Convert JSON object to string
const jsonString = JSON.stringify(summaryData);

// Send JSON data to the new file or platform
// You can use methods like fetch(), AJAX, or WebSocket to send the data
// Example using fetch():
fetch('http://localhost:3000', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: jsonString
})
  .then(response => {
    // Handle the response if needed
  })
  .catch(error => {
    // Handle any errors that occurred during the request
  });


      // Change the color of the summary circle
      if (summary <= 20) {
        summaryCircle.style.backgroundColor = "red";
      } else if (summary >= 20 && summary <= 40) {
        summaryCircle.style.backgroundColor = "orange";
      } else if (summary >= 40 && summary <= 60) {
        summaryCircle.style.backgroundColor = "green";
      } else if (summary >= 60 && summary <= 80) {
        summaryCircle.style.backgroundColor = "orange";
      } else if (summary >= 80) {
        summaryCircle.style.backgroundColor = "red";
      }

      // Add icons to the summary circle based on tendencies
      let icons = "";

      // Well-being Slider Icons
      const wellBeingSlider = document.getElementById("slider1");
      const wellBeingValue = parseInt(wellBeingSlider.value);

      if (wellBeingValue <= 20) {
        icons += "💤"; // Bored emoji
      } else if (wellBeingValue >= 80) {
        icons += "⚡️"; // Lightning symbol
      } else {
        icons += ""; // No icon
      }

      // Work Slider Icons
      const workSlider = document.getElementById("slider2");
      const workValue = parseInt(workSlider.value);

      if (workValue <= 20) {
        icons += "😔"; // Bored emoji
      } else if (workValue >= 80) {
        icons += "💼"; // Work symbol
      } else {
        icons += ""; // No icon
      }

      // Socializing Slider Icons
      const socializingSlider = document.getElementById("slider3");
      const socializingValue = parseInt(socializingSlider.value);

      if (socializingValue <= 20) {
        icons += "❗️"; // Exclamation mark symbol
        icons += "👥"; // People symbol
      } else if (socializingValue >= 80) {
        icons += "❓"; // Question mark symbol
        icons += "👤"; // User symbol
      } else {
        icons += "👤"; // User symbol
      }

      summaryIcons.innerHTML = icons;
    });
  });
});
