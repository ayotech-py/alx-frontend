chechActive();

async function getData() {
    let token = window.localStorage.getItem("access-token")
    let username = window.sessionStorage.getItem("user")
    let response = await fetch("http://127.0.0.1:8000/letsquiz_api/getdata", {
        headers: {
            'Authorization': 'Bearer ' + token,
            'user': username,
        }
    });
    let data = await response.json()
    if (response.status === 200) {
        user = data.user
        quiz_data = data['quiz-details']
        console.log(quiz_data.at(-1))
        let quiz_title = quiz_data.at(-1)['quiz_title']
        let quiz_subject = quiz_data.at(-1)['subject']
        let quiz_id = quiz_data.at(-1)['quiz_id']
        let created_at = quiz_data.at(-1)['created_at'] 

        document.getElementById("quiz-head").innerHTML = `Title: ${quiz_title}`
        document.getElementById("quiz-subject").innerHTML = `Subject: ${quiz_subject}`
        document.getElementById("quiz-id").innerHTML = `ID: ${quiz_id}`
        document.getElementById("quiz-date").innerHTML = `Date: ${created_at.substring(0,10)}`

        document.getElementById("logged_in_user").innerHTML = `WELCOME BACK ${user.toUpperCase()}`
    }
}

async function chechActive () {
    let token = window.localStorage.getItem("access-token")
    let username = window.sessionStorage.getItem("user")
    if (username === null) {
        window.location = "../html/login.html"
    }
    let response = await fetch("http://127.0.0.1:8000/letsquiz_api/getdata", {
        headers: {
            'Authorization': 'Bearer ' + token,
            'user': username,
        }
    });
    let data = await response.json()
    if (response.status === 200) {
        console.log('active')
    } else {
        console.log(response.status)
        window.location = "../html/login.html"
    }
}

async function getQuiz() {
    document.getElementById("response").innerHTML = "please wait..."; 
    let title = document.getElementById("quiz-title").value;
    let subject = document.getElementById("subject").value;
    let response = await fetch('http://127.0.0.1:8000/letsquiz_api/organize_quiz/', {
        method: 'POST',
        user: window.sessionStorage.getItem("user"),
        body: JSON.stringify({
            "quiz_title": title,
            "subject": subject,
            "user": window.sessionStorage.getItem("user"),
        })
    })
    data = await response.json()
    if (response.status === 400) {
        console.log(data.error);
        document.getElementById("response").innerHTML = data.error;
    } else {
        document.getElementById("response").innerHTML = data.success;
    }
}

document.getElementById('quiz-btn').onclick = function() {
    getQuiz();
    getData();
}

async function quizStart() {
    let username = window.sessionStorage.getItem("user")
    let access = window.localStorage.getItem("access-token")
    let response = await fetch('http://127.0.0.1:8000/letsquiz_api/quiz_status/', {
        method: 'POST',
        body: JSON.stringify({
            'status': true,
        }),
        headers: {
            "Authorization": 'Bearer ' + access,
            'user': username,
        }
    })
    let data = await response.json();
    if (response.status === 200) {
        let button = document.getElementById('start-btn')
        button.innerHTML = "Ongoing Quiz";
        button.disabled = true;
    } else {
        console.log("failed to start quiz")
    }
}


document.getElementById("start-btn").onclick = function() {
    quizStart();
}

window.setInterval(chechActive, 10000)

chechActive()

getData();

