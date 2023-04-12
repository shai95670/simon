let simonPicks = [];
let playerPicks = [];

const colorSoundsUrls = {
  red: "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
  green: "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
  blue: "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
  yellow: "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3",
};
const startButton = document.querySelector('#startButton');
const gameOverPharase = document.querySelector('#game-over-phrase');
const colors = ['red', 'green', 'blue', 'yellow'];

const isPickMatch = (color) => {
  const currentPlayerPickIndex = playerPicks.length - 1;
  return simonPicks.at(currentPlayerPickIndex) === color ? true : false; 
};

const createBlurEffect = (color) => {
  const simonBox = document.querySelector(`#${color}-box`);
  simonBox.classList.toggle('blur');
  setTimeout(() => { simonBox.classList.toggle('blur') }, 600);
};

const playerClickedColor = (color) => {
  playerPicks.push(color);
  if (isPickMatch(color)) {
    const audioPlayer = new Audio();
    audioPlayer.src = colorSoundsUrls[color];
    audioPlayer.play();
    createBlurEffect(color);
    if (playerPicks.length === simonPicks.length) {
      playerPicks = [];
      setTimeout(() => { playSimonTurn() }, 2000);
    };
  } else {
    simonPicks = [];
    playerPicks = [];
    gameOverPharase.classList.remove('hide');
    startButton.classList.remove('hide');
  };
}

const toggleDisableSimonBoxes = () => {
  const simonBoxes = document.querySelectorAll(`.box`);
  simonBoxes.forEach(simonBox => simonBox.disabled = !simonBox.disabled);
};

const playSimonColorAudioSequence = (simonPicks, colorSoundsUrls) => {
  const audioPlayer = new Audio();  

  const playNextSound = () => {
    const currentColor = simonPicks[colorIndex++];
    audioPlayer.src = colorSoundsUrls[currentColor];
    audioPlayer.currentTime = 0;
    playSound();
    createBlurEffect(currentColor);
  };

  const playSound = () => {
    audioPlayer.play();
  };

  let colorIndex = 0;
  if (simonPicks.length) { 
    playNextSound();

    audioPlayer.addEventListener('ended', () => {
      if (colorIndex < simonPicks.length) {
        playNextSound();
      };
    });
  }
};

const playSimonTurn = () => {
  toggleDisableSimonBoxes();
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  simonPicks.push(randomColor);
  playSimonColorAudioSequence(simonPicks, colorSoundsUrls);
  setTimeout(() => { toggleDisableSimonBoxes(); }, 1000 * simonPicks.length)
};

const startGame = () => {
  startButton.classList.add('hide');
  gameOverPharase.classList.add('hide');
  playSimonTurn();
};
