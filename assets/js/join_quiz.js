async function joinQuiz() {
    let quiz_id = document.getElementById("quiz_id").value;
    let quiz_name = document.getElementById("username").value;

    window.sessionStorage.setItem("quiz_id", quiz_id);
    window.sessionStorage.setItem('name', quiz_name);

    let response = await fetch('http://ayotech-46706.portmap.io:46706/letsquiz_api/join_quiz/', {
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