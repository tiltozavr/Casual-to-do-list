const addMessage = document.querySelector(`.form__input`)
const addButton = document.querySelector(`.form__btn`);
const container = document.querySelector(`.table__container`);
const table = document.querySelector(`.table`);
const INPUT_ELEMENTS = document.querySelectorAll(`.table__btn`)
const ADDNEW_BUTTON = document.querySelector(`.addnewbutton`);
const ADDNEW_BUTTON_CONTAINER = document.getElementById('addnewbutton__container');
const CREATE_FORM = document.createElement('form');
const CREATE_INPUT = document.createElement('input');
const CREATE_BUTTON = document.createElement('button');
const ENDPOINT = "https://todolist-matveev.herokuapp.com/api/v1/"

function init() {
    getToDoLists(ENDPOINT)
}

init()

async function getToDoLists(urlPath) {
    const resp = await fetch(urlPath + "todolist", {
        method: 'GET'
    });
    const respData = await resp.json();
    createToDo(respData)
}

async function createToDoList(urlPath, data) {
    const resp = await fetch(urlPath + "createtodo", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json"
        }
    });
}

function formToDo() {
    createToDoList(ENDPOINT, {"text": addMessage.value, "done": false, "priority": 1});
    getToDoLists(ENDPOINT)
};

function createToDo(data) {
    table.innerHTML = ""
    for (let i = 0; i < data.length; i++) {
        let liElement = document.createElement(`li`)
        let inputElement = document.createElement(`input`)
        inputElement.type = "checkbox"
        if (data[i].done === true) {
            liElement.style.textDecoration = "line-through"
            inputElement.checked = true
        } else {
            liElement.style.textDecoration = ""
        }
        inputElement.classList.add("table__btn")
        liElement.type = "none"
        liElement.id = data[i].id
        inputElement.onclick = function() {
            (changeIsDone(ENDPOINT, data[i].id, data[i].done, data[i].text))
        }
        liElement.textContent = `${data[i].text}`
        liElement.classList.add("table__item")
        liElement.prepend(inputElement)
        table.append(liElement)
    }
}

async function deleteToDo(urlPath, id) {
    const resp = await fetch(urlPath + "deletetodo?id=" + id, {
        method: "GET"
    })
    getToDoLists(ENDPOINT)
}

async function changeIsDone(urlPath, id, isDone, text) {
    if (isDone === true) {
        const resp = await fetch(urlPath + "updatetodo?id=" + id + "&text=" + text + "&done=" + false)
    } else {
        const resp = await fetch(urlPath + "updatetodo?id=" + id + "&text=" + text + "&done=" + true)
    }
    getToDoLists(ENDPOINT) 
}

function createInputForm() {
    ADDNEW_BUTTON.remove();
    const CREATE_FORM = document.createElement('form');
    CREATE_INPUT.classList.add('form__input');
    CREATE_BUTTON.textContent = "Add";
    CREATE_BUTTON.classList.add('addnewbutton');
    CREATE_BUTTON.onclick = formToDo;
    CREATE_BUTTON.type = "button";
    CREATE_FORM.append(CREATE_INPUT, CREATE_BUTTON);   
    ADDNEW_BUTTON_CONTAINER.append(CREATE_FORM)   
}


