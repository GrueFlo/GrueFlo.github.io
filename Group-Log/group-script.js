function Box(name, description, workload, socialcontact) {
  this.name = name;
  this.description = description;
  this.workload = workload;
  this.socialcontact = socialcontact;
}

// Initialize the boxArray with some initial box objects
const boxArray = [
  new Box("8:25-11:25 - Electromagnetic Levitator R&R", "👤👤👤  💼💼", 80, 90),
  new Box("8:25-11:25 - Electromagnetic Levitator R&R", "👤👤👤  💼💼", 80, 90),
  new Box(
    "8:25-11:20 - MARES Research Preperation & Exercise",
    "👤👤 💼💼",
    50,
    50
  ),
  new Box("8:25-11:00 - GRIP Preperation & Experiment", "👤 💼", 15, 15),
];

// Set the draggable boxes using the boxArray
function setDraggableBoxes() {
  const backlogColumn = document.querySelector(".backlog-column");
  backlogColumn.innerHTML = ""; // Clear the column before adding boxes

  boxArray.forEach((box, index) => {
    const draggableElement = document.createElement("div");
    draggableElement.classList.add("backlog-box", `backlog-box${index + 1}`);
    draggableElement.setAttribute("draggable", "true");
    draggableElement.setAttribute("ondragstart", "drag(event)");
    draggableElement.setAttribute("id", `backlog${index + 1}`); // Update the id attribute

    // Create a paragraph element to display box attributes
    const attributesParagraph = document.createElement("p");
    attributesParagraph.innerHTML = `<b><font size="2">${box.name}</font></b><br><font size="1">Description: ${box.description}<br>Workload: ${box.workload}<br>Social Contact: ${box.socialcontact}<br><b><span class="recommendation"></span></font>`;

    // Append the attributes paragraph to the draggable element
    draggableElement.appendChild(attributesParagraph);

    // Add recommendation element within the backlog-box1 element

    backlogColumn.appendChild(draggableElement);
  });
}

// Call the setDraggableBoxes function to initialize the draggable boxes
setDraggableBoxes();

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
    timestamp === "Pre-Noon (8:25 - ca. 11:25)" ||
    timestamp === "Post-Noon (ca. 14:30 - 17:00)" ||
    event.target.classList.contains("backlog-column");
  const isTargetColumn =
    event.target.classList.contains("droppable-column") ||
    event.target.classList.contains("backlog-column");

  if (isDropAllowed && isTargetColumn) {
    const boxIndex = parseInt(draggableElement.id.replace("backlog", "")) - 1;
    const box = boxArray[boxIndex];

    // Update the attributes of the draggable element
    draggableElement.setAttribute("data-name", box.name);
    draggableElement.setAttribute("data-description", box.description);
    draggableElement.setAttribute("data-workload", box.workload);
    draggableElement.setAttribute("data-socialcontact", box.socialcontact);

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
      //console.log(jsonData); // Log the jsonData object to inspect its structure
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

  updateSummaryCircle(summaryCircleA, crewPackage?.A, "A");
  updateSummaryCircle(summaryCircleB, crewPackage?.B, "B");
  updateSummaryCircle(summaryCircleC, crewPackage?.C, "C");
  updateSummaryCircle(summaryCircleD, crewPackage?.D, "D");

  const bestCrewMembers = getBestCrewMembers(crewPackage);

  const recommendationElements = document.querySelectorAll(".recommendation");

  recommendationElements.forEach((element, index) => {
    if (bestCrewMembers.length > index) {
      const crewMember = bestCrewMembers[index];
      displayRecommendation(element, crewMember);
    }
  });
  console.log(boxArray);
}

function getBestCrewMembers(crewPackage) {
  const bestCrewMembers = [];

  boxArray.forEach((box) => {
    const differences = {}; // Object to store the differences in workload and social contact values

    // Calculate the differences between each crew member and the box values
    for (const member in crewPackage) {
      const package = crewPackage[member];
      const workloadDiff = Math.abs(package.workload - box.workload);
      const socialContactDiff = Math.abs(
        package.socialcontact - box.socialcontact
      );
      differences[member] = workloadDiff + socialContactDiff;
    }

    // Find the crew member with the minimum difference
    let bestCrewMember = null;
    let minDifference = Infinity;
    for (const member in differences) {
      if (differences[member] < minDifference) {
        minDifference = differences[member];
        bestCrewMember = member;
      }
    }

    bestCrewMembers.push(bestCrewMember);
  });

  return bestCrewMembers;
}

function displayRecommendation(element, crewMember) {
  // Update the recommendation display with the best crew member
  if (element) {
    element.textContent = `Recommendation: ${crewMember}`;
  } else {
    console.error("Error: recommendation element not found.");
  }
}

function updateSummaryCircle(element, summary, packageId) {
  element.textContent = `Summary ${packageId}: ${summary?.mood || ""}`;

  const imageUrl = getImageUrl(packageId); // Get the image URL based on the packageId
  if (summary?.mood && imageUrl) {
    const imgElement = document.createElement("img");
    imgElement.classList.add("circle-image");
    imgElement.src = imageUrl; // Set the src attribute with the image URL

    const circleOutline = document.createElement("div");
    circleOutline.classList.add("circle-outline");
    circleOutline.style.borderColor = getOutlineColor(summary.mood); // Set the outline color

    const circleContent = document.createElement("div");
    circleContent.classList.add("circle-content");
    circleContent.appendChild(imgElement);

    circleOutline.appendChild(circleContent);
    element.innerHTML = "";
    element.appendChild(circleOutline);
  } else {
    element.innerHTML = ""; // Clear the content if no image is available
  }
}

function getImageUrl(packageId) {
  // Return the image URL based on the packageId
  if (packageId === "A") {
    return "Assets/image-a.jpg";
  } else if (packageId === "B") {
    return "Assets/image-b.jpg";
  } else if (packageId === "C") {
    return "Assets/image-c.jpg";
  } else if (packageId === "D") {
    return "Assets/image-d.jpg";
  }
  return ""; // Return an empty string if no image is available for the packageId
}

function getOutlineColor(value) {
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
  return ""; // Return an empty string if no outline color is available
}

// Initial fetch and process
fetchAndProcessCrewPackages();

// Set interval to fetch and process crew packages every 2 seconds
setInterval(fetchAndProcessCrewPackages, 2000); // Adjust the interval duration as needed
