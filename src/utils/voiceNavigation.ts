let recognition: any = null;

export function startVoiceNavigation(onCommand: (cmd: string) => void, onListening?: (listening: boolean) => void) {
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert('Sorry, your browser does not support voice recognition.');
    return;
  }
  recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;
    onCommand(transcript);
    if (onListening) onListening(false);
  };
  recognition.onend = () => {
    if (onListening) onListening(false);
  };
  recognition.onerror = () => {
    if (onListening) onListening(false);
  };
  recognition.start();
  if (onListening) onListening(true);
}

export function stopVoiceNavigation() {
  if (recognition) {
    recognition.stop();
  }
} 