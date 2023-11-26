const textArea = document.querySelector('textarea')
const playButton = document.querySelector('button')
const pitchBar = document.querySelector('input')
const duckFigure = document.querySelector('figure')

// Get the text from the text area that user entered
// Make the duck

function onButtonClick() {
    if (textArea.value.length > 0){
        speak()
    }
}

function speak() {
    const text = textArea.value
    const pitch = pitchBar.value

    const utterance = new SpeechSynthesisUtterance(text)

    utterance.pitch = pitch

    speechSynthesis.speak(utterance)

    utterance.addEventListener('start', function (){
        playButton.disabled = true
        textArea.disabled = true
        pitchBar.disabled = true
        duckFigure.classList.add('talking')
    })

    utterance.addEventListener('end', function(){
        playButton.disabled = false
        textArea.disabled = false
        pitchBar.disabled = false
        duckFigure.classList.remove('talking')
    })

}

playButton.addEventListener('click', onButtonClick)