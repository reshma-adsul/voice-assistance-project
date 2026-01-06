
let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// Speech function
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.pitch = 1;
  utterance.volume = 1;
  utterance.lang = "hi-IN"; // Hindi
  window.speechSynthesis.speak(utterance);
}

// Greeting
function wishMe() {
  const hours = new Date().getHours();
  if (hours < 12) {
    speak("Good Morning Disha");
  } else if (hours < 16) {
    speak("Good Afternoon Disha");
  } else {
    speak("Good Evening Disha");
  }
}

window.addEventListener("load", wishMe);

// Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.interimResults = false;

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  content.innerText = transcript;
  takeCommand(transcript.toLowerCase());
};

recognition.onerror = (event) => {
  console.log("Error: ", event.error);
  voice.style.display = "none";
  btn.style.display = "flex";
};

btn.addEventListener("click", () => {
  recognition.start();
  voice.style.display = "block";
  btn.style.display = "none";
});

// Commands
function takeCommand(message) {
  voice.style.display = "none";
  btn.style.display = "flex";

  if (message.includes("hello") || message.includes("hey")) {
    speak("Hello! What can I help you with?");
  } else if (message.includes("who are you")) {
    speak("I am a virtual assistant, created by Disha");
  } else if (message.includes("open youtube")) {
    speak("Opening YouTube...");
    window.open("https://youtube.com", "_blank");
  } else if (message.includes("open google")) {
    speak("Opening Google...");
    window.open("https://google.com", "_blank");
  } else if (message.includes("open facebook")) {
    speak("Opening Facebook...");
    window.open("https://facebook.com", "_blank");
  } else if (message.includes("open instagram")) {
    speak("Opening Instagram...");
    window.open("https://instagram.com", "_blank");
  } else if (message.includes("time")) {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    speak("Current time is " + time);
  } else if (message.includes("date")) {
    const date = new Date().toLocaleDateString([], { day: "numeric", month: "short", year: "numeric" });
    speak("Today's date is " + date);
  } else {
    speak("Searching for " + message + " on Google...");
    window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
  }
}