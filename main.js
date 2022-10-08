const addMessage = document.querySelector(`.form__input`)
const addButton = document.querySelector(`.form__btn`);
const container = document.querySelector(`.main-container`);
const table = document.querySelector(`.main-container__table`);
const ENDPOINT = "https://todolist-matveev.herokuapp.com/api/v1/"
const URL = "https://api.binance.com/api/v3/"


let toDoList = []



async function getToDoLists(endpoint) {
    const resp = await fetch(endpoint + "time", {
        mode: 'no-cors',
        method: 'GET',
    });
    const respData = await resp.json();
    console.log(respData);
}

getToDoLists(URL)

function formToDo() {
    let toDo = {
        text: addMessage.value,
        done: false, 
        id: Math.random(),
    };

    toDoList.push(toDo);
    createToDo(toDoList[toDoList.length - 1].id)
};

function createToDo() {
    table.innerHTML = ""
    for (let i = 0; i < toDoList.length; i++) {
        let liElement = document.createElement(`li`)
        liElement.type = "none"
        liElement.innerHTML = 
        ` 
        ${i + 1}. ${toDoList[i].text}
        <button type="button" class="table__btn" onclick="deleteToDo(${toDoList[i].id})">Сделано</button>
        `
        liElement.id = toDoList[i].id
        table.append(liElement)
    }
}

function deleteToDo(idForDelete) {
    // table.innerHTML = ""
    for (let i = 0; i < toDoList.length; i++) { 
        if (toDoList[i].id === idForDelete) {
            let elem = document.getElementById(idForDelete);
            elem.remove();
            toDoList.splice(i, 1)           
        }
    }
    createToDo()
}


