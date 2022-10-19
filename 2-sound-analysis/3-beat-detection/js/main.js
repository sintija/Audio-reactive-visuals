let audio, fft, peakDetect, bgColor = 0

// FFT analysis resolution.
// Must be a power of two between 16 and 1024.
const bins = 64

// Frequency ranges.

// bass = [20, 140]
// lowMid = [140, 400]
// mid = [400, 2600]
// highMid = [2600, 5200]
// treble = [5200, 14000]

function preload() {
  audio = loadSound('../../../audio/03.mp3')
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight)
  canvas.mouseClicked(togglePlay)

  fft = new p5.FFT()

  peakDetect = new p5.PeakDetect(140, 400, 0.8)
  peakDetect.onPeak(peakDetected)
}

function draw() {
  background(bgColor)

  fft.analyze(bins)

  // The PeakDetect object, needs to be updated, 
  // after the fft.analyze() method. 
  peakDetect.update(fft)
}

function peakDetected() {
  console.log('Peak Detected')

  // Set a random color on all 3 RGB channels.
  bgColor = color(random(255), random(255), random(255))
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
