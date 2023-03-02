document.getElementById("sign_up").onclick = function() {
    signIn();
}

document.getElementById("login_in").onclick = function() {
    loginIn();
}

async function signIn(){
    let password_01 = document.getElementById("confirm_password").value;
    let password_02 = document.getElementById("password").value;
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value

    if (password_01 != '' && password_02 != '' && username != '' && email != '') {
        if (password_01 === password_02) {
            let response = await fetch("https://web-01.ayotech-py.tech/letsquiz_api/register/", {
                method: "POST",
                body: JSON.stringify({
                    "username": username,
                    "email": email,
                    "password": password_01,
                }, null),
            })
            let data = await response.json();
            if (response.status === 400) {
                console.log(data.error);
                document.getElementById("response").innerHTML = data.error;
            } else if (response.status === 200) {
                console.log(data.success)
                window.location = "../html/login.html";
                document.getElementById("response").innerHTML = data.success;
            } else {
                console.log(data.error)
                document.getElementById("response").innerHTML = data.error;
            }
        }
    }
}

async function loginIn() {
    let password = document.getElementById("password").value;
    let username = document.getElementById("username").value;
    let response = await fetch("https://web-01.ayotech-py.tech/letsquiz_api/login/", {
        method: "POST",
        body: JSON.stringify({
            "username": username,
            "password": password,
        }),
    })
    let data = await response.json();
    if (response.status === 400) {
        console.log(data.error);
        document.getElementById("response").innerHTML = data.error;
    } else if (response.status === 200) {
        console.log(data)
    } else {
        console.log(data.error)
        document.getElementById("response").innerHTML = data.error;
    }
}