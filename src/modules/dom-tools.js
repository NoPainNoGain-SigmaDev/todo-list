//DOM manipulation functions used through modules
function createEl(tag, props = {}, children = []) {
  const el = Object.assign(document.createElement(tag), props);
  children.forEach(child => el.appendChild(child));
  return el;
}

export { createEl};