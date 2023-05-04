//alert("Olá mundo...")

let textarea = document.querySelector('#textarea');
let voices = document.querySelector('#voices');
let button = document.querySelector('#button');
let clear = document.querySelector('#clear');
let selectedVoice = 0;

window.speechSynthesis.addEventListener('voiceschanged', () => {
    let voicesList = window.speechSynthesis.getVoices();
    for (let i in voicesList) {
        let optionEl = document.createElement('option');
        optionEl.setAttribute('value', i);
        optionEl.innerText = voicesList[i].name;
        voices.appendChild(optionEl);
    }
});

clear.addEventListener('click', () => {
    textarea.value = '';
});

button.addEventListener('click', () => {
    if(textarea.value !== '') {
        let voicesList = window.speechSynthesis.getVoices();
        let ut = new SpeechSynthesisUtterance(textarea.value);
        ut.voice = voicesList[selectedVoice];
        window.speechSynthesis.speak(ut);
    }
});

voices.addEventListener('change', () => {
    selectedVoice = parseInt(voices.value);
});

function updateStatus() {
    if(window.speechSynthesis.speaking) {
        voices.setAttribute('disabled', 'disabled');
        button.setAttribute('disabled', 'disabled');
        clear.setAttribute('disabled', 'disabled');
    } else {
        voices.removeAttribute('disabled');
        button.removeAttribute('disabled');
        clear.removeAttribute('disabled');
    }
}
setInterval(updateStatus, 100);