let audio, fft, binWidth, peakDetect
let bgColor = 0

// FFT analysis resolution.
// Must be a power of two between 16 and 1024.
const bins = 64


//Frequency ranges 

// this.bass = [20, 140]
// this.lowMid = [140, 400]
// this.mid = [400, 2600]
// this.highMid = [2600, 5200]
// this.treble = [5200, 14000]


function preload() {
  audio = loadSound('../../../audio/02.mp3')
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight)
  canvas.mouseClicked(togglePlay)

  fft = new p5.FFT()

 

  peakDetect = new p5.PeakDetect(140,400,0.7)
  peakDetect.onPeak(peakDetected)

  // The size of each rectangle.
  binWidth = width / bins
}



function draw() {
  background(0)
  noStroke()

  fft.analyze(bins)

  peakDetect.update(fft)


}

//callback function to check whenever the beat is detected 
function peakDetected() {
  //console.log('Peak Detected')
  bgColor  = color(random(255), random(255), random(255))
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
