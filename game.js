const roundToNearest20 = x => Math.round(x/20)*20
function clearSnake(part) {
    ctx.clearRect(part['x'], part['y'], 20, 20);
}

function redrawSnake(part) {
    ctx.fillRect(part['x'], part['y'], 20, 20);
}

function moveUp() {
    let new_head = {x: head['x'], y: head['y'] - 20};
    withinBoundaries(new_head);
    for (part of body) {
      
        let temp = {...part};
        clearSnake(part);
        part['x'] = new_head['x'];
        part['y'] = new_head['y'];
        redrawSnake(part);
        new_head = temp;
    }
    collidedWithItself()
    collidedwithApple()
}

function moveDown() {
    let new_head = {x: head['x'], y: head['y'] + 20};

    withinBoundaries(new_head);
    for (part of body) {
 
        let temp = {...part}
        clearSnake(part);
        part['x'] = new_head['x'];
        part['y'] = new_head['y'];
        redrawSnake(part);
        new_head = temp;
    }
    collidedWithItself()
    collidedwithApple()
}

function moveLeft() {
    let new_head = {x: head['x'] - 20, y: head['y']};

    withinBoundaries(new_head);
    for (part of body) {
     
        let temp = {...part};
        clearSnake(part);
        part['x'] = new_head['x'];
        part['y'] = new_head['y'];
        redrawSnake(part);
        new_head = temp;
    }
    collidedWithItself()
    collidedwithApple()
}

function moveRight() {
    let new_head = {x: head['x'] + 20, y: head['y']};
    
    withinBoundaries(new_head);
    for (part of body) {
        let temp = {...part};
        clearSnake(part);
        part['x'] = new_head['x'];
        part['y'] = new_head['y'];
        redrawSnake(part);
        new_head = temp;
    }
    collidedWithItself()
    collidedwithApple()
}

function checkKeyPress(e) {
    switch (e.keyCode) {
        case 38: //Move up
            if (current_direction == "UP" || current_direction == "DOWN")
                break;
            moveUp();
            window.clearInterval(interval);
            current_direction = "UP";
            interval = setInterval(moveUp,  updateCanvasSpeed);
            break;
        case 40: //Move down
            if (current_direction == "DOWN" || current_direction == "UP")
                break;
            moveDown();    
            window.clearInterval(interval);
            current_direction = "DOWN";
            interval = setInterval(moveDown, updateCanvasSpeed);
            break;
        case 37: //Move left
            if (current_direction == "LEFT" || current_direction == "RIGHT")
                break;
            moveLeft();
            window.clearInterval(interval);
            current_direction = "LEFT";
            interval = setInterval(moveLeft, updateCanvasSpeed);
            break;
        case 39: //Move right
            if (current_direction == "RIGHT" || current_direction == "LEFT")
                break;
            moveRight();
            window.clearInterval(interval);
            current_direction = "RIGHT";
            interval = setInterval(moveRight, updateCanvasSpeed);
            break;       
        default:
            break;
    }
}


function withinBoundaries(new_head) {
    if (new_head['x'] < 0 || new_head['x'] > 1420) {
        loseAlert();
    }
    else if (new_head['y'] < 0 || new_head['y'] > 680) {
        loseAlert();
    }
}

function spawnApple() {
    new_x = roundToNearest20(getRndInteger(0, 1420))
    new_y = roundToNearest20(getRndInteger(0, 680))

    for (part of body) {
        if (part['x'] == new_x && part['y'] == new_y) //If it spawns the apple somewhere on the body then respawn apple again
            spawnApple();
    }

    ctx.clearRect(apple['x'], apple['y'], 20, 20)
    apple['x'] = new_x;
    apple['y'] = new_y;
    ctx.fillStyle = "red";
    ctx.fillRect(apple['x'], apple['y'], 20, 20)
    ctx.fillStyle = "green";
}

function collidedwithApple() {  
    if (head['x'] == apple['x'] && head['y'] == apple['y']) {
        updateScore();
        updateHighScore()
        addBodyPart();
        increaseSpeed();
        spawnApple();        
    }  
}

function updateScore() {
    score += 1;
    score_el.textContent = `SCORE: ${score}`;
}

function increaseSpeed() {
    updateCanvasSpeed = 60 - Math.round(Math.sqrt(score) * multiplier);
}

function addBodyPart() {
    let tail = body[body.length - 1]
    
    switch (current_direction) {
        case "UP":
            new_tail = {x: tail['x'], y: tail['y'] - 20};
            break;
        case "DOWN": 
            new_tail = {x: tail['x'], y: tail['y'] + 20};
            break;
        case "LEFT":
            new_tail = {x: tail['x'] - 20, y: tail['y']}; 
            break;
        case "RIGHT": 
            new_tail = {x: tail['x'] + 20, y: tail['y']}; 
            break;            
    }
    body.push(new_tail);
}

function collidedWithItself() {
    for (part of body.slice(1)) 
        if (head['x'] == part['x'] && head['y'] == part['y'])
            loseAlert();
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }


function loseAlert() {
    localStorage.setItem(highscore_storage_name, highScore)
    window.clearInterval(interval);
    window.removeEventListener("keydown", checkKeyPress);
    displayLoseScreen();
}

function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        highScore_el.textContent = `HIGH SCORE: ${highScore}`;
    }
}
window.addEventListener("keydown", checkKeyPress);
interval = setInterval(function () {}, updateCanvasSpeed);
