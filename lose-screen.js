

function displayLoseScreen() {
    let overlay_el = document.createElement("div")
    let h1_el = document.createElement("h1")
    let play_again_btn_el = document.createElement("button")
    let canvas_wrap_el = document.querySelector("#canvas-wrap")

    h1_el.textContent = "YOU LOST!"
    play_again_btn_el.textContent = "PLAY AGAIN"
    play_again_btn_el.id = "play-again"
    play_again_btn_el.addEventListener("click", window.location.reload.bind(window.location))

    overlay_el.appendChild(h1_el)
    overlay_el.appendChild(play_again_btn_el)
    overlay_el.id = "overlay"

    canvas_wrap_el.appendChild(overlay_el)
}