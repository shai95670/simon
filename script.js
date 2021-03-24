let simonPicks = []
let playerPicks = []
let i = 1

const colorSounds = {
  red: 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
  green: 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
  blue: 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
  yellow: 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
}
const colors = Object.keys(colorSounds)

/*
When start is clicked we start the game interval
the game starts to run, the simon goes first
durnig that time the simon boxes are not clickable to the 
player
when the simon is done, the buttons becomev clickable and the player can start his turn
*/

function getElemById(id) {
  return document.getElementById(id);
}

function isPicksMatch() {
  for (let i = 0, l = simonPicks.length; i < l; i++) {
    if (simonPicks[i] !== playerPicks[i]) return false;
  }
  return true;
}

function createOutlineEffect(color) {
  addRemoveOutlineClass(getElemById(`${color}-box`));
  setTimeout(() => {
    addRemoveOutlineClass(getElemById(`${color}-box`), 'remove');
  }, 100);
}

function isSameNumOfPicks() {
  return simonPicks.length === playerPicks.length;
}

function playerClickedColor(color) {
  playerPicks.push(color);
  playAudio(getMp3Url(color));
  createOutlineEffect(color);

  if (isSameNumOfPicks()) {
    if (!isPicksMatch()) {
      setGameOver();
    } else {
      playerPicks = [];
      i = 1;
      isPlayersTurn = false;
      setTimeout(() => {
        playSimonTurn();
      }, 3000);
    };
  };
}

function getRandColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

// disable all simon buttons
function disableEnableButtons(mode = 'disable') {
  colors.forEach((color) => {
    let elem = getElemById(`${color}-box`);
    elem.disabled = mode === 'disable' ? true : false;
  });
}

function addRemoveOutlineClass(elem, mode = 'add') {
  if (mode === 'add') {
    elem.classList.add('out-line');
  } else {
    elem.classList.remove('out-line');
  };
}

function setGameOver() {
  disableEnableButtons('disable');
  console.log('game over');
}

// Side efect - return an audio obj
function playAudio(mp3Url) {
  const audio = new Audio(mp3Url);
  audio.play();
  return audio;
}

function getMp3Url(color) {
  return colorSounds[color];
}

function playSimonTurn() {
  disableEnableButtons();
  simonPicks.push(getRandColor());
  const firstColor = simonPicks[0];
  const audio = playAudio(getMp3Url(firstColor));
  createOutlineEffect(firstColor);

  audio.onended = () => {
    if (i < simonPicks.length) {
      let color = simonPicks[i];
      audio.src = getMp3Url(color);
      audio.play();
      createOutlineEffect(color);
      i++;
    };

    if (i === simonPicks.length) {
      disableEnableButtons('enable');
    };
  };
};
