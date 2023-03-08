let rate = window.localStorage.getItem("rate");
let title = window.localStorage.getItem("title");
let questions = JSON.parse(window.sessionStorage.questions)

let count = 1;

let status_no = [];

let user_answers = ['butterfly'];
let correct_answers = [];

function questionAction(question, index) {
    document.getElementById("subject-title").innerHTML = window.sessionStorage.subject;
    document.getElementById("question-no").innerHTML = `Question ${count} of 40`;
    document.getElementById("question").innerHTML = question[index].question;
    let answers = [question[index].option.a, question[index].option.b, question[index].option.c, question[index].option.d, question[index].option.e];
    let option = document.getElementById("answers")
    option = option.getElementsByTagName("label")
    for(let i = 0; i < 5; i++){
        option[i].innerHTML = answers[i]
    }
    console.log(question[index].answer)
    console.log(correct_answers.push(questions[index].option[questions[index].answer]))
}


var seconds = 60;
var minute = 29;

function timeManager() {
    var timeDuration = setInterval(function(){
        
        seconds--;
        
        if (seconds == 0){
            minute--;
            seconds = 60;
            document.getElementById("duration").innerHTML = `Time remaining: 0${minute} : ${seconds}`
        } else if(minute <= 0 && seconds < 1) {
            document.getElementById("duration").innerHTML = `Time remaining: 00 : 00`
            clearInterval(timeDuration);
        } else {
            if (seconds < 10) {
                document.getElementById("duration").innerHTML = `Time remaining: 0${minute} : 0${seconds}`
            } else {
                document.getElementById("duration").innerHTML = `Time remaining: 0${minute} : ${seconds}`
            }
        }
    }, 1000);
}


document.getElementById("next-btn").onclick = function() {
    if (count == 40) {
        Result();
        document.getElementById("next-btn").innerHTML = `<a href="./end_quiz.html"><button class="btn-01" id="next-btn">Submit</button></a>`;
    }
    if (count < 40) {
        questionAction(questions, count);
    }
    status_no[0] = count;
    count++;

    
    let answer = document.querySelectorAll('input[name="fav_language"]');
    let selectedAnswer = document.getElementsByTagName("label")
    for (var a = 0; a < answer.length; a++) {
        if (answer[a].checked == true) {
            user_answers.push(selectedAnswer[a].innerHTML);
        }
    }

    if (answer[0].checked != true && answer[1].checked != true && answer[2].checked != true & answer[3].checked != true) {
        user_answers.push("None");
    }
    
    var elements = document.getElementsByTagName("input");
    
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].type == "radio") {
            elements[i].checked = false;
        }
    }
    console.log(correct_answers)
    console.log(user_answers)
}

document.getElementById("previous-btn").onclick = function() {
    questionAction(questions, status_no[0] - 1);
    status_no[0] = status_no[0] - 1;
    count = status_no[0] + 1;
    console.log(status_no[0]);
    user_answers.pop();
}


function Result(){
    var cal_score = 0;
    for (let a = 0; a < questions.length; a++) {
        correct_answers.push(questions[a].option[questions[a].answer]);
    }
    for (let i = 0; i < user_answers.length; i++) {
        if (correct_answers[i] === user_answers[i]) {
            cal_score++;
        }
    }
    window.localStorage.setItem("score", cal_score);
}

document.getElementById("submit-btn").onclick = function() {
    Result();
}

setTimeout(function(){
    Result();
    window.location.replace("./end_quiz.html")
}, 2400000)


questionAction(questions, 0);
timeManager();