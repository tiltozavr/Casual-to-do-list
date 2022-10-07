let addMessage = document.querySelector(`.form__input`)
let addButton = document.querySelector(`.form__btn`);
let container = document.querySelector(`.main-container`);
let table = document.querySelector(`.main-container__table`);

let toDoList = []


function formToDo() {
    let toDo = {
        text: addMessage.value,
        done: false, 
        id: Math.random(),
    };

    toDoList.push(toDo);
    createToDo(toDoList[toDoList.length - 1].id)
};

function createToDo(id) {
    let liElement = document.createElement(`li`)
    liElement.innerHTML = 
    `
    ${addMessage.value}
    <button type="button" class="table__btn" onclick="deleteToDo(${id})">Сделано</button>
    `
    liElement.id = id
    table.append(liElement)
}

function deleteToDo(idForDelete) {
    for (let i = 0; i < toDoList.length; i++) { 
        if (toDoList[i].id = idForDelete) {
            let elem = document.getElementById(idForDelete);
            elem.remove();
            toDoList.splice(i, 1)
            
        }
    }
}


