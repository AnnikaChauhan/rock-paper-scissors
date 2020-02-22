const gameStartUp = () => {

    const userScoreBoard = document.getElementById('userScoreBoard');
    const compScoreBoard = document.getElementById('compScoreBoard');
    const buttons = document.querySelectorAll('.playerChoice');
    const compButtons = document.querySelectorAll('.compChoice');
    const winnerMessage = document.getElementById('winnerMessage');
    const restart = document.getElementById('restart');
    const tie = "It's a tie!";
    const user = "User wins";
    const comp = "Computer wins";
    let userScore = 0;
    let compScore = 0;
    const choiceMatrix = [
        [tie, user, comp],
        [comp, tie, user],
        [user, comp, tie]
    ];

    const createEventListeners = (clickButton) => {
        clickButton.onmousedown = () => {
            clickButton.style.backgroundColor = 'green';
            clickButton.style.color = 'lightgreen';
        }
        clickButton.onmouseup = () => {
            clickButton.style.backgroundColor = 'grey';
            clickButton.style.color = 'white';
        }
    }

    const getComputerChoice = () => {
        const options = ['rock', 'paper', 'scissors'];
        const index = Math.floor(Math.random() * options.length);
        compButtons[index].style.backgroundColor = 'blue';
        compButtons[index].style.color = 'lightsteelblue';
        return index;
    }

    const determineWinner = (playerMove, computerMove) => {
        const winner = choiceMatrix[computerMove][playerMove];
        return winner;
    }

    const resetCompButtons = () => {
        for (let i = 0; i < compButtons.length; i++){
            compButtons[i].style.backgroundColor = 'grey';
            compButtons[i].style.color = 'white';
        }
    }

    const updateScoreboard = (winningPlayer) => {
        if (winningPlayer === user) {
            userScore += 1;
            winnerMessage.style.color = 'green';
        } else if (winningPlayer === comp) {
            compScore += 1;
            winnerMessage.style.color = 'red';
        } else if (winningPlayer === tie) {
            compScore += 0.5;
            userScore += 0.5;
            winnerMessage.style.color = 'black';
        }
        userScoreBoard.innerText = userScore;
        compScoreBoard.innerText = compScore;
    }

    const resetGame = () => {
        userScore = 0;
        compScore = 0;
        userScoreBoard.innerText = 0;
        compScoreBoard.innerText = 0;
        winnerMessage.innerText = "";
        resetCompButtons();
    }

    for (let i = 0; i < buttons.length; i++) {
        createEventListeners(buttons[i]);
        buttons[i].onclick = () => {
            resetCompButtons();
            let playerChoice = buttons[i].value;
            let compChoice = getComputerChoice();
            let winnerDetermined = determineWinner(playerChoice, compChoice);
            winnerMessage.innerText = winnerDetermined;

            updateScoreboard(winnerDetermined);
        }
    }

    restart.onclick = () => {
        resetGame();
    }
}

window.onload = gameStartUp;