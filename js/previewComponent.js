function createPreviewComponent() {
  const previewComponent = document.createElement("div");
  previewComponent.setAttribute("id", "preview-component");
  previewComponent.className =
    "p-4 m-2 border-2 border-black rounded-lg w-1/2 h-full min-h-screen ml-4 shadow-md";

  const contentContainer = document.createElement("div");
  contentContainer.setAttribute("id", "content-container");

  contentContainer.innerHTML = `
      <div class="bg-light-50 p-2 rounded-t-lg mb-4">
        <h2 class="text-2xl font-bold">Preview Component</h2>
      </div>
  
      <div class="flex items-center justify-center h-70 bg-rose-50 rounded-lg overflow-hidden mb-4">
        <img src="" class="h-auto max-w-lg rounded-lg">
      </div>
  
      <div class="p-4 bg-rose-50 rounded-lg">
        <h2 class="text-xl font-semibold text-indigo-700 mb-2" id="previewHeading"></h2>
        <p class="whitespace-pre-wrap text-gray-800" id="previewDescription"></p>
      </div>
    `;

  previewComponent.appendChild(contentContainer);

  const downloadButton = document.createElement("button");
  downloadButton.id = "download-poster-preview";
  downloadButton.className =
    "px-4 py-2 mx-auto bg-indigo-500 text-white font-bold mt-4 rounded-lg shadow-md block hidden";
  downloadButton.textContent = "Download Poster";
  downloadButton.onclick = downloadPreview;

  previewComponent.appendChild(downloadButton);

  return previewComponent;
}

function updatePreview(type, value) {
  const previewElement = document.querySelector("#preview-component");
  switch (type) {
    case "Heading":
      previewElement.querySelector("h2").textContent = value;
      break;
    case "Description":
      previewElement.querySelector("p").textContent = value;
      break;
    case "Image":
      previewElement.querySelector("img").src = value;
      break;
    default:
      break;
  }
}

function changeAlignment(align) {
  const previewHeader = document.querySelector("#preview-component h2");
  previewHeader.style.textAlign = align;
}

function changeColor(color) {
  const previewHeader = document.querySelector("#preview-component h2");
  previewHeader.style.color = color;
}

function downloadPreview() {
  const divToConvert = document.getElementById("content-container");
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = divToConvert.clientWidth;
  canvas.height = divToConvert.clientHeight;

  const bgColor = window.getComputedStyle(divToConvert).backgroundColor;
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const svgString = new XMLSerializer().serializeToString(divToConvert);
  const svgData =
    "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgString);

  const downloadLink = document.createElement("a");
  downloadLink.href = svgData;
  const img = new Image();
  img.src = svgData;
  downloadLink.download = "preview_image.svg";
  downloadLink.click();
}
