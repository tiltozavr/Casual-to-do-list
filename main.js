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


