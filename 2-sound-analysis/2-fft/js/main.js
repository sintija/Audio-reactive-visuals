let audio, fft, binWidth

// FFT analysis resolution.
// Must be a power of two between 16 and 1024.
const bins = 64

function preload() {
  audio = loadSound('../../../audio/01.mp3')
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight)
  canvas.mouseClicked(togglePlay)

  fft = new p5.FFT(0, bins)

  // The size of each rectangle.
  binWidth = width / bins
}

function draw() {
  background(0)
  noStroke()

  const spectrum = fft.analyze()

  for (let i = 0; i < spectrum.length; i++) {
    let y = map(spectrum[i], 0, 255, height, 0)
    rect(i * binWidth, y, binWidth, height - y)
  }
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
