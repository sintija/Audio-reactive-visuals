let audio, amplitude, fft, myShader, img

function preload() {
  audio = loadSound('../../../audio/01.mp3')
	myShader = loadShader('shaders/vertex.vert', 'shaders/fragment.frag')
  img = loadImage('images/01.jpg')
}


function setup() {
  const canvas = createCanvas(windowWidth, windowHeight, WEBGL)
  canvas.mouseClicked(togglePlay)

	fft = new p5.FFT()
	amplitude = new p5.Amplitude()

	audio.loop()

	shader(myShader)

	myShader.setUniform('uResolution', [windowWidth, windowHeight])
	myShader.setUniform('uTexture', img)
	myShader.setUniform('uTextureResolution', [img.width, img.height])
}

function draw() {
	background(0)

	// Start FFT
	fft.analyze() // 0 -> 255


	const volume = amplitude.getLevel()
  let freq = fft.getCentroid();
  freq *= 0.001

  const mapA = map(volume, 0, 1, 0, 0.05)
  const mapF = map(freq, 0, 1, 0, 10)

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
  