function createPostComponent() {
  const postComponent = document.createElement("div");
  postComponent.className =
    "p-4 m-2 bg-transparent flex flex-col border-2 border-black rounded-lg w-1/2 h-full min-h-screen mr-4";
  postComponent.innerHTML = `
      <div class="bg-light-50 p-2 rounded-t-lg mb-4">
        <h2 class="text-2xl font-bold">Post Component</h2>
      </div>
      <div class="w-full flex justify-around mb-4" id="action-button">
        <button class="px-10 text-xs py-2 bg-blue-300 text-white font-semibold rounded-md shadow-md"  data-type="Heading" onclick="createInput('Heading')">Heading</button>
        <button class="px-10 text-xs py-2 bg-purple-300 text-white font-semibold rounded-md shadow-md"  data-type="Image" onclick="createInput('Image')">Image</button>
        <button class="px-10 text-xs py-2 bg-teal-300 text-white font-semibold rounded-md shadow-md" data-type="Description" onclick="createInput('Description')">Description</button>
      </div>
      <div id="poster-inputs"></div>
    `;

  return postComponent;
}

function generateTemplate(type) {
  const inputDiv = document.createElement("div");
  inputDiv.className =
    "relative block mb-4 p-3 border border-gray-300 rounded-lg";

  if (type === "Image") {
    inputDiv.innerHTML = `
                  <label class="absolute top-0 left-0 -mt-2 -ml-2 px-1 bg-white text-gray-600 text-xs font-semibold rounded-tl-lg">Upload ${type}</label>
                  <div class="relative w-full h-24 px-4 py-3 bg-transparent rounded-lg border-dashed border-gray-400">
                      <input type="file" class="absolute inset-0 w-full h-full opacity-0" accept="image/*">
                      <div class="flex items-center justify-center text-black">
                      <span class="ml-2 text-sm font-semibold">Select ${type}</span>
                      </div>
                  </div>
                  `;
    inputDiv
      .querySelector("input")
      .addEventListener("change", handleImageUpload);
  } else if (type === "Heading") {
    inputDiv.innerHTML = `
                  <label class="absolute top-0 left-0 -mt-2 -ml-2 px-1 bg-white text-gray-600 text-xs font-semibold rounded-tl-lg">Enter ${type} text</label>
                  <div class="bg-white p-2 rounded-lg shadow-md flex items-center mb-4">
                      <input type="text" class="flex-1 py-1 px-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter ${type} text" oninput="updatePreview('${type}', this.value)">
                  </div>
                  <div class="flex justify-between mt-2">
                      <div class="inline-flex items-center">
                          <button class="px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-r-0 border-gray-300 rounded-l-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white" onclick="changeAlignment('left')">Left</button>
                          <button class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-300 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white" onclick="changeAlignment('center')">Center</button>
                          <button class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white" onclick="changeAlignment('Right')">Right</button>
                      </div>
                      <div class="inline-flex items-center">
                          <input type="color" class="ml-2 w-10 h-10 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300" onchange="changeColor(this.value)">
                      </div>
                  </div>
                  `;
  } else {
    inputDiv.innerHTML = `
                  <label class="absolute top-0 left-0 -mt-2 -ml-2 px-1 bg-white text-gray-600 text-xs font-semibold rounded-tl-lg">Enter ${type} here</label>
                  <div class="bg-white p-2 rounded-lg shadow-md flex items-center mb-4">
                      <textarea type="text" class="flex-1 py-1 px-2 h-24 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:border-blue-300" placeholder="Enter ${type} here" oninput="updatePreview('${type}', this.value)"></textarea>
                  </div>
                  `;
  }

  const crossButton = document.createElement("button");
  crossButton.className =
    "absolute top-0 right-0 -mt-3 -mr-4 px-2 py-0.5 bg-red-500 text-white font-bold rounded-full";
  crossButton.textContent = "X";
  crossButton.setAttribute("onclick", `removeInput(this, '${type}')`);
  inputDiv.appendChild(crossButton);

  return inputDiv;
}

function createInput(type) {
  const posterInputs = document.getElementById("poster-inputs");
  const addButton = document.querySelector(`button[data-type="${type}"]`);
  addButton.style.display = "none";

  document.getElementById("download-poster-preview").style.display =
    posterInputs.childElementCount >= 1 ? "block" : "none";

  if (type === "Heading") {
    posterInputs.insertBefore(generateTemplate(type), posterInputs.children[0]);
  } else if (type === "Image") {
    posterInputs.insertBefore(generateTemplate(type), posterInputs.children[1]);
  } else if (type === "Description") {
    posterInputs.insertBefore(generateTemplate(type), posterInputs.children[2]);
  }
}

function removeInput(button, type) {
  updatePreview(type, "");

  const parentDiv = button.parentNode;
  parentDiv.parentNode.removeChild(parentDiv);

  const buttonToShow = document.querySelector(`button[data-type="${type}"]`);
  buttonToShow.style.display = "inline-block";
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const imgDiv = document.createElement("div");
    imgDiv.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image" class="max-h-40 mt-2">`;
    updatePreview("Image", e.target.result);
  };
  reader.readAsDataURL(file);
}
