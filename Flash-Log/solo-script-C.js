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

      if (value <= 15) {
        sliderCircle.style.backgroundColor = "red";
      } else if (value >= 15 && value <= 35) {
        sliderCircle.style.backgroundColor = "orange";
      } else if (value >= 35 && value <= 65) {
        sliderCircle.style.backgroundColor = "green";
      } else if (value >= 65 && value <= 85) {
        sliderCircle.style.backgroundColor = "orange";
      } else if (value >= 85) {
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
      //  summaryValue.textContent = "Summary: " + summary;
      summaryCircle.textContent = "Summary: " + summary;

      // Change the color of the summary circle
      if (summary <= 15) {
        summaryCircle.style.backgroundColor = "red";
      } else if (summary >= 15 && summary <= 35) {
        summaryCircle.style.backgroundColor = "orange";
      } else if (summary >= 35 && summary <= 65) {
        summaryCircle.style.backgroundColor = "green";
      } else if (summary >= 65 && summary <= 85) {
        summaryCircle.style.backgroundColor = "orange";
      } else if (summary >= 15) {
        summaryCircle.style.backgroundColor = "red";
      }
      // Add icons to the summary circle based on tendencies
      let icons = "";

      // Work Slider Icons
      const workSlider = document.getElementById("slider2");
      const workValue = parseInt(workSlider.value);

      if (workValue <= 20) {
        icons += "easy💼  "; // Bored emoji
      } else if (workValue >= 80) {
        icons += "hard💼  "; // Work symbol
      }

      // Socializing Slider Icons
      const socializingSlider = document.getElementById("slider3");
      const socializingValue = parseInt(socializingSlider.value);

      if (socializingValue <= 20) {
        icons += "less👤  "; // Exclamation mark symbol
      } else if (socializingValue >= 80) {
        icons += "more👤  "; // Question mark symbol
      }

      summaryIcons.innerHTML = icons;

      // Create JSON object
      const flashLogC = {
        workload: workValue,
        socialcontact: socializingValue,
        mood: summary,
      };

      // Convert JSON object to string
      const jsonString = JSON.stringify(flashLogC);

      // Send JSON data to the new file or platform
      // You can use methods like fetch(), AJAX, or WebSocket to send the data
      // Example using fetch():
      fetch("/flashLogC", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonString,
      })
        .then((response) => {
          // Handle the response if needed
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
        });
    });
  });
});
