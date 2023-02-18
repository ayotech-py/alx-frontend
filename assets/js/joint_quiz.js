//let quiz_id = window.sessionStorage.getItem("quiz_id");

quiz_id = 539030;

async function fetchQuestion() {
    let response = await fetch(`http://127.0.0.1:8000/letsquiz_api/quiz_questions?quiz_id=${quiz_id}`)
    let data = await response.json()
    return(data.data)
}

let question = fetchQuestion()


question.then((data) => {
    console.log(data)
})