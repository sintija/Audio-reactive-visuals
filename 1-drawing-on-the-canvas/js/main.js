console.clear()
let posX = 0; 
let posY = 0;



function preload() {
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  rectMode(CENTER)
  
}


function draw() {
  background('black')
  fill('tomato')
  noStroke()

  const mapX = map(mouseX, 0, width, 0, 500)
  const mapY = map(mouseY, 0, height, 0, 500)

  //move the rect in the middle
  translate(width/2, height/2);
  rect(posX, posY, mapX, mapY)
}

function keyPressed () {
  switch(keyCode) {
    case LEFT_ARROW: 
    posX -= 10
    break;

    case RIGHT_ARROW: 
    posX += 10
    break;


    case UP_ARROW: 
    posY -= 10
    break;

    case DOWN_ARROW: 
    posY += 10
    break;

    default:
      break;
  }
}


