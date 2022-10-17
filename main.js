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
        container.append(divEl, buttonEl, menuContainer, colorContainer);
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
    let red = createColorMenuItem(container, "color__red", data, "red");
    let orange = createColorMenuItem(container, "color__orange", data, "orange");
    let blue = createColorMenuItem(container, "color__blue", data, "blue");
    let green = createColorMenuItem(container, "color__green", data, "green");
    return container
}

function showChooseColorMenu(colorContainer) {
    colorContainer.classList.toggle("menu__container__none");
}

function changeColor(data, choosenColor) {
    switch(choosenColor) {
        case "red": 
            data.priority = 1;
            break;
        case "orange": 
            data.priority = 2;
            break;
        case "blue": 
            data.priority = 3;
            break;
        default: 
            data.priority = 4; 
            break;
    };
    changeToDo(data);
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

