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
let liContainers


function init() {
    getToDoLists()
}

init()

async function formToDo() {
    await createToDoList({"text": addMessage.value, "done": false, "priority": 1});
    await getToDoLists()
};

function createToDo(data, subContainer) {
    for (let i = 0; i < data.length; i++) {
        let mainContainer = !data[i].parentId ? table : subContainer;
        let labelEl = createLabelElement(data[i]);
        let colorContainer = createColorMenu(data[i]);  
        let liEl = createLiElement(data[i]);
        let menuContainer = createMenuContainer(data[i], colorContainer, liEl);
        let buttonEl = createButtonElement(menuContainer);
        let inputEl = createInputElement(data[i]);
        let divEl = createDivElement(data[i]);
        let container = createContainerElement(); 
        labelEl.appendChild(inputEl);
        container.prepend(labelEl);
        container.append(divEl, buttonEl, menuContainer, colorContainer);
        liEl.append(container);
        mainContainer.append(liEl);
        createToDo(data[i].subTasks, liEl)           
    }
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



