async function loginIn() {
    let password = document.getElementById("password").value;
    let username = document.getElementById("username").value;
    let response = await fetch("http://ayotech-46706.portmap.io:46706/letsquiz_api/login/", {
        method: "POST",
        body: JSON.stringify({
            "username": username,
            "password": password,
        }),
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
    let data = await response.json();
    if (response.status === 400) {
        console.log(data.error);
        document.getElementById("response").innerHTML = data.error;
    } else if (response.status === 200) {
        console.log(data.access)
        window.localStorage.setItem("access-token", data.access)
        window.localStorage.setItem("refresh-token", data.refresh)
        let username = window.sessionStorage.setItem("user", data.username)
        window.location = "../../index.html"
    } else {
        document.getElementById("response").innerHTML = data.error;
    }
}

document.getElementById("login_in").onclick = function() {
    loginIn();
}