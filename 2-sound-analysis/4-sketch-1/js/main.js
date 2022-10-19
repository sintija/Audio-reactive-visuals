const bins = 16
let 
bgColor = 0, 
waveAmp = 3, 
amplitude, fft, beatDetect, beatDetectHat, 
binColor, binWidth, 
spectrum, volume, progress, 
playButton, lines

function preload() {
  audio = loadSound('../../../audio/03.mp3')
}

function setup() {
	createCanvas(windowWidth, windowHeight)

  // Sound analysis tools
	fft = new p5.FFT(0.5, bins)
	amplitude = new p5.Amplitude()

  // Peak detection
  beatDetect = new p5.PeakDetect(0, 20000, 0.035)
	beatDetect.onPeak(triggerBeat)

  beatDetectHat = new p5.PeakDetect(5200, 14000, 0.6)
	beatDetectHat.onPeak(triggerBeatHat)  

  binWidth = width / bins  
  binColor = color(random(100))


  // Using the DOM library of p5.
	button = createButton('Play / Pause')
	button.mousePressed(toggleSound)
	button.addClass('play-button')  
}

function draw() {
	background(bgColor)

  // Track's progress from 0 to 255
  progress = map(audio.currentTime(), 0, audio.duration(), 255, 0)

	// Start FFT
	spectrum = fft.analyze()
	beatDetect.update(fft)
  beatDetectHat.update(fft)
	
	// Volume Control.
	const level = amplitude.getLevel()
  volume = map(level, 0, 0.2, 0, windowHeight / 2)

  // Frequency Spectrum
  if (audio.currentTime() > 8.6 && audio.currentTime() < 45) {
    drawFFT()
  } 

  // Volume Levels
  if (audio.currentTime() > 45) {
    drawRects()
  } 

  // Mid Frequencies
  if (audio.currentTime() > 26) {
    drawCircle()
  }

  // Waveform
  if (audio.currentTime() < 45) {
    drawWaveform()    
  }   
}

function drawWaveform () {
  const waveform = fft.waveform()
	push()
		noFill()
		stroke('cyan')
		beginShape()
      for (let i = 0; i < waveform.length; i++) {
        const x = map(i, 0, waveform.length, 0, width + 200)
        const y = map(waveform[i], -0.2, 0.2, 0, height)
        vertex(x, y)
      }
		endShape()
	pop()    
}

function drawFFT () {
  noStroke()
  for (let i = 0; i < spectrum.length; i++) {
    let y = map(spectrum[i], 0, 255,height, 0)
    push()
      stroke(0)
      strokeWeight(5)
      fill(binColor)
      rect(i * binWidth, y, binWidth, height - y)
    pop()
  }
}

function drawRects () {
  const mapMouse = {
		x: map(mouseX, 0, windowWidth, 2, 6),
		y: map(mouseY, 0, windowHeight, 2, 6)
	}

	for (let i = 0; i <= windowWidth; i += windowWidth / mapMouse.x) {
		for (let j = 0; j <= windowHeight; j += windowHeight / mapMouse.y) {
			push()
        noStroke()
        fill(random(progress), random(progress), random(progress))
				// rect(i, j, windowWidth, volume)
        rect(i, j, windowWidth / 2, random(volume))
			pop()
		}
	}
}

function drawCircle() {
  const mid = fft.getEnergy('highMid')	
  // console.log(mid)
  const mapMid = map(mid, 100, 255, 0, windowHeight / 3)

	push()
		translate(windowWidth / 2, windowHeight / 2)
    // fill(255)
		fill(random(255))
		circle(0, 0, mapMid)
	pop()
}

function triggerBeat() {
	if (audio.currentTime() > 45) {
		bgColor = color(random(255), random(255), random(255))
	}
}

function triggerBeatHat () {
  binColor = color(random(255), random(255), random(255), random(255))
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}

function toggleSound() {
  if (audio.isPlaying()) {
    audio.pause()
  } else {
    audio.play()
  }
}
