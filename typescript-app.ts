const myname: string = "Annika";

console.log(myname);

const startGame = (): void => {

    const userScoreBoard: HTMLElement = document.getElementById('userScoreBoard');
    const compScoreBoard: HTMLElement = document.getElementById('compScoreBoard');
    const buttons = document.querySelectorAll('.playerChoice');
    const compButtons = document.querySelectorAll('.compChoice');
    const winnerMessage: HTMLElement = document.getElementById('winnerMessage');
    const restart: HTMLElement = document.getElementById('restart');
    const tie: string = "It's a tie!";
    const user: string = "User wins";
    const comp: string = "Computer wins";
    let userScore: number = 0;
    let compScore: number = 0;
    const choiceMatrix: string[][] = [
        [tie, user, comp],
        [comp, tie, user],
        [user, comp, tie]
    ];

    const createEventListeners = (clickButton: HTMLElement):void => {
        clickButton.onmousedown = () => {
            clickButton.style.backgroundColor = 'green';
            clickButton.style.color = 'lightgreen';
        }
        clickButton.onmouseup = () => {
            clickButton.style.backgroundColor = 'grey';
            clickButton.style.color = 'white';
        }
    }

    const getComputerChoice = (): number => {
        const options = ['rock', 'paper', 'scissors'];
        const index = Math.floor(Math.random() * options.length);
        compButtons[index].style.backgroundColor = 'blue';
        compButtons[index].style.color = 'lightsteelblue';
        return index;
    }

    const determineWinner = (playerMove: number, computerMove:number):string => {
        const winner = choiceMatrix[computerMove][playerMove];
        return winner;
    }

    const resetCompButtons = ():void => {
        for (let i = 0; i < compButtons.length; i++){
            compButtons[i].style.backgroundColor = 'grey';
            compButtons[i].style.color = 'white';
        }
    }

    const updateScoreboard = (winningPlayer: string):void => {
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
        userScoreBoard.innerText = String(userScore);
        compScoreBoard.innerText = String(compScore);
    }
    
    const resetGame = ():void => {
        userScore = 0;
        compScore = 0;
        userScoreBoard.innerText = String(0);
        compScoreBoard.innerText = String(0);
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

    restart.onclick = ():void => {
        resetGame();
    }
}

window.onload = startGame;