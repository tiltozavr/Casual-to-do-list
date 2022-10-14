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
        let liElement = document.createElement(`li`)
        let inputElement = document.createElement(`input`)
        let buttonEl = document.createElement(`button`);
        buttonEl.type = "button"
        buttonEl.onclick = function() {
            deleteToDo(ENDPOINT, data[i].id)
        }
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
            data[i].done = data[i].done === true ? false : true; 
            (changeToDo(ENDPOINT, data[i]))
        }
        liElement.textContent = `${data[i].text}`
        liElement.classList.add("table__item")
        liElement.prepend(buttonEl)
        liElement.prepend(inputElement)
        table.append(liElement)
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


