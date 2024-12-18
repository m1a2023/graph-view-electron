// Node input
const NodeFileInput = document.getElementById("upload-nodes");
const NodeUploadButton = document.getElementById("upload-nodes-button");

NodeUploadButton.addEventListener("click", () => {
  NodeFileInput.click();
});

NodeFileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (file) {
    console.log(`[${new Date().toLocaleTimeString()}] | File: ${file.name}`);

    const reader = new FileReader();

    reader.onload = (event) => {
      console.log(`Content of ${file.name}: \n${event.target.result}`);
      document.getElementById("graph-input-data").value = event.target.result;
    };

    reader.readAsText(file);
  } else {
    console.error(`Error trying to read file ${file.name}`);
  }
});

// Edge input
const EdgeFileInput = document.getElementById("upload-edges");
const EdgeUploadButton = document.getElementById("upload-edges-button");

EdgeUploadButton.addEventListener("click", () => {
  EdgeFileInput.click();
});

EdgeFileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];

  if (file) {
    console.log(`[${new Date().toLocaleTimeString()}] | File: ${file.name}`);

    const reader = new FileReader();

    reader.onload = (event) => {
      console.log(`Content of ${file.name}: \n${event.target.result}`);
      document.getElementById("graph-edges-data").value = event.target.result;
    };

    reader.readAsText(file);
  } else {
    console.error(`Error trying to read file ${file.name}`);
  }
});
