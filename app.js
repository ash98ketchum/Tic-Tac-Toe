document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const restartBtn = document.getElementById('restart-btn');
    const settingsBtn = document.getElementById('settings-btn');
    const themeToggle = document.getElementById('theme-toggle');
    const settingsPanel = document.getElementById('settings-panel');
    const applySettingsBtn = document.getElementById('apply-settings');
    const xColorOptions = document.querySelectorAll('#x-colors .color-option');
    const oColorOptions = document.querySelectorAll('#o-colors .color-option');
    const playerXSymbol = document.querySelector('.player-symbol.player-x');
    const playerOSymbol = document.querySelector('.player-symbol.player-o');
    const winLine = document.getElementById('win-line');
    
    // Modal elements
    const nameModal = document.getElementById('name-modal');
    const winModal = document.getElementById('win-modal');
    const startGameBtn = document.getElementById('start-game');
    const playAgainBtn = document.getElementById('play-again');
    const exitGameBtn = document.getElementById('exit-game');
    const winMessage = document.getElementById('win-message');
    const playerXNameInput = document.getElementById('playerX-name');
    const playerONameInput = document.getElementById('playerO-name');
    
    // --- Game state variables ---
    let currentPlayer = 'X';
    let gameBoard = Array(9).fill('');
    let gameActive = true;
    let playerXName = "Player X";
    let playerOName = "Player O";
  
    // Default color settings
    let xColor = '#7c4dff';
    let oColor = '#ff5252';
  
    // Sound effects (Base64 encoded; replace ... with full data if needed)
    const moveSound = new Audio('data:audio/mp3;base64,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YWNrIDFAAAAEAAABTEFNRTMuMTAwAAAAAEluZm8AAAAPAAAAEAAACDoAJiYmJi4uLi43Nzc3QEBAQElJSUlSUlJSW1tbW2RkZGRtbW1tdnZ2dn9/f3+IiIiIkZGRkZqampqjo6OjrKysrLW1tbW+vr6+x8fHx9DQ0NDZ2dnZ4uLi4uvr6+v09PT0/f39/f//AAAAAExBTUUzLjEwMABMYXZmNTguMTIuMTAwAAALMAAACjoAJiYmJi4uLi43Nzc3QEBAQElJSUlSUlJSW1tbW2RkZGRtbW1tdnZ2dn9/f3+IiIiIkZGRkZqampqjo6OjrKysrLW1tbW+vr6+x8fHx9DQ0NDZ2dnZ4uLi4uvr6+v09PT0/f39/f//AAAAAE1wb3MAAAAdAAAATEFNRTMuMTAwAGRhdGH/IcwAAAGdz1tFhQYGBgYbRmQqjdP/kfKBgYGqNf/4GBgY//8MDA7/+CtUiRgYI1TDAwPm/+TkRJFE5AO3/+d0HA4HBHRGRpDrgjw8jx8+/5J//y5n//jl////KP////UY/////////Gv//////t/////////j//////+P////////////+Fv///////////8fhAdUDqgFdU6qqWDAwOjr0VxFMhQoChQrv//1jAQEBAQHj49XVpaWlpQ4O7u66usXFxcWLi+np6ekMDP////Oz/+n//3N///+d/9v/+f//////////+J//////+uP///////////////////////////////////////////////8=');
    
    const winSound = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAAbAAkJCQkJCQkJCQkJCQkJCQwMDAwMDAwMDAwMDAwMDA4ODg4ODg4ODg4ODg4ODg4P//////////////////////////AAAAAExhdmM1OC4xMwAAAAAAAAAAAAAAACQCkAAAAAAAAAGw5MnmngAAAAAAAAAAAAAAAAAAAP/jOMAAAAAAAAAAAABJbmZvAAAADwAAAAIAAAFGAEBAQEBAQEBAQEBAQEBAQEBvb29vb29vb29vb29vb29vb5+fn5+fn5+fn5+fn5+fn5+f////////////////////////////////AAAAAExhdmM1OC4xMwAAAAAAAAAAAAAAACQDdAAAAAAAAAFGqve7hwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAExTU0UAAAAtAAAATEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/4zjMAAAAAAAAAAAASW5mbwAAAA8AAAASAAAIZgALCwsTExMcHBwcJCQkJCwsLCw0NDQ8PDw8RERETExMTFRUVFxcXFxkZGRsdHR0fHx8fISEhISMjIyUlJSUnJycnKSkrKysrLS0tLy8vLzExMTM1NTU3Nzc3OTk5Oz09PT8/Pz8//8AAAAAMphYVFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/4zjMAAAAAAAAAAAUaW5mb/////////////8AAAAPAAADFQD/////////////TEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV');
    
    /* ------------------ Main Functions ------------------ */
    
    // --- Modal functions ---
    // Show the name modal when the page loads
    nameModal.classList.add('active');
    
    startGameBtn.addEventListener('click', () => {
      // Use provided names or fallback to defaults if left blank
      playerXName = playerXNameInput.value.trim() || "Player X";
      playerOName = playerONameInput.value.trim() || "Player O";
      
      // Update the turn message with names
      message.textContent = `${playerXName}'s turn`;
      
      // Hide the name modal
      nameModal.classList.remove('active');
    });
    
    // Show win modal with result, then wait for action.
    function showWinModal(winnerName) {
      winMessage.textContent = `${winnerName} wins!`;
      winModal.classList.add('active');
    }
    
    playAgainBtn.addEventListener('click', () => {
      winModal.classList.remove('active');
      restartGame();
    });
    
    exitGameBtn.addEventListener('click', () => {
      // For example, reload the page or close the window
      window.location.reload();
    });
    
    // --- Cell Click Handler ---
    function handleCellClick(e) {
      const index = e.target.getAttribute('data-index');
      if (!gameActive || gameBoard[index] !== '') return;
    
      // Update state and UI for the move
      gameBoard[index] = currentPlayer;
      e.target.classList.add(currentPlayer.toLowerCase());
      e.target.textContent = currentPlayer;
    
      moveSound.currentTime = 0;
      moveSound.play();
    
      // Check win or draw
      if (checkWinner()) {
        // Use the stored name depending on which symbol won
        const winnerName = currentPlayer === 'X' ? playerXName : playerOName;
        message.textContent = `${winnerName} wins!`;
        winSound.play();
        gameActive = false;
        showWinModal(winnerName);
        return;
      }
    
      if (gameBoard.every(cell => cell !== '')) {
        message.textContent = "It's a draw!";
        gameActive = false;
        return;
      }
    
      // Switch player and update turn message accordingly
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      const turnName = currentPlayer === 'X' ? playerXName : playerOName;
      message.textContent = `${turnName}'s turn`;
      playerXSymbol.classList.toggle('active');
      playerOSymbol.classList.toggle('active');
    }
    
    // --- Winner Check ---
    function checkWinner() {
      const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
    
      for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (
          gameBoard[a] &&
          gameBoard[a] === gameBoard[b] &&
          gameBoard[b] === gameBoard[c]
        ) {
          // Mark winning cells
          cells[a].classList.add('winning');
          cells[b].classList.add('winning');
          cells[c].classList.add('winning');
    
          // Draw the win line from cell a to cell c
          drawWinLine(cells[a], cells[c]);
          return true;
        }
      }
      return false;
    }
    
    // --- Draw the Win Line ---
    function drawWinLine(cellA, cellC) {
      // Get positions relative to the board
      const boardRect = board.getBoundingClientRect();
      const aRect = cellA.getBoundingClientRect();
      const cRect = cellC.getBoundingClientRect();
    
      // Calculate the center points of the winning cells
      const aCenter = {
        x: aRect.left + aRect.width / 2,
        y: aRect.top + aRect.height / 2
      };
      const cCenter = {
        x: cRect.left + cRect.width / 2,
        y: cRect.top + cRect.height / 2
      };
    
      // Distance and angle between centers
      const dx = cCenter.x - aCenter.x;
      const dy = cCenter.y - aCenter.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angleDeg = Math.atan2(dy, dx) * (180 / Math.PI);
    
      // Determine offset (relative to board)
      const offsetX = aCenter.x - boardRect.left;
      const offsetY = aCenter.y - boardRect.top;
    
      // Apply styles to the win line element
      winLine.style.display = 'block';
      winLine.style.width = distance + 'px';
      winLine.style.transform = `rotate(${angleDeg}deg)`;
      winLine.style.left = offsetX + 'px';
      winLine.style.top = (offsetY - 2) + 'px';
    }
    
    // --- Restart Game ---
    function restartGame() {
      currentPlayer = 'X';
      gameBoard = Array(9).fill('');
      gameActive = true;
      message.textContent = `${playerXName}'s turn`;
      cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winning');
      });
      winLine.style.display = 'none';
      winLine.style.width = '0';
      playerXSymbol.classList.add('active');
      playerOSymbol.classList.remove('active');
    }
    
    // --- Theme Toggle ---
    function toggleTheme() {
      document.body.classList.toggle('dark-mode');
      themeToggle.textContent = document.body.classList.contains('dark-mode')
        ? 'Light Mode'
        : 'Dark Mode';
    }
    
    // --- Settings Panel ---
    function applySettings() {
      const selectedX = document.querySelector('#x-colors .color-option.selected')
                          .getAttribute('data-color');
      const selectedO = document.querySelector('#o-colors .color-option.selected')
                          .getAttribute('data-color');
      xColor = selectedX;
      oColor = selectedO;
    
      // Update CSS variables
      document.documentElement.style.setProperty('--primary-color', xColor);
      document.documentElement.style.setProperty('--secondary-color', oColor);
    
      // Update player symbol styles
      playerXSymbol.style.color = xColor;
      playerXSymbol.style.backgroundColor = hexToRGBA(xColor, 0.1);
      playerOSymbol.style.color = oColor;
      playerOSymbol.style.backgroundColor = hexToRGBA(oColor, 0.1);
    
      settingsPanel.classList.remove('active');
    }
    
    // --- Helper: Convert HEX to RGBA ---
    function hexToRGBA(hex, alpha) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    
    // --- Helper: Select Color Option ---
    function selectColorOption(event, groupSelector) {
      const options = document.querySelectorAll(groupSelector + ' .color-option');
      options.forEach(option => option.classList.remove('selected'));
      event.target.classList.add('selected');
    }
    
    /* ------------------ Event Listeners ------------------ */
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartBtn.addEventListener('click', restartGame);
    themeToggle.addEventListener('click', toggleTheme);
    settingsBtn.addEventListener('click', () => {
      settingsPanel.classList.toggle('active');
    });
    applySettingsBtn.addEventListener('click', applySettings);
    xColorOptions.forEach(option =>
      option.addEventListener('click', (e) => selectColorOption(e, '#x-colors'))
    );
    oColorOptions.forEach(option =>
      option.addEventListener('click', (e) => selectColorOption(e, '#o-colors'))
    );
  });
  