const addMessage = document.querySelector(`.form__input`)
const container = document.querySelector(`.table__container`);
const table = document.querySelector(`.table`);
const ADDNEW_BUTTON_CONTAINER = document.getElementById('addnewbutton__container');
const NEW_FORM = document.getElementById(`newForm`);
// const ENDPOINT = "https://todolist-matveev.herokuapp.com/api/v1/"
const ENDPOINT = "https://tirawian-to-do-list-node.herokuapp.com/";
const THREEDOTS_URL = "./pictures/threedots.svg";

function init() {
    getToDoLists()
}

init()

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
    await createToDoList({"text": addMessage.value, "done": false, "priority": 2});
    await getToDoLists()
};

function createToDo(data) {
    table.innerHTML = ""
    for (let i = 0; i < data.length; i++) {
        let labelEl = createLabelElement(data[i]);
        let liEl = createLiElement(data[i]);
        let buttonEl = createButtonElement(data[i]);
        let inputEl = createInputElement(data[i]);
        let divEl = createDivElement(data[i]);
        let container = createContainerElement();
        labelEl.appendChild(inputEl);
        container.prepend(labelEl);
        container.append(divEl);
        container.append(buttonEl);
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

function createButtonElement(data) {
    let buttonEl = document.createElement(`button`);
    buttonEl.classList.add("table__btn")
    buttonEl.type = "button"
    buttonEl.onclick = function() {
        deleteToDo(data.id)
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
    return divEl;
}

function createContainerElement() {
    let container = document.createElement("div");
    container.classList.add("table__container");
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


