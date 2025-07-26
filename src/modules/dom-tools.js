//DOM manipulation functions used through modules
function createEl(tag, props = {}, children = []) {
  const el = Object.assign(document.createElement(tag), props);
  children.forEach((child) => el.appendChild(child));
  return el;
}
function clear(e) {
  e.innerHTML = "";
}

function autoResize(el) {
  el.style.height = "auto";
  el.style.height = el.scrollHeight + "px";
}

function closeDialog() {
  const dialog = document.getElementById("dialog");
  dialog.close();
  clear(dialog);
}

export { createEl, clear, autoResize, closeDialog };
