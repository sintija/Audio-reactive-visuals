let  amplitude, fft, myShader, img, dMap, capture, mic

function preload() {
  // audio = loadSound('../../../audio/01.mp3')
	myShader = loadShader('shaders/vertex.vert', 'shaders/fragment.frag')
  img = loadImage('images/01.jpg')
  dMAp = loadImage('images/displacement.jpg')
}


function setup() {
  const canvas = createCanvas(windowWidth, windowHeight, WEBGL)
  canvas.mousePressed(userStartAudio)

  capture = createCapture(VIDEO)

  capture.hide()

  mic = new p5.AudioIn()
  mic.start()

	fft = new p5.FFT()
	amplitude = new p5.Amplitude()


  amplitude.setInput(mic)
  fft.setInput(mic)

	// audio.loop()

	shader(myShader)

  myShader.setUniform('uTexture', capture)
  myShader.setUniform('uDmap', img)
  myShader.setUniform('uResolution', [width, height])
  myShader.setUniform('uTextureResolution', [img.width, img.height ])


}

function draw() {
	background(0)

	// Start FFT
	fft.analyze() // 0 -> 255


	const volume = amplitude.getLevel()

  console.log(volume)




  let freq = fft.getCentroid();
  freq *= 0.001

  const mapA = map(volume, 0, 1, 0, 0.9)
  const mapF = map(freq, 0, 1, 0, 0.2)

  myShader.setUniform('uTime', frameCount)

  myShader.setUniform('uFrequency', mapF)
	myShader.setUniform('uAmp', mapA)

  rect(0, 0 , width, height)
}


function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
  myShader.setUniform('uResolution', [windowWidth, windowHeight])
}
  