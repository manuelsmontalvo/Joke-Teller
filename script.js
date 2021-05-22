const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/Enable Button
const toggleButton = () => {
  button.disabled = !button.disabled;
};

// Passing Joke to VoiceRSS API
const tellMe = (joke) => {
  VoiceRSS.speech({
    key: "c34fe88bcd344271b3213bc12810f0c1",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
  console.log(joke);
};

// Get Jokes from Joke API
const getJokes = async () => {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    tellMe(joke);
    toggleButton();
  } catch (error) {
    console.log("Error:", error);
  }
};

// Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);

getJokes();
