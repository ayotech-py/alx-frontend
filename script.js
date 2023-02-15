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
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        }
    });
    console.log(response.headers)
}

getData();