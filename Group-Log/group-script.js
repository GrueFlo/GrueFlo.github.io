function allowDrop(event) {
  event.preventDefault();
  event.target.classList.add("highlight");
}

function drag(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

function drop(event) {
  event.preventDefault();
  event.target.classList.remove("highlight");

  const data = event.dataTransfer.getData("text/plain");
  const draggableElement = document.getElementById(data);

  // Check if the drop is allowed in the specified slots
  const timestamp =
    event.target.parentNode.querySelector(".timestamp").textContent;
  const isDropAllowed =
    timestamp === "9:00 - 12:00" ||
    timestamp === "14:00 - 17:00" ||
    "backlog-column";
  const isTargetColumn =
    event.target.classList.contains("droppable-column") ||
    event.target.classList.contains("backlog-column");

  if (isDropAllowed && isTargetColumn) {
    event.target.appendChild(draggableElement);
    draggableElement.setAttribute("draggable", "true");
    draggableElement.classList.remove("dropped-box");
    draggableElement.classList.add("backlog-box");
    draggableElement.style.backgroundColor = "";
  }
}

fetch("/summary")
  .then((res) => res.json())
  .then((jsonData) => {
    console.log(jsonData); // Log the jsonData object to inspect its structure

    const summaryValue = document.getElementById("summaryValue");
    const summaryCircle = document.querySelector(".summary-circle");

    summaryValue.textContent = "Summary: " + jsonData.A.summary;
    summaryCircle.textContent = jsonData.A.summary;

    // Change the color of the summary circle
    if (jsonData.A.summary <= 20) {
      summaryCircle.style.backgroundColor = "red";
    } else if (jsonData.A.summary >= 20 && jsonData.A.summary <= 40) {
      summaryCircle.style.backgroundColor = "orange";
    } else if (jsonData.A.summary >= 40 && jsonData.A.summary <= 60) {
      summaryCircle.style.backgroundColor = "green";
    } else if (jsonData.A.summary >= 60 && jsonData.A.summary <= 80) {
      summaryCircle.style.backgroundColor = "orange";
    } else if (jsonData.A.summary >= 80) {
      summaryCircle.style.backgroundColor = "red";
    }
  })
  .catch((error) => {
    console.log(error); // Handle any errors that occur during the fetch request
  });
