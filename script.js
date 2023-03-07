function buttonClick(btn_id) {
    let rate = document.querySelector('input[name="fav_language"]:checked').value;
    window.localStorage.setItem("rate", rate.toLowerCase());
    window.localStorage.setItem("title", btn_id.id.toLowerCase())
}