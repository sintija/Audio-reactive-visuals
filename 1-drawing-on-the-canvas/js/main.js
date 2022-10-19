console.clear()

let posX = 0, posY = 0

function preload() {
}

function setup() {
  createCanvas(windowWidth, windowHeight)

  rectMode(CENTER)
  
  // strokeWeight(5)
}

function draw() {
  background(0)
  // fill()
  // stroke()
  
  // Translate the drawing origin to the center.
  translate(width / 2, height / 2)
  
  // Map the mouse coordinates to some values 
  // that control the size of the rectangle.
  const mapX = map(mouseX, 0, windowWidth, 0, 500)
  const mapY = map(mouseY, 0, windowHeight, 0, 500)

  // Draw a rectangle and control its position with the keyboard arrows
  // and its size with the mouse.
  rect(posX, posY, mapX, mapY)
}

function keyPressed () {
  switch (keyCode) {
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

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}
