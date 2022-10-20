async function getToDoLists() {
    const resp = await fetch(ENDPOINT + "tasks", {
        method: 'GET'
    });
    const respData = await resp.json();
    table.innerHTML = ""
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