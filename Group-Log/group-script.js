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
    event.target.classList.contains("backlog-column");
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

function fetchAndProcessCrewPackages() {
  fetch("/crewPackage")
    .then((res) => res.json())
    .then((jsonData) => {
      console.log(jsonData); // Log the jsonData object to inspect its structure
      processCrewPackages(jsonData);
    })
    .catch((error) => {
      console.log(error); // Handle any errors that occur during the fetch request
    });
}

function processCrewPackages(crewPackage) {
  const summaryCircleA = document.getElementById("summaryValueA");
  const summaryCircleB = document.getElementById("summaryValueB");
  const summaryCircleC = document.getElementById("summaryValueC");
  const summaryCircleD = document.getElementById("summaryValueD");

  updateSummaryCircle(summaryCircleA, crewPackage?.A);
  updateSummaryCircle(summaryCircleB, crewPackage?.B);
  updateSummaryCircle(summaryCircleC, crewPackage?.C);
  updateSummaryCircle(summaryCircleD, crewPackage?.D);
}

function updateSummaryCircle(element, summary) {
  element.textContent = "Summary: " + (summary?.summary || "");

  if (summary?.summary) {
    element.style.backgroundColor = getBackgroundColor(summary.summary);
  } else {
    element.style.backgroundColor = "";
  }
}

function getBackgroundColor(value) {
  if (value <= 20) {
    return "red";
  } else if (value >= 20 && value <= 40) {
    return "orange";
  } else if (value >= 40 && value <= 60) {
    return "green";
  } else if (value >= 60 && value <= 80) {
    return "orange";
  } else if (value >= 80) {
    return "red";
  }
}

// Initial fetch and process
fetchAndProcessCrewPackages();

// Set interval to fetch and process crew packages every 5 seconds
setInterval(fetchAndProcessCrewPackages, 2000); // Adjust the interval duration as needed
