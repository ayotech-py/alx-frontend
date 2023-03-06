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

jQuery(document).ready(function($) {

    if (window.history && window.history.pushState) {

      $(window).on('popstate', function() {
        var hashLocation = location.hash;
        var hashSplit = hashLocation.split("#!/");
        var hashName = hashSplit[1];

        if (hashName !== '') {
          var hash = window.location.hash;
          if (hash === '') {
            alert('Back button was pressed.');
              window.location='../html/join_quiz_login.html';
              return false;
          }
        }
      });

      window.history.pushState('forward', null, './#forward');
    }

  });

scoreBoard();
quizStart(false, true);