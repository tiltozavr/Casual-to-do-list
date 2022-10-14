const addMessage = document.querySelector(`.form__input`)
const container = document.querySelector(`.table__container`);
const table = document.querySelector(`.table`);
const ADDNEW_BUTTON_CONTAINER = document.getElementById('addnewbutton__container');
const NEW_FORM = document.getElementById(`newForm`);
// const ENDPOINT = "https://todolist-matveev.herokuapp.com/api/v1/"
const ENDPOINT = "https://tirawian-to-do-list-node.herokuapp.com/"

function init() {
    getToDoLists(ENDPOINT)
}

init()

async function getToDoLists(urlPath) {
    const resp = await fetch(urlPath + "tasks", {
        method: 'GET'
    });
    const respData = await resp.json();
    createToDo(respData)
}

async function createToDoList(urlPath, data) {
    const resp = await fetch(urlPath + "tasks", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    });
    const respData = await resp.json();
}

async function formToDo() {
    await createToDoList(ENDPOINT, {"text": addMessage.value, "done": false, "priority": 1});
    await getToDoLists(ENDPOINT)
};

function createToDo(data) {
    table.innerHTML = ""
    for (let i = 0; i < data.length; i++) {
        let liEl = createLiElement(data[i]);
        let buttonEl = createButtonElement(data[i]);
        let inputEl = createInputElement(data[i]);  
        liEl.append(buttonEl)
        liEl.prepend(inputEl)
        table.append(liEl)
    }
}

async function deleteToDo(urlPath, id) {
    const resp = await fetch(urlPath + "tasks/" + id, {
        method: "DELETE"
    })
    getToDoLists(ENDPOINT)
}

async function changeToDo(urlPath, data) {
    const resp = await fetch(urlPath + "tasks/" + data.id, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    });
    getToDoLists(ENDPOINT) 
}

function createInputForm() {
    NEW_FORM.classList.toggle("addnewbutton-none");
    ADDNEW_BUTTON_CONTAINER.classList.toggle("addnewbutton-none");
}

function createLiElement(data) {
    let liElement = document.createElement(`li`)
    liElement.type = "none"
    liElement.id = data.id
    liElement.textContent = data.text
    liElement.classList.add("table__item")
    liElement.style.textDecoration = data.done === true ? "line-through" : ""
    return liElement
}

function createButtonElement(data) {
    let buttonEl = document.createElement(`button`);
    buttonEl.type = "button"
    buttonEl.onclick = function() {
        deleteToDo(ENDPOINT, data.id)
    }
    return buttonEl
}

function createInputElement(data) {
    let inputElement = document.createElement(`input`)
    inputElement.type = "checkbox"
    inputElement.classList.add("table__btn")
    inputElement.onclick = function() {
        data.done = !data.done; 
        (changeToDo(ENDPOINT, data))
    }
    inputElement.checked = data.done === true ? true : false 
    return inputElement
}


