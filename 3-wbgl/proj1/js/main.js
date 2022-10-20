let myShaders, audio, amp, fft

function preload() {

  myShaders = loadShader('shaders/vertex.vert', 'shaders/fragment.frag')

  audio = loadSound('../../../audio/0.mp3')
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight, WEBGL)
  canvas.mouseClicked(togglePlay)
  
  shader(myShaders)
  
  amp = new p5.Amplitude()
  fft = new p5.FFT()
}

function draw() {
  background(0)

  fft.analyze()
  
  const volume = amp.getLevel() // 0 - 1
  
  // Spectral Centroid Frequency of the spectral centroid in Hz.
  //most prominent frequency of the track
  let freq = fft.getCentroid() 
  freq *= 0.001

  const mapF = map(freq, 0, 1, 0, 25)
  const mapA = map(volume, 0, 100, 0, 100)
  
  myShaders.setUniform('uTime', frameCount)
  
  myShaders.setUniform('uFrequency', mapF)
  myShaders.setUniform('uAmp', mapA)

  sphere(width / 8, 200, 200)
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
