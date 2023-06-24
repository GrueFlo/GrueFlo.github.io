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

  updateSummaryValue(summaryValueA, crewPackage.A?.summaryA);
  updateSummaryValue(summaryValueB, crewPackage.B?.summaryB);
  updateSummaryValue(summaryValueC, crewPackage.C?.summaryC);
  updateSummaryValue(summaryValueD, crewPackage.D?.summaryD);
}

function updateSummaryValue(element, summary) {
  const summaryCircle = element.querySelector(".summary-circle");

  element.textContent = "Summary: " + (summary || "");

  if (summaryCircle) {
    summaryCircle.textContent = summary || "";

    if (summary <= 20) {
      summaryCircle.style.backgroundColor = "red";
    } else if (summary <= 40) {
      summaryCircle.style.backgroundColor = "orange";
    } else if (summary <= 60) {
      summaryCircle.style.backgroundColor = "green";
    } else if (summary <= 80) {
      summaryCircle.style.backgroundColor = "blue";
    } else {
      summaryCircle.style.backgroundColor = "purple";
    }
  }
}
