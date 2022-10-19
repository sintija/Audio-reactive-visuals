let amplitude, fft, myShader, dMap, img, capture, mic

function preload() {
	myShader = loadShader('shaders/vertex.vert', 'shaders/fragment.frag')
  img = loadImage('images/01.jpg')
  // dMap = loadImage('images/dmaps/fibers.jpg')
  dMap = loadImage('images/displacement.jpg')
}


function setup() {
  const canvas = createCanvas(windowWidth, windowHeight, WEBGL)
  canvas.mousePressed(userStartAudio)

	fft = new p5.FFT()
	amplitude = new p5.Amplitude()

  capture = createCapture(VIDEO)
  capture.size(windowWidth, windowHeight)
  capture.hide()

  mic = new p5.AudioIn()
  mic.start()

  amplitude.setInput(mic)
  fft.setInput(mic)

	shader(myShader)

	myShader.setUniform('uResolution', [windowWidth, windowHeight])
	myShader.setUniform('uDmap', dMap)
	myShader.setUniform('uTexture', capture)
	myShader.setUniform('uTextureResolution', [capture.width, capture.height])
}

function draw() {
	background(0)

	// Start FFT
	fft.analyze() // 0 -> 255


	const volume = amplitude.getLevel()
  let freq = fft.getCentroid()
  freq *= 0.001

  const mapA = map(volume, 0, 1, 0, 0.9)
  const mapF = map(freq, 0, 1, 0, 0.3)

  myShader.setUniform('uTime', frameCount)

  myShader.setUniform('uFrequency', mapF)
	myShader.setUniform('uAmp', mapA)

  rect(0, 0 , width, height)
}

function togglePlay() {
  if (audio.isPlaying()) {
    audio.pause()
  } else {
    audio.loop()
  }
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
  myShader.setUniform('uResolution', [windowWidth, windowHeight])
}
  