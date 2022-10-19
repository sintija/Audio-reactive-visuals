console.clear()

let audio
let amp
let fft

function preload() {
  audio = loadSound('../../../audio/01.mp3')
}

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight)
  canvas.mouseClicked(togglePlay)

  rectMode(CENTER)

  amp = new p5.Amplitude()
  fft = new p5.FFT()

  audio.play()
}

function draw() {
  background(0)

  // Comment in/out any of the following blocks of code.

  // 1.
  // Draw a rectangle and size it, according to the amplitude values of the track.
  fill(255)
  noStroke()
  translate(width / 2, height / 2)
  const volume = amp.getLevel()
  const rectSize = map(volume, 0, 0.5, 0, 200)
  rect(0, 0, rectSize, rectSize)

  // 2.
  // Static waveform.
  // stroke(255)
  // translate(0, height / 2)
  // const waveform = audio.getPeaks()
  // for(let i = 0; i < waveform.length; i++){
  //   line(i, waveform[i] * 100,  i, waveform[i] * -100)
  // }

  // 3.
  // FFT waveform
  // const waveform = fft.waveform()
  // noFill()
  // strokeWeight(3)
  // stroke(255)

  // for (let i = 0; i < waveform.length; i++) {
  //   const x = map(i, 0, waveform.length, 0, width)
  //   const y = map(waveform[i], -1, 1, 0, height)
  //   point(x, y)
  // }
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
