console.clear()
// Amplitude how loud the sound is 
let audio, amp, fft
const bins = 16

function preload() {
 
  audio = loadSound('../../../audio/01.mp3')
  console.log(audio)
}

function setup() {
  // Creating a new amplitude object
  createCanvas(windowWidth, windowHeight)
  rectMode(CENTER)

  amp = new p5.Amplitude()
  audio.setVolume(0.1)
  //audio.play();

 fft = new p5.FFT(0, bins)

 
}

function draw() {
  background(0)
  stroke(255)
  //translate(0, height/2)

 // console.log(amp.getLevel())

  const volume = amp.getLevel();

  // const mapW = map(volume, 0, 0.1, 0, 500)
  //const mapH = map (volume, 0, 0.1, 0, 500)
  //rect(0, 0, mapW, mapH)

  // const waveform = audio.getPeaks()

  // for(let i = 0; i < waveform.length; i++) {
  //   line(i, waveform[i] *100, i, waveform[i] * -10 )
  // }

  const waveform = fft.waveform()

  for (let i = 0; i < waveform.length;  i ++) {
    const x = map(i,0,waveform.length, 0,width)
    const y =  map(waveform[i], -1, 1, 0, height)
    point(x,y)

  }



}


