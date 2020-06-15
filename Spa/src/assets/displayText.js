
function formatText() {
  const invisible = document.querySelector("#invisible");
    const visible = document.querySelector("#visible");
    if(visible)
    visible.innerHTML = invisible.textContent;

}
formatText();
