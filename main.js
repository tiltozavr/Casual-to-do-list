const addMessage = document.querySelector(`.form__input`)
const addButton = document.querySelector(`.form__btn`);
const container = document.querySelector(`.table__container`);
const table = document.querySelector(`.table`);
const INPUT_ELEMENTS = document.querySelectorAll(`.table__btn`)
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

async function createToDoList(urlPath, text) {
    const resp = await fetch(urlPath + "createtodo?text=" + `${text}`, {
        method: 'GET'
    });
}

function formToDo() {
    createToDoList(ENDPOINT, addMessage.value);
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


