async function getJoinedUsers() {
    let quiz_id = window.sessionStorage.getItem("quiz_id")
    console.log(quiz_id)
    let response = await fetch('http://127.0.0.1:8000/letsquiz_api/quiz_users/', {
        method: "POST",
        headers: {
            'quiz_id': quiz_id
        },
        body: JSON.stringify({
            "quiz_id": quiz_id,
        })
    })
    let data = await response.json()
    let names = data['data']

    console.log(data)
    
    for (let a = 0; a < names.length; a++) {
        let user_container = document.getElementById("profiles");
        let user = `<div class="user">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava${a+1}-bg.webp" alt="" srcset="">
        <h3>${data['data'][a][1]}</h3>
        </div>`
        user_container.innerHTML = user_container.innerHTML + user;
    }
}



getJoinedUsers();