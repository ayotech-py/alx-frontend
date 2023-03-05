async function joinQuiz() {
    let quiz_id = document.getElementById("quiz_id").value;
    let quiz_name = document.getElementById("username").value;

    window.sessionStorage.setItem("quiz_id", quiz_id);
    window.sessionStorage.setItem('name', quiz_name);

    let response = await fetch('https://web-01.ayotech-py.tech/letsquiz_api/join_quiz/', {
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
    console.log(window.navigator.connection)
    console.log(window.navigator.connection.effectiveType === "4g")
    console.log(window.navigator.connection.effectiveType.endsWith("4g"))
    if (window.navigator.connection.effectiveType === "4g") {
        joinQuiz();
    } else if (window.navigator.connection.rrt <= 400 ) {
        joinQuiz();
    } else {
        document.getElementById("error").innerHTML = `${window.navigator.connection.effectiveType.endsWith("4g")} | ${window.navigator.connection.effectiveType} | ${window.navigator.connection.rtt}`;
    }
}