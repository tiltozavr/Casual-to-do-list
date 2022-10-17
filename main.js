const addMessage = document.querySelector(`.form__input`)
const container = document.querySelector(`.table__container`);
const table = document.querySelector(`.table`);
const ADDNEW_BUTTON_CONTAINER = document.getElementById('addnewbutton__container');
const NEW_FORM = document.getElementById(`newForm`);
// const ENDPOINT = "https://todolist-matveev.herokuapp.com/api/v1/"
const ENDPOINT = "https://tirawian-to-do-list-node.herokuapp.com/";
const THREEDOTS_URL = "./pictures/threedots.svg";
const MENU_CONTAINER = document.querySelector(`.menu__container__none`);
const PLUS_IMG_SRC = "./pictures/plus.svg"; 
const EDIT_IMG_SRC = "./pictures/pencil.svg"
const DROP_IMG_SRC = "./pictures/drop.svg";
const DELETE_IMG_SRC = "./pictures/trash.svg";


function init() {
    getToDoLists()
}

init()

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

async function getToDoLists() {
    const resp = await fetch(ENDPOINT + "tasks", {
        method: 'GET'
    });
    const respData = await resp.json();
    createToDo(respData)
}

async function createToDoList(data) {
    const resp = await fetch(ENDPOINT + "tasks", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    });
    const respData = await resp.json();
}

async function formToDo() {
    await createToDoList({"text": addMessage.value, "done": false, "priority": 1});
    await getToDoLists()
};

function createToDo(data) {
    table.innerHTML = ""
    for (let i = 0; i < data.length; i++) {
        let labelEl = createLabelElement(data[i]);
        let colorContainer = createColorMenu(data[i]);  
        let liEl = createLiElement(data[i]);
        let menuContainer = createMenuContainer(data[i], colorContainer);
        let buttonEl = createButtonElement(menuContainer);
        let inputEl = createInputElement(data[i]);
        let divEl = createDivElement(data[i]);
        let container = createContainerElement();  
        labelEl.appendChild(inputEl);
        container.prepend(labelEl);
        container.append(divEl);
        container.append(buttonEl);
        container.append(menuContainer);
        container.append(colorContainer);
        liEl.append(container);
        table.append(liEl);
    }
}

async function deleteToDo(id) {
    const resp = await fetch(ENDPOINT + "tasks/" + id, {
        method: "DELETE"
    })
    getToDoLists()
}

async function changeToDo(data) {
    const resp = await fetch(ENDPOINT + "tasks/" + data.id, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    });
    getToDoLists() 
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
    let menuAdd = createMenuAdd(container);
    let menuEdit = createMenuEdit(container);
    let menuColor = createMenuColor(container);
    let menuDelete = createMenuDelete(container);
    menuDelete.addEventListener("click", () => {
        deleteToDo(data.id)
    })
    menuColor.addEventListener("click", () => {
        colorContainer.classList.toggle("menu__container__none")
    })
    return container
}

function getColourFromPriority (data) {
    switch(data.priority) {
        case 1: return "red";
        case 2: return "orange";
        case 3: return "blue";
        default: return "green"
    }
}

function createColorMenu(data) {
    let container = document.createElement("div");
    container.classList.add("menu__container__none", "color__menu");
    let red = document.createElement("div");
    let orange = document.createElement("div");
    let blue = document.createElement("div");
    let green = document.createElement("div");
    red.classList.add("color__red");
    orange.classList.add("color__orange");
    blue.classList.add("color__blue");
    green.classList.add("color__green");
    red.addEventListener("click", () => {
        changeColor(data, "red")
    })
    orange.addEventListener("click", () => {
        changeColor(data, "orange")
    })
    blue.addEventListener("click", () => {
        changeColor(data, "blue")
    })
    green.addEventListener("click", () => {
        changeColor(data, "green")
    })
    container.append(red, orange, blue, green);
    return container
}

function showChooseColorMenu(colorContainer) {
    colorContainer.classList.toggle("menu__container__none");
}

function changeColor(data, choosenColor) {
    if (choosenColor === "red") {
        data.priority = 1
    } else if (choosenColor === "orange") {
        data.priority = 2;
    } else if (choosenColor === "blue") {
        data.priority = 3
    } else {
        data.priority = 4
    };
    changeToDo(data);
}

function createMenuAdd(container) {
    let menuAdd = new Elem("div");
    menuAdd.createChildImg(PLUS_IMG_SRC); 
    menuAdd.createChildSpan("Add tree");
    menuAdd.addClassList("menu__item");
    menuAdd.appendTo(container);
    return menuAdd.getEl();
}

function createMenuEdit(container) {
    let menuEdit = new Elem("div");
    menuEdit.createChildImg(EDIT_IMG_SRC);
    menuEdit.createChildSpan("Edit");
    menuEdit.addClassList("menu__item");
    menuEdit.appendTo(container);
    return menuEdit.getEl();
}
function createMenuColor(container) {
    let menuColor = new Elem("div");
    menuColor.createChildImg(DROP_IMG_SRC);
    menuColor.createChildSpan("Change color");
    menuColor.addClassList("menu__item");
    menuColor.appendTo(container);
    return menuColor.getEl();
}

function createMenuDelete(container) {
    let menuDelete = new Elem("div");
    menuDelete.createChildImg(DELETE_IMG_SRC);
    menuDelete.createChildSpan("Delete");
    menuDelete.addClassList("menu__item");
    menuDelete.appendTo(container);
    return menuDelete.getEl();
}


