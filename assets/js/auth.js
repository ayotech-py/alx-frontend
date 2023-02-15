document.getElementById("sign_up").onclick = function() {
    let password_01 = document.getElementById("confirm_password").value;
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
                console.log(error)
            });
        } else {
            console.log("Password mismatch")
        }
    } else {
        console.log("All fields are required!")
    }
}