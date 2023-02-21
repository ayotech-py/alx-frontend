let quiz_id = window.sessionStorage.getItem("quiz_id");

//This function fetchs the question
async function fetchQuestion() {
    let response = await fetch(`http://ayotech-46706.portmap.io:46706/letsquiz_api/quiz_questions?quiz_id=${quiz_id}`)
    let data = await response.json()
    return(data.data)
}

let questions = fetchQuestion()
let count = 1;
let status_no = [];
let user_answers = [];
let correct_answers = [];
var seconds = 10;
var minute = 1;

//This function fills in the question fields
let my_name = window.sessionStorage.getItem("name")
document.getElementById("my_name").innerHTML = my_name;

function questionAction(index) {
    var elements = document.getElementsByTagName("input");

    for (var i = 0; i < elements.length; i++) {
        if (elements[i].type == "radio") {
            elements[i].checked = false;
        }
    }
    questions.then(
        data => {
            document.getElementById("subject-title").innerHTML = data[index].category;
            document.getElementById("question-no").innerHTML = `Question ${index+1} of 20`;
            document.getElementById("question").innerHTML = data[index].question;
            let answers = [data[index].correctAnswer, data[index].incorrectAnswers[2], data[index].incorrectAnswers[0], data[index].incorrectAnswers[1]];
            answers = shuffleArray(answers);
            let option = document.getElementById("answers")
            option = option.getElementsByTagName("label")
            for(let i = 0; i < 4; i++){
                option[i].innerHTML = answers[i]
            }
        }
    )
    questions.then(data => {
        markBtn(index);
    })
    questions.then(
        data => {
            var seconds = 10;
    
            var timeDuration = setInterval(function(){
            
                seconds--;
            
                if (seconds < 0){
                    clearInterval(timeDuration)
                } else {
                    document.getElementById("duration").innerHTML = `Time remaining: 0${seconds} seconds`;
                }
            }, 1000);
        }
    )
}

//this question shuffles the list of answers
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
    
        // Generate random number
        var j = Math.floor(Math.random() * (i + 1));
                    
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
        
    return array;
 }

 //This function marks and saves the correct answer score
function CorrectAnswer(question, index, time){
    questions.then(data => {
        let answer = document.querySelectorAll('input[name="fav_language"]');
        let selectedAnswer = document.getElementsByTagName("label")
        for (var a = 0; a < answer.length; a++) {
            if (answer[a].checked == true) {
                console.log(selectedAnswer[a].innerHTML)
                if (selectedAnswer[a].innerHTML === data[index].correctAnswer) {
                    console.log("correct")
                    console.log('your score is ' + time)
                    setScore(time);
                } else {
                    console.log("wrong")
                }
            }
        }
    })
}


//This function listens to the clicked answer
function markBtn(no) {
    let time = 1500;
    document.getElementById("answer-01").onclick = function() {
        CorrectAnswer(questions, no, time)
    }
    document.getElementById("answer-02").onclick = function() {
        CorrectAnswer(questions, no, time)
    }
    
    document.getElementById("answer-03").onclick = function() {
        CorrectAnswer(questions, no, time)
    }
    
    document.getElementById("answer-04").onclick = function() {
        CorrectAnswer(questions, no, time)
    }
    setInterval(function() {
        time--
    }, 10)
}

//this sends the score to the database
async function setScore(user_score) {
    let quiz_id = window.sessionStorage.getItem("quiz_id");
    let name = window.sessionStorage.getItem("name")

    let response = await fetch('http://ayotech-46706.portmap.io:46706/letsquiz_api/quiz_set_score/', {
        method: "POST",
        body: JSON.stringify({
            "quiz_id": quiz_id,
            'name': name,
            'score': user_score
        })
    })
    let data = await response.json();
}

//Score board
async function scoreBoard() {
    let response = await fetch(`http://ayotech-46706.portmap.io:46706/letsquiz_api/quiz_set_score/?quiz_id=${quiz_id}`)
    let data = await response.json()
    let score_list = data.data

    
    document.getElementsByTagName('main')[0].style.display = 'none';
    document.getElementsByTagName('aside')[0].style.display = 'block';
    
    var class_name = document.getElementsByClassName("radio-btnn")
    
    for (let a = 0; a < score_list.length; a++) {
        
        class_name[a].style.display = 'flex';
        class_name[a].style.justifyContent = 'space-between';
        
        class_name[a].getElementsByTagName('h3')[0].style.lineHeight = 0;
        class_name[a].getElementsByTagName('h2')[0].style.lineHeight = 0;
        
        
        let user_name = class_name[a].getElementsByTagName('h3')[0]
        let user_score = class_name[a].getElementsByTagName('h2')[0]
        
        user_name.innerHTML = score_list[a][0]
        user_score.innerHTML = score_list[a][1]
    }
}

function nextPage() {
    
    document.getElementsByTagName('main')[0].style.display = 'block';
    document.getElementsByTagName('aside')[0].style.display = 'none';

}

function questionLoop(questionNo) {
    //questionAction(questionNo)
    questionAction(questionNo)
    setTimeout(function() {
        if (questionNo < 9) {
            scoreBoard();
        } else {
            window.location = "./leaderboard.html"
        }
    }, 15000)
    setTimeout(function(){
        nextPage();
    }, 20000)
}

let questionNo = 0;

setInterval(function() {
    questionLoop(questionNo);
    questionNo++;
}, 20000)