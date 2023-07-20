function submitTask(sessionId){
    fetch(apiUrl + '/task' , {
        method: 'POST',
        headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        json: JSON.stringify({
            sessionId: sessionId
        })
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);
    })
}

const API = {
    submitTask: submitTask
}


