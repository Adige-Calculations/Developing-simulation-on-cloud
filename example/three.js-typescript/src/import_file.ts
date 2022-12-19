export default function import_file() {
  document.getElementById("fileInput").addEventListener("change", (event) => {
    var event_target = event.target as HTMLInputElement;
    const file = event_target.files[0];
    var reader = new FileReader();
    reader.onload = function() {
      document.getElementById('textArea').value = reader.result;
    };
    reader.readAsText(file);
  })
}
