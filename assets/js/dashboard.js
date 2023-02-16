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
        document.getElementById("logged_in_user").innerHTML = `WELCOME BACK ${user.toUpperCase()}`
    }
}

async function chechActive () {
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
        console.log('active')
    } else {
        console.log(response.status)
        window.location = "../html/login.html"
    }
}

window.setInterval(chechActive, 5000)

chechActive()

getData();
