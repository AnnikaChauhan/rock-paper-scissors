var myname = "Annika";
console.log(myname);
var startGame = function () {
    var userScoreBoard = document.getElementById('userScoreBoard');
    var compScoreBoard = document.getElementById('compScoreBoard');
    var buttons = document.querySelectorAll('.playerChoice');
    var compButtons = document.querySelectorAll('.compChoice');
    var winnerMessage = document.getElementById('winnerMessage');
    var restart = document.getElementById('restart');
    var tie = "It's a tie!";
    var user = "User wins";
    var comp = "Computer wins";
    var userScore = 0;
    var compScore = 0;
    var choiceMatrix = [
        [tie, user, comp],
        [comp, tie, user],
        [user, comp, tie]
    ];
    var createEventListeners = function (clickButton) {
        clickButton.onmousedown = function () {
            clickButton.style.backgroundColor = 'green';
            clickButton.style.color = 'lightgreen';
        };
        clickButton.onmouseup = function () {
            clickButton.style.backgroundColor = 'grey';
            clickButton.style.color = 'white';
        };
    };
    var getComputerChoice = function () {
        var options = ['rock', 'paper', 'scissors'];
        var index = Math.floor(Math.random() * options.length);
        compButtons[index].style.backgroundColor = 'blue';
        compButtons[index].style.color = 'lightsteelblue';
        return index;
    };
    var determineWinner = function (playerMove, computerMove) {
        var winner = choiceMatrix[computerMove][playerMove];
        return winner;
    };
    var resetCompButtons = function () {
        for (var i = 0; i < compButtons.length; i++) {
            compButtons[i].style.backgroundColor = 'grey';
            compButtons[i].style.color = 'white';
        }
    };
    var updateScoreboard = function (winningPlayer) {
        if (winningPlayer === user) {
            userScore += 1;
            winnerMessage.style.color = 'green';
        }
        else if (winningPlayer === comp) {
            compScore += 1;
            winnerMessage.style.color = 'red';
        }
        else if (winningPlayer === tie) {
            compScore += 0.5;
            userScore += 0.5;
            winnerMessage.style.color = 'black';
        }
        userScoreBoard.innerText = String(userScore);
        compScoreBoard.innerText = String(compScore);
    };
    var resetGame = function () {
        userScore = 0;
        compScore = 0;
        userScoreBoard.innerText = String(0);
        compScoreBoard.innerText = String(0);
        winnerMessage.innerText = "";
        resetCompButtons();
    };
    var _loop_1 = function (i) {
        createEventListeners(buttons[i]);
        buttons[i].onclick = function () {
            resetCompButtons();
            var playerChoice = buttons[i].value;
            var compChoice = getComputerChoice();
            var winnerDetermined = determineWinner(playerChoice, compChoice);
            winnerMessage.innerText = winnerDetermined;
            updateScoreboard(winnerDetermined);
        };
    };
    for (var i = 0; i < buttons.length; i++) {
        _loop_1(i);
    }
    restart.onclick = function () {
        resetGame();
    };
};
window.onload = startGame;
