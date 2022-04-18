const boxes = Array.from(document.getElementsByClassName("box")),
restartBtn = document.getElementById("restartBtn"),
playText = document.getElementById("playText"),
spaces = [null, null, null, null, null, null, null, null, null],
O_TEXT = "O", X_TEXT = "X";
let currentPlayer = O_TEXT;

const drawBoard = () => {
  boxes.forEach((box, index) => {
    let styleString = "";
    if (index < 3) {
      styleString += `border-bottom: 3px solid; color: black;`;
    }
    if (index % 3 === 0) {
      styleString += `border-right: 3px solid; color: black;`;
    }
    if (index % 3 === 2) {
      styleString += `border-left: 3px solid; color: black;`;
    }
    if (index > 5) {
      styleString += `border-top: 3px solid; color: black`;
    }
    box.style = styleString;
    box.addEventListener("click", boxClicked);
  });
};

function boxClicked(e) {
  const id = e.target.id;
  let  namePlayer1 = document.getElementById("namePlayer1").value, namePlayer2 = document.getElementById("namePlayer2").value;
  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;
    if (hasPlayerWon(currentPlayer)) {
      playText.style.color = "red";
      if (currentPlayer == "O") {
        playText.innerHTML = namePlayer1 + " with " + currentPlayer + " - WINS!" ;
      } else {
        playText.innerHTML = namePlayer2 + " with " + currentPlayer + " - WINS!" ;
      }
      return;
    }
    currentPlayer = currentPlayer === O_TEXT ? X_TEXT : O_TEXT;
  }
}

const hasPlayerWon = (player) => {
  //from top left, check across, down, and diagonal
  if (spaces[0] === player) {
    if (spaces[1] === player && spaces[2] === player) {
      return true;
    }
    if (spaces[3] === player && spaces[6] === player) {
      return true;
    }
    if (spaces[4] === player && spaces[8] === player) {
      return true;
    }
  }
  //from bottom check up and across
  if (spaces[8] === player) {
    if (spaces[2] === player && spaces[5] === player) {
      return true;
    }
    if (spaces[7] === player && spaces[6] === player) {
      return true;
    }
  }
  //from middle, check middle vertical, middle horizontal and diagonal
  if (spaces[4] === player) {
    if (spaces[3] === player && spaces[5] === player) {
      return true;
    }
    if (spaces[1] === player && spaces[7] === player) {
      return true;
    }
    if (spaces[6] === player && spaces[2] === player) {
      return true;
    }
  }
};

restartBtn.addEventListener("click", () => {
  spaces.forEach((space, index) => {
    spaces[index] = null;
  });
  boxes.forEach((box) => {
    box.innerText = "";
  });
  playText.style.color = "green";
  playText.innerHTML = `Let's Play!`;
  currentPlayer = O_TEXT;
});

drawBoard();