/**
 * Experimental script to use Speech to Text browsers built-in feature
 */

const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const transcriptP = document.getElementById('transcript');

let recognition;
let isRecording = false;
let currentText = '';

function startRecording() {
    recognition = new webkitSpeechRecognition();
    if (recognition) {
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.onresult = handleResult;
        recognition.start();
        isRecording = true;

        startButton.disabled = true;
        stopButton.disabled = false;
    } else {
        console.warn('Failed to start recording', recognition);
    }
}

function stopRecording() {
    recognition.stop();
    isRecording = false;

    startButton.disabled = false;
    stopButton.disabled = true;
}

function printTranscripts(results) {
    let transcript = '';
    for (let key in results) {
        if (key !== 'length' && key !== 'item') {
            transcript = transcript + results[key][0].transcript
        }
    }
    transcriptP.textContent = transcript;
    currentText = transcript;
}

function handleResult(event) {
    if (event.results) {
        printTranscripts(event.results);
    } else {
        console.warn('The event is not valid', event, 'results', event.results);
    }
}

startButton.addEventListener('click', startRecording);
stopButton.addEventListener('click', stopRecording);

