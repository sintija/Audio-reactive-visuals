let myShaders, audio, amp, fft, beatDetect, bgColor = 0

let words = ['melt','fear','bounce','rabid','fuzzy','gratis','sense','madly','yellow','crazy','ahead','super','classy','craven','sassy','roomy','sedate','gaudy','moldy','groovy']

const texts = [...document.querySelectorAll('.text span')]

function preload() {
  myShaders = loadShader('shaders/vertex.vert', 'shaders/fragment.frag')
  audio = loadSound('../../../audio/02.mp3')
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL)
    
  amp = new p5.Amplitude()
  fft = new p5.FFT()
  
	beatDetect = new p5.PeakDetect(20, 20000, 0.2)
	beatDetect.onPeak(triggerBeat)

  shader(myShaders)
}

function draw() {
	background(bgColor)

  fft.analyze()
  beatDetect.update(fft)

  const volume = amp.getLevel() // 0 - 1
  
  // Spectral Centroid Frequency of the spectral centroid in Hz.
  let freq = fft.getCentroid() 
  freq *= 0.001

  const mapCentroid = map(freq, 0, 5, -1, 1)
  const mapFreq = map(fft.getEnergy('mid'), 0, 100, 0, 0.1)
  
  const rotation = map(audio.currentTime(), 0, audio.duration(), 0, 0.001)

  
  myShaders.setUniform('uAmplitude', mapCentroid)
  myShaders.setUniform('uFrequency', mapFreq)

  myShaders.setUniform('uTime', frameCount * 0.001)

  rotateY(frameCount * rotation)

  // Maybe try to control the size of the sphere with the volume? 
  sphere(width / 8, 50, 50)
}

function triggerBeat() {
	bgColor = color(random(255), random(255), random(255))

	texts.forEach((el, i) => {
		setTimeout(() => {
			el.innerHTML = random(words)
		}, random(200) * i)
	})
}

function mousePressed() {
  if (mouseX > 0 && mouseX > width - 100 && mouseY > 0 && mouseY < 100) {
    let fs = fullscreen()
    fullscreen(!fs)
  } else {
	  if (audio.isPlaying()) {
		  audio.pause()
	  } else {
		  audio.play()
	  }	  
  }
}


function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}
