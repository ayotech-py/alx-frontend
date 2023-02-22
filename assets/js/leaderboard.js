let quiz_id = window.sessionStorage.getItem("quiz_id");
let my_name = window.sessionStorage.getItem("name")

async function scoreBoard() {
    let response = await fetch(`http://ayotech-46706.portmap.io:46706/letsquiz_api/quiz_set_score/?quiz_id=${quiz_id}`)
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
            document.getElementById('my_name').innerHTML = score_list[a][0];
            document.getElementById('my_score').innerHTML = score_list[a][1];
        }
    }
}

scoreBoard();