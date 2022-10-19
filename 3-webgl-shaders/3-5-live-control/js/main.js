let myShaders, audio, amp, fft, beatDetect, bgColor = 0
let shapeRotation = {
  x: 0,
  y: 0,
}

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
  
  
  myShaders.setUniform('uAmplitude', mapCentroid)
  myShaders.setUniform('uFrequency', mapFreq)

  myShaders.setUniform('uTime', frameCount * 0.001)


  shapeRotation.y = map(mouseY, 0, height, 0, 0.01)
  shapeRotation.x = map(mouseX, 0, width, 0, 0.01)

  rotateY(frameCount * shapeRotation.y)
  rotateX(frameCount * shapeRotation.x)


  sphere(width / 8, 50, 50)
}

function triggerBeat() {
  changeBackground()
	changeTexts()
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

function keyPressed () {
	if (keyCode === UP_ARROW) {
    changeBackground()
  } else if (keyCode === DOWN_ARROW) {
    changeTexts()
	} else if (keyCode === 32) {
    // Spacebar
	} else {
	}
}

function changeTexts () {
  texts.forEach((el, i) => {
		setTimeout(() => {
			el.innerHTML = random(words)
		}, random(200) * i)
	})  
}

function changeBackground() {
	bgColor = color(random(255), random(255), random(255))
}

function initMIDI () {
	navigator
	.requestMIDIAccess()
    .then(onMIDISuccess, onMIDIFailure)
}

function onMIDISuccess(midiAccess) {
    const inputs = midiAccess.inputs
	
	inputs.forEach(input => {
		input.onmidimessage = handleMidi
	})
}

function onMIDIFailure(error) {
	console.log(error)
}

function handleMidi (message) {
	let [_, midiKeyID, value] = message.data
	console.log({midiKeyID, value})

	// Pad 1
	if (midiKeyID === 36) {
    changeTexts()
	}

	// Pad 2
	if (midiKeyID === 37) {
    changeBackground()
	}	

	// Knob 2
	if (midiKeyID === 74) {
		const mapKnob = map(value, 0, 127, 0, 0.01)
    shapeRotation.x = mapKnob
	}	

	// Knob 3
	if (midiKeyID === 71) {
		const mapKnob = map(value, 0, 127, 0, 0.01)
    shapeRotation.y = mapKnob
	}	  
}



function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
}
