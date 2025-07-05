export function speakText(text: string) {
  if (!('speechSynthesis' in window)) {
    alert('Sorry, your browser does not support text-to-speech.');
    return;
  }
  window.speechSynthesis.cancel(); // Stop any ongoing speech
  const utterance = new window.SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.lang = 'en-US';
  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

export function speakPageSummary({
  page,
  planetName,
  mood,
  affirmation,
  extra
}: {
  page: string;
  planetName?: string;
  mood?: string;
  affirmation?: string;
  extra?: string;
}) {
  if (!('speechSynthesis' in window)) {
    alert('Sorry, your browser does not support text-to-speech.');
    return;
  }
  window.speechSynthesis.cancel();
  let summary = `You are on the ${page} page.`;
  if (planetName) summary += ` The selected planet is ${planetName}.`;
  if (mood) summary += ` The mood is: ${mood}.`;
  if (affirmation) summary += ` Affirmation: ${affirmation}.`;
  if (extra) summary += ` ${extra}`;
  const utterance = new window.SpeechSynthesisUtterance(summary);
  utterance.rate = 0.85;
  utterance.pitch = 1;
  utterance.lang = 'en-US';
  window.speechSynthesis.speak(utterance);
} 