document.addEventListener("DOMContentLoaded", () => {
  const postComponent = createPostComponent();
  const previewComponent = createPreviewComponent();

  const mainComponent = document.createElement("div");
  mainComponent.className = "flex space-x-4";
  mainComponent.appendChild(postComponent);
  mainComponent.appendChild(previewComponent);

  const appContainer = document.getElementById("app");
  appContainer.appendChild(mainComponent);
});
