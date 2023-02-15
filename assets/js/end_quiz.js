let score = window.localStorage.getItem("score");

let average = (score/20) * 100;

document.getElementById("score").innerHTML = `${average}%`

document.getElementById("correctAnswer").innerHTML = `Correct Answers: ${score}`;

document.getElementById("wrongAnswer").innerHTML = `Wrong Answers: ${20 - score}`;