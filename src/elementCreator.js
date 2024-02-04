function createWrapper(type, ...classNames) {
  const wrapper = document.createElement(type);
  classNames.forEach((className) => wrapper.classList.add(className));
  return wrapper;
}

function createText(type, className, text) {
  const textElement = document.createElement(type);
  textElement.classList.add(className);
  textElement.textContent = text;
  return textElement;
}

function createButton(type, className, text) {
  const button = document.createElement("button");
  button.classList.add(className);
  button.setAttribute("type", type);
  button.textContent = text;
  return button;
}

function createInput(type, id) {
  const input = document.createElement("input");
  input.id = id;
  input.setAttribute("type", type);
  input.required = true;
  return input;
}

function createTextArea(id) {
  const textArea = document.createElement("textarea");
  textArea.id = id;
  textArea.required = true;
  return textArea;
}

function createDatePicker(id) {
  const datePicker = document.createElement("input");
  datePicker.setAttribute("type", "date");
  datePicker.id = id;
  datePicker.required = true;
  return datePicker;
}

function createSelect(id, ...options) {
  const select = document.createElement("select");
  select.id = id;
  options.forEach((option) => {
    const selectOption = document.createElement("option");
    selectOption.setAttribute("value", option);
    selectOption.textContent = option;
    select.append(selectOption);
  });
  return select;
}

function createLabel(text, forElement) {
  const label = document.createElement("label");
  label.setAttribute("for", forElement);
  label.textContent = text;
  return label;
}

export {
  createWrapper,
  createText,
  createButton,
  createInput,
  createTextArea,
  createDatePicker,
  createSelect,
  createLabel,
};