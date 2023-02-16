function buttonClick(btn_id) {
    let rate = document.querySelector('input[name="fav_language"]:checked').value;
    window.localStorage.setItem("rate", rate.toLowerCase());
    window.localStorage.setItem("title", btn_id.id.toLowerCase())
}

async function getData() {
    let token = window.localStorage.getItem("access-token")
    console.log(token)
    let response = await fetch("http://127.0.0.1:8000/letsquiz_api/getdata", {
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    });
    let data = await response.json()
    if (response.status === 200) {
        user = data.user
        document.getElementById("logged_in_user").innerHTML = `WELCOME BACK ${user.toUpperCase()}`
        let remove = document.getElementsByClassName("list");
        for (let a = 0; a < remove.length - 1; a++) {
            remove[a].style.display = 'none'
        }
        let auth = document.getElementById("auth");
        console.log(auth);
        auth.innerHTML = 'Dashboard';
    }
}

getData();