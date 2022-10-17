class Elem {
    constructor(el) {
        this.element = document.createElement(el);
    }
    addClassList(className) {
        this.element.classList.add(className)
    }
    appendTo(parent) {
        parent.append(this.element)
    }
    getEl() {
        return this.element
    }
    createChildImg(src) {
        let img = document.createElement("img");
        img.src = src;
        this.element.append(img);
    }
    createChildSpan(text) {
        let span = document.createElement("span");
        span.textContent = text; 
        this.element.append(span);
    }
}

function createInputForm() {
    NEW_FORM.classList.toggle("addnewbutton-none");
    ADDNEW_BUTTON_CONTAINER.classList.toggle("addnewbutton-none");
}

function createLiElement(data) {
    let liElement = document.createElement(`li`)
    liElement.id = data.id
    liElement.classList.add("table__item")
    return liElement
}

function createButtonElement(menuContainer) {
    let buttonEl = document.createElement(`button`);
    buttonEl.classList.add("table__btn")
    buttonEl.type = "button"
    buttonEl.onclick = function() {
        menuContainer.classList.toggle("menu__container__none");
    }
    buttonEl.style.backgroundImage = `url(${THREEDOTS_URL})`
    return buttonEl
}

function createInputElement(data) {
    let inputElement = document.createElement(`input`)
    inputElement.type = "checkbox"
    inputElement.classList.add("checkbox")
    inputElement.onclick = function() {
        data.done = !data.done; 
        changeToDo(data)
    }
    inputElement.checked = data.done === true ? true : false
    return inputElement
}

function createLabelElement (data) {
    let labelEl = document.createElement('label');
    labelEl.classList.add("custom-checkbox");
    let color = data.done === true ? getColourFromPriority(data) : "white"
    labelEl.style.backgroundColor = color
    labelEl.style.borderColor = getColourFromPriority(data)
    return labelEl;
}

function createDivElement(data) {
    let divEl = document.createElement("div");
    divEl.classList.add("table__div");
    let color = getColourFromPriority(data);   
    divEl.style.borderLeft = `7px solid ${color}`;
    divEl.innerHTML = data.text.indexOf("\n") === -1
    ? data.text  
    : data.text.split("")
        .map(item => item === "\n" 
            ? "<br>"
            : item)
        .join("")
    divEl.style.textDecoration = data.done === true ? "line-through" : "";
    divEl.style.color = data.done === true ? "gray" : "";
    return divEl;
}

function createContainerElement() {
    let container = document.createElement("div");
    container.classList.add("table__container");
    return container
}

function createMenuContainer(data, colorContainer) {
    let container = document.createElement("div");
    container.classList.add("menu__container__none", "menu__container");
    let menuAdd = createMenuItem(container, PLUS_IMG_SRC, "Add tree");
    let menuEdit = createMenuItem(container, EDIT_IMG_SRC, "Edit");
    let menuColor = createMenuItem(container, DROP_IMG_SRC, "Change color");
    let menuDelete = createMenuItem(container, DELETE_IMG_SRC, "Delete");
    menuDelete.addEventListener("click", () => {
        deleteToDo(data.id)
    })
    menuColor.addEventListener("click", () => {
        colorContainer.classList.toggle("menu__container__none")
    })
    return container
}

function createMenuItem(container, src, text) {
    let item = new Elem("div");
    item.createChildImg(src); 
    item.createChildSpan(text);
    item.addClassList("menu__item");
    item.appendTo(container);
    return item.getEl();
}

function createColorMenuItem(container, className, data, color) {
    let item = new Elem("div");
    item.addClassList(className);
    item.appendTo(container);
    let colorItem = item.getEl();
    colorItem.addEventListener("click", () => {
        changeColor(data, color)
    });
    return colorItem;
}