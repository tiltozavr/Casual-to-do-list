const addMessage = document.querySelector(`.form__input`)
const addButton = document.querySelector(`.form__btn`);
const container = document.querySelector(`.main-container`);
const table = document.querySelector(`.main-container__table`);
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
        liElement.type = "none"
        liElement.innerHTML = 
        ` 
        ${i + 1}. ${data[i].text}
        <button type="button" class="table__btn" onclick="deleteToDo(${data[i].id})">Сделано</button>
        `
        liElement.id = data[i].id
        table.append(liElement)
    }
}

function deleteToDo(idForDelete) {
    for (let i = 0; i < toDoList.length; i++) { 
        if (toDoList[i].id === idForDelete) {
            let elem = document.getElementById(idForDelete);
            elem.remove();
            toDoList.splice(i, 1)           
        }
    }
    createToDo()
}

async function deleteToDo(id) {
    const resp = await fetch(ENDPOINT + "deletetodo?id=" + id, {
        method: "GET"
    })
    getToDoLists(ENDPOINT)
}


