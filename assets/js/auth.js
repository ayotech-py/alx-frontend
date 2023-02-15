document.getElementById("sign_up").onclick = function() {
    signIn()
/*     let password_01 = document.getElementById("confirm_password").value;
    let password_02 = document.getElementById("password").value;
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value

    if (password_01 != '' && password_02 != '' && username != '' && email != '') {
        if (password_01 === password_02) {
            fetch("http://127.0.0.1:8000/letsquiz_api/register/", {
                method: "POST",
                body: JSON.stringify({
                    "username": username,
                    "email": email,
                    "password": password_01,
                }, null),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log("this block of code is running")
            })
            .catch((error)  => {
                document.getElementById("response").innerHTML = error;
                //console.log(error)
            });
        } else {
            console.log("Password mismatch")
        }
    } else {
        console.log("All fields are required!")
    } */
}

async function signIn(){
    let password_01 = document.getElementById("confirm_password").value;
    let password_02 = document.getElementById("password").value;
    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value

    if (password_01 != '' && password_02 != '' && username != '' && email != '') {
        if (password_01 === password_02) {
            let response = await fetch("http://127.0.0.1:8000/letsquiz_api/register/", {
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
            } else if (response.status === 200) {
                console.log(data)
                console.log(data.success)
            }
        }
    }
}