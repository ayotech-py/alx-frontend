let quiz_id = window.sessionStorage.getItem("quiz_id");
let my_name = window.sessionStorage.getItem("name")

async function scoreBoard() {
    let response = await fetch(`https://web-01.ayotech-py.tech/letsquiz_api/quiz_set_score/?quiz_id=${quiz_id}`)
    let data = await response.json()
    let score_list = data.data

    for (let a = 0; a < 3; a++) {
        let user_name = document.getElementById(`person_${a+1}`)
        let user_score = document.getElementById(`score_${a+1}`)
        
        user_name.innerHTML = score_list[a][0]
        user_score.innerHTML = score_list[a][1]

    }
    for (let a = 0; a < score_list.length; a++) {
        if (score_list[a][0] === my_name) {
            console.log(score_list[a][0] === my_name)
            document.getElementById('my_name').innerHTML = score_list[a][0];
            document.getElementById('my_score').innerHTML = score_list[a][1];
        }
    }
}

async function quizStart(param_1, param_2) {
    let username = window.sessionStorage.getItem("user")
    let access = window.localStorage.getItem("access-token")
    let response = await fetch('https://web-01.ayotech-py.tech/letsquiz_api/quiz_status/', {
        method: 'POST',
        body: JSON.stringify({
            "status": param_1,
            "past": param_2,
        }),
        headers: {
            "Authorization": 'Bearer ' + access,
            'user': username,
        }
    })
    let data = await response.json();
    if (response.status === 200) {
        console.log("successful passed")
    } else {
        console.log("failed to start quiz")   
    }
}

//This jQuery redirect user back to the join quiz page when back button is clicked
window.addEventListener('popstate', function(event) {
    // The popstate event is fired each time when the current history entry changes.

    var r = confirm("You pressed a Back button! Are you sure?!");
    console.log(r)

    if (r == true) {
        // Call Back button programmatically as per user confirmation.
        history.back();
        // Uncomment below line to redirect to the previous page instead.
        // window.location = document.referrer // Note: IE11 is not supporting this.
    } else {
        // Stay on the current page.
        history.pushState(null, null, window.location.pathname);
    }

    history.pushState(null, null, window.location.pathname);

}, false);


console.log("script updated v2")

scoreBoard();
quizStart(false, true);