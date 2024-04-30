let easy_el = document.querySelector(".easy")
let medium_el = document.querySelector(".medium")
let hard_el = document.querySelector(".hard")
let redirect_dir = window.location.href.split("/");
redirect_dir.pop();
redirect_dir = redirect_dir.join("/")

function selectedDifficulty(e) {
    difficulty = e.target.classList[1]
    window.location.href = redirect_dir + "/game.html?" + difficulty;
}

easy_el.addEventListener("click", selectedDifficulty)
medium_el.addEventListener("click", selectedDifficulty)
hard_el.addEventListener("click", selectedDifficulty)
