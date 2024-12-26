class SudokuGame {
    constructor() {
        this.sudoku = new Sudoku();
        this.selectedCell = null;
        this.hintsRemaining = 5;
        this.timer = 0;
        this.timerInterval = null;
        this.initializeUI();
        this.setupEventListeners();
    }

    initializeUI() {
        this.renderGrid();
        this.updateHintsCount();
        this.startTimer();
    }

    renderGrid() {
        const grid = document.getElementById('sudoku-grid');
        grid.innerHTML = '';
        
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                const value = this.sudoku.grid[row][col];
                if (value !== 0) {
                    cell.textContent = value;
                    cell.classList.add('initial');
                }
                
                grid.appendChild(cell);
            }
        }
    }

    setupEventListeners() {
        // Gestion des clics sur la grille
        document.getElementById('sudoku-grid').addEventListener('click', (e) => {
            const cell = e.target.closest('.cell');
            if (cell && !cell.classList.contains('initial')) {
                this.handleCellClick(cell);
            }
        });

        // Gestion du pavé numérique
        document.querySelectorAll('.number').forEach(button => {
            button.addEventListener('click', () => {
                this.handleNumberClick(button.dataset.number);
            });
        });

        // Gestion des touches du clavier
        document.addEventListener('keydown', (e) => {
            if (e.key >= '1' && e.key <= '9') {
                this.handleNumberClick(e.key);
            } else if (e.key === 'Backspace' || e.key === 'Delete') {
                this.handleNumberClick('0');
            }
        });

        // Gestion du bouton indice
        document.getElementById('hint-btn').addEventListener('click', () => {
            this.useHint();
        });

        // Gestion du bouton nouvelle partie
        document.getElementById('new-game-btn').addEventListener('click', () => {
            this.newGame();
        });

        // Gestion du sélecteur de difficulté
        document.getElementById('difficulty-select').addEventListener('change', (e) => {
            this.sudoku.setDifficulty(e.target.value);
            this.newGame();
        });

        // Gestion des modales
        document.getElementById('rules-button').addEventListener('click', () => {
            document.getElementById('rules').style.display = 'block';
        });

        document.querySelectorAll('.close-modal').forEach(button => {
            button.addEventListener('click', () => {
                button.closest('.modal').style.display = 'none';
            });
        });
    }

    handleCellClick(cell) {
        // Retirer la sélection précédente
        if (this.selectedCell) {
            this.selectedCell.classList.remove('selected');
        }

        this.selectedCell = cell;
        cell.classList.add('selected');
    }

    handleNumberClick(number) {
        if (!this.selectedCell) return;

        const row = parseInt(this.selectedCell.dataset.row);
        const col = parseInt(this.selectedCell.dataset.col);

        if (number === '0') {
            // Effacer la cellule
            this.selectedCell.textContent = '';
            this.selectedCell.classList.remove('error');
            this.sudoku.grid[row][col] = 0;
        } else {
            const num = parseInt(number);
            if (this.sudoku.isValidMove(row, col, num)) {
                this.selectedCell.textContent = number;
                this.selectedCell.classList.remove('error');
                this.sudoku.grid[row][col] = num;

                if (this.sudoku.isSolved()) {
                    this.handleVictory();
                }
            } else {
                this.selectedCell.classList.add('error');
            }
        }
    }

    useHint() {
        if (this.hintsRemaining > 0) {
            const hint = this.sudoku.getHint();
            if (hint) {
                const cell = document.querySelector(`.cell[data-row="${hint.row}"][data-col="${hint.col}"]`);
                cell.textContent = hint.value;
                this.sudoku.grid[hint.row][hint.col] = hint.value;
                this.hintsRemaining--;
                this.updateHintsCount();
                this.timer += 30; // Ajouter 30 secondes de pénalité
                
                if (this.sudoku.isSolved()) {
                    this.handleVictory();
                }
            }
        }
    }

    updateHintsCount() {
        document.getElementById('hints-count').textContent = this.hintsRemaining;
    }

    startTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        this.timer = 0;
        this.updateTimerDisplay();
        this.timerInterval = setInterval(() => {
            this.timer++;
            this.updateTimerDisplay();
        }, 1000);
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.timer / 60);
        const seconds = this.timer % 60;
        const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('timer').textContent = display;
    }

    handleVictory() {
        clearInterval(this.timerInterval);
        document.getElementById('final-time').textContent = document.getElementById('timer').textContent;
        document.getElementById('victory-modal').style.display = 'block';
    }

    newGame() {
        this.sudoku.initialize();
        this.hintsRemaining = 5;
        this.updateHintsCount();
        this.renderGrid();
        this.startTimer();
        if (this.selectedCell) {
            this.selectedCell.classList.remove('selected');
            this.selectedCell = null;
        }
    }
}

// Démarrer le jeu quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    new SudokuGame();
});
