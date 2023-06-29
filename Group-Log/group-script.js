let recommendationsArray = []; // Store the recommendations separately
let crewPackage = null;
let shouldRecreateBoxes = true;

function Box(name, description, workload, socialcontact) {
  this.name = name;
  this.description = description;
  this.workload = workload;
  this.socialcontact = socialcontact;
  this.recommendation = ""; // Initialize recommendation property as an empty string
}

// Initialize the boxArray with some initial box objects
const boxArray = [
  new Box(
    "8:25-11:25 - Electromagnetic Levitator R&R",
    "👤👤👤  💼💼💼",
    90,
    90
  ),
  new Box(
    "8:25-11:25 - Electromagnetic Levitator R&R",
    "👤👤👤  💼💼💼",
    90,
    90
  ),
  new Box(
    "8:25-11:20 - MARES Research Preperation & Exercise",
    "👤👤 💼",
    10,
    50
  ),
  new Box("8:25-11:00 - GRIP Preperation & Experiment", "👤 💼💼", 75, 10),
  new Box("8:25-11:00 - Weekly Spaceship Housekeeping", "👤 💼", 10, 10),
];

function fetchAndProcessCrewPackages() {
  fetch("/crewPackage")
    .then((res) => res.json())
    .then((jsonData) => {
      //console.log(jsonData); // Log the jsonData object to inspect its structure
      crewPackage = jsonData;

      processCrewPackages(jsonData);
      initializeApp();
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

  updateSummaryCircle(summaryCircleA, crewPackage?.Gerst, "A");
  updateSummaryCircle(summaryCircleB, crewPackage?.Wiseman, "B");
  updateSummaryCircle(summaryCircleC, crewPackage?.Wilmore, "C");
  updateSummaryCircle(summaryCircleD, crewPackage?.Serova, "D");
}

function initializeApp() {
  updateRecommendations(crewPackage);
  setDraggableBoxes();
  initializeApp = () => {
    updateRecommendations(crewPackage);
  }; // Overwrite the initializeApp function to do nothing on subsequent calls
}

function setDraggableBoxes() {
  const backlogColumn = document.querySelector(".backlog-column");
  backlogColumn.innerHTML = ""; // Clear the column before adding boxes

  boxArray.forEach((box, index) => {
    const draggableElement = document.createElement("div");
    draggableElement.classList.add("backlog-box", `backlog-box${index + 1}`);
    draggableElement.setAttribute("draggable", "true");
    draggableElement.setAttribute("ondragstart", "drag(event)");
    draggableElement.setAttribute("id", `backlog${index + 1}`);

    draggableElement.dataset.recommendation = box.recommendation; // Update the data-recommendation attribute

    const attributesParagraph = document.createElement("p");
    attributesParagraph.innerHTML = `<b><font size="2">${box.name}</font></b><br><font size="1">Description: ${box.description}<br>Workload: ${box.workload}<br>Social Contact: ${box.socialcontact}<br><b>Recommendation: <span class="recommendation">${box.recommendation}</span></b></font></p>`; // Display the recommendation

    draggableElement.appendChild(attributesParagraph);
    backlogColumn.appendChild(draggableElement);
  });
}

// Call the setDraggableBoxes function to initialize the draggable boxes

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

  console.log("drop function called");
  console.log("event:", event);

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

  console.log("boxArray:", boxArray);
}

function updateRecommendations(crewPackage) {
  //console.log("updateRecommendations function called");
  //  console.log("crewPackage:", crewPackage);

  if (!crewPackage) {
    console.error("Error: crewPackage is null.");
    return;
  }

  boxArray.forEach((box, index) => {
    const bestCrewMembers = getBestCrewMembers(crewPackage);
    const recommendationElement = document.querySelector(
      `.backlog-box${index + 1} .recommendation`
    );

    if (recommendationElement) {
      if (!box.recommendation || box.recommendation !== bestCrewMembers[index]) {
        box.recommendation = bestCrewMembers[index];
        if (box.recommendation) {
          recommendationElement.textContent = `Recommendation: ${box.recommendation}`;
        } else {
          recommendationElement.textContent = "Recommendation: None";
        }
      }
    }
     else {
      console.error("Error: recommendation element not found.");
    }
  });
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

    const pickedCrewMembers = bestCrewMembers.slice(); // Make a copy of already picked crew members

    let bestCrewMember = null;
    let maxHappinessScore = -Infinity;

    // Find the crew member with the maximum happiness score
    for (const member in differences) {
      if (!pickedCrewMembers.includes(member)) {
        const happinessScore = crewPackage[member].mood - differences[member];
        if (happinessScore > maxHappinessScore) {
          maxHappinessScore = happinessScore;
          bestCrewMember = member;
        }
      }
    }

    if (bestCrewMember) {
      bestCrewMembers.push(bestCrewMember);
    } else {
      // If no crew member is available with a positive happiness score,
      // select the second, third, or fourth best option from the remaining crew members
      const remainingCrewMembers = Object.keys(crewPackage).filter(
        (member) => !pickedCrewMembers.includes(member)
      );
      if (remainingCrewMembers.length > 0) {
        bestCrewMembers.push(remainingCrewMembers[0]);
      } else {
        // If there are no remaining crew members, assign an empty string as the recommendation
        bestCrewMembers.push("");
      }
    }

    box.recommendation = bestCrewMembers[bestCrewMembers.length - 1]; // Set the recommendation for the box
  });

  return bestCrewMembers;
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
  if (value <= 15) {
    return "red";
  } else if (value >= 15 && value <= 35) {
    return "orange";
  } else if (value >= 35 && value <= 65) {
    return "green";
  } else if (value >= 65 && value <= 85) {
    return "orange";
  } else if (value >= 85) {
    return "red";
  }
  return ""; // Return an empty string if no outline color is available
}

// Initial fetch and process
fetchAndProcessCrewPackages();

// Set interval to fetch and process crew packages every 2 seconds
setInterval(fetchAndProcessCrewPackages, 2000); // Adjust the interval duration as needed
