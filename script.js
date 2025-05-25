import samples from './samples.js'

const display = document.getElementById('display')
const drumBtns = document.querySelectorAll('.drum-pad')

const colors = ['#7678ed', '#f7b801', '#f18701', '#f35b04']

const getSampleName = (id) => {
  const sample = samples.find((sample) => sample.id === id)
  if (sample) {
    display.innerText = sample.name
  }
}

const playSample = (id) => {
  const btn = document.getElementById(id)
  const audio = btn.querySelector('audio')
  if (audio) {
    audio.currentTime = 0
    audio.play()
  } else {
    console.log(`No audio element found in button with id "${id}"`)
  }
}

drumBtns.forEach((btn) => {
  const sample = samples.find((sample) => sample.id === btn.id)
  btn.innerHTML = `
  ${btn.id}
  <audio class='clip' id='${sample.id}' src='${sample.src}'></audio>`

  btn.addEventListener('click', () => {
    getSampleName(btn.id)
    playSample(btn.id)
  })

  console.log(btn)
})

document.addEventListener('keydown', (event) => {
  const key = event.key.toUpperCase()
  const sample = samples.find((sample) => sample.id === key)

  const btn = document.getElementById(key)
  if (sample) {
    getSampleName(key)
    playSample(key)

    const random = Math.floor(Math.random() * colors.length)
    const randomColor = colors[random]

    btn.style.color = randomColor
    btn.style.borderColor = randomColor
    btn.style.opacity = '0.9'
    btn.style.boxShadow = `0 0 10px 0 ${randomColor}`
    btn.style.transform = 'translate(3px, 3px)'

    setTimeout(() => {
      btn.style.color = '#2a1f3e'
      btn.style.borderColor = '#2a1f3e'
    }, 200)

    setTimeout(() => {
      btn.style.boxShadow = 'none'
      btn.removeAttribute('style')
    }, 300)
  } else {
    console.log(`No sample found for key: ${key}`)
  }
})
