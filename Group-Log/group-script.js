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

fetch("/crewPackage")
  .then((res) => res.json())
  .then((jsonData) => {
    console.log(jsonData); // Log the jsonData object to inspect its structure

    processCrewPackage(jsonData);
  })
  .catch((error) => {
    console.log(error); // Handle any errors that occur during the fetch request
  });

function processCrewPackage(crewPackage) {
  const summaryValueA = document.getElementById("summaryValueA");
  const summaryValueB = document.getElementById("summaryValueB");
  const summaryValueC = document.getElementById("summaryValueC");
  const summaryValueD = document.getElementById("summaryValueD");

  updateSummaryValue(summaryValueA, crewPackage.A?.summary);
  updateSummaryValue(summaryValueB, crewPackage.B?.summary);
  updateSummaryValue(summaryValueC, crewPackage.C?.summary);
  updateSummaryValue(summaryValueD, crewPackage.D?.summary);
}

function updateSummaryValue(element, value) {
  const summaryCircle = element.querySelector(".summary-circle");

  element.textContent = "Summary: " + (value || "");

  if (summaryCircle) {
    summaryCircle.textContent = value || "";

    if (value <= 20) {
      summaryCircle.style.backgroundColor = "red";
    } else if (value <= 40) {
      summaryCircle.style.backgroundColor = "orange";
    } else if (value <= 60) {
      summaryCircle.style.backgroundColor = "green";
    } else if (value <= 80) {
      summaryCircle.style.backgroundColor = "blue";
    } else {
      summaryCircle.style.backgroundColor = "purple";
    }
  }
}
