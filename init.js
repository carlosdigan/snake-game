let canvas = document.getElementById("myCanvas")
let ctx = canvas.getContext("2d")
let difficulty_param = location.href.split("?")[1]
let score = 0;
let highscore_storage_name = difficulty_param + " High Score"
let highScore = localStorage.getItem(highscore_storage_name) == "null" || localStorage.getItem(highscore_storage_name) == null ?
     0 : localStorage.getItem(highscore_storage_name)
let score_el = document.getElementById("score")
let highScore_el = document.getElementById("highScore")
let difficulty_el = document.querySelector(".difficulty")
let multiplier;
highScore_el.textContent = `HIGH SCORE: ${highScore}`;



let head = {x: 40, y: 80}
let apple = {x: 720, y: 340}

let body = [head];
let current_direction = "";
let updateCanvasSpeed = 60;
// Set display size (vw/vh).
const sizeWidth = 1440
const sizeHeight = 700


//Setting the canvas site and width to be responsive 
canvas.width = sizeWidth;
canvas.height = sizeHeight;
canvas.style.width = sizeWidth + "px";
canvas.style.height = sizeHeight + "px";

ctx.fillStyle = "red"
ctx.fillRect(apple['x'], apple['y'], 20, 20)
ctx.fillStyle = "green";
ctx.fillRect(head['x'], head['y'], 20, 20)




switch (difficulty_param) {
    case 'easy':
        multiplier = 4
        difficulty_el.textContent = 'EASY';
        difficulty_el.classList.toggle("easy")
        break;
    case 'medium':
        multiplier = 8;
        difficulty_el.textContent = 'MEDIUM';
        difficulty_el.classList.toggle("medium")
        break;
    case 'hard':
        multiplier = 12;
        difficulty_el.textContent = 'HARD';
        difficulty_el.classList.toggle("hard")
        break;
    default:
        multiplier = 4;
        difficulty_el.textContent = 'EASY';
        difficulty_el.classList.toggle("easy")
        break;        
}