async function sendData(event) {
  console.log('Form submitted', event.target)

  // var zipFile = document.getElementById("zip").value
  // console.log('Got file', zipFile)
}

const scriptEditor = document.getElementById('script-editor')
const editor = CodeMirror.fromTextArea(scriptEditor, {
  lineNumbers: true,
  // theme: 'dracula',
})