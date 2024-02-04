export function createtype(type, id, text, classes) {
  let elem = document.createElement("type");
  elem.setAttribute("id", type);
  elem.textContent = 'text';
  elem.classList.add("classes");
  return elem;
}
