let score = window.localStorage.getItem("score");

document.getElementById("score").innerHTML = `${score}/40`

document.getElementById("correctAnswer").innerHTML = `Correct Answers: ${score}`;

document.getElementById("wrongAnswer").innerHTML = `Wrong Answers: ${40 - score}`;
