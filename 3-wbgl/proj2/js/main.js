let myShaders, audio, amp, fft

function preload() {
  myShaders = loadShader('shaders/vertex.vert', 'shaders/fragment.frag')
  audio = loadSound('../../../audio/01.mp3')
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight, WEBGL)
  canvas.mouseClicked(togglePlay)
  
  shader(myShaders)
  
  amp = new p5.Amplitude()
  fft = new p5.FFT()
  
  audio.play()
}

function draw() {
  background(0)

  fft.analyze()
  
  const volume = amp.getLevel() // 0 - 1
  
  // Spectral Centroid Frequency of the spectral centroid in Hz.
  let freq = fft.getCentroid() 
  freq *= 0.001

  const mapF = map(freq, 0, 1, 0, 20)
  const mapA = map(volume, 0, 0.2, 0, 0.5)
  
  myShaders.setUniform('uTime', frameCount)
  
  myShaders.setUniform('uFrequency', mapF)
  myShaders.setUniform('uAmp', mapA)

  // sphere(width / 4, 200, 200)
  sphere(width / 7, 200, 200)
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
}
