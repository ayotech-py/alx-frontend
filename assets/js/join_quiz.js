async function joinQuiz() {
    let quiz_id = document.getElementById("quiz_id").value;
    let quiz_name = document.getElementById("username").value;

    window.sessionStorage.setItem("quiz_id", quiz_id)

    let response = await fetch('http://127.0.0.1:8000/letsquiz_api/join_quiz/', {
        method: "POST",
        body: JSON.stringify({
            "quiz_id": quiz_id,
            "name": quiz_name
        })
    })
    let data = await response.json();
    if (response.status === 200) {
        console.log(data.success)
        window.location = "./joint.html"
    }
}

document.getElementById("quiz-btn").onclick = function() {
    joinQuiz();
}