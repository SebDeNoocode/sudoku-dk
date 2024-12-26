// sudoku.js

class Sudoku {
    constructor() {
        this.grid = [];
        this.solution = [];
        this.difficulty = 'medium';
        this.initialize();
    }

    initialize() {
        // Initialiser une grille vide
        this.grid = this.emptyGrid();
        // Générer une solution complète
        this.solution = this.generateGrid();
        // Créer le puzzle en retirant des nombres
        this.grid = JSON.parse(JSON.stringify(this.solution));
        this.createPuzzle();
    }

    emptyGrid() {
        return Array.from({ length: 9 }, () => Array(9).fill(0));
    }

    isValid(grid, row, col, num) {
        // Vérifier la ligne
        for (let x = 0; x < 9; x++) {
            if (grid[row][x] === num) return false;
        }

        // Vérifier la colonne
        for (let x = 0; x < 9; x++) {
            if (grid[x][col] === num) return false;
        }

        // Vérifier le bloc 3x3
        let startRow = row - row % 3;
        let startCol = col - col % 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[i + startRow][j + startCol] === num) return false;
            }
        }

        return true;
    }

    generateGrid() {
        let grid = this.emptyGrid();
        this.fillGrid(grid);
        return grid;
    }

    fillGrid(grid) {
        let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (grid[row][col] === 0) {
                    // Mélanger les nombres pour plus d'aléatoire
                    numbers.sort(() => Math.random() - 0.5);
                    
                    for (let num of numbers) {
                        if (this.isValid(grid, row, col, num)) {
                            grid[row][col] = num;
                            if (col === 8 && row === 8) return true;
                            if (this.fillGrid(grid)) return true;
                        }
                    }
                    grid[row][col] = 0;
                    return false;
                }
            }
        }
        return true;
    }

    createPuzzle() {
        let cellsToRemove;
        switch(this.difficulty) {
            case 'very_easy': cellsToRemove = 25; break; // Très facile : ~56 indices
            case 'easy': cellsToRemove = 35; break;      // Facile : ~46 indices
            case 'medium': cellsToRemove = 45; break;    // Moyen : ~36 indices
            case 'hard': cellsToRemove = 52; break;      // Difficile : ~29 indices
            case 'expert': cellsToRemove = 58; break;    // Expert : ~23 indices
            default: cellsToRemove = 45;                 // Par défaut : niveau moyen
        }

        let attempts = 0;
        while (cellsToRemove > 0 && attempts < 1000) {
            let row = Math.floor(Math.random() * 9);
            let col = Math.floor(Math.random() * 9);
            
            if (this.grid[row][col] !== 0) {
                let temp = this.grid[row][col];
                this.grid[row][col] = 0;
                
                // Pour les niveaux difficile et expert, on vérifie qu'il n'y a qu'une solution
                if (this.difficulty === 'hard' || this.difficulty === 'expert') {
                    if (this.hasUniqueSolution()) {
                        cellsToRemove--;
                    } else {
                        this.grid[row][col] = temp;
                    }
                } else {
                    cellsToRemove--;
                }
            }
            attempts++;
        }
    }

    hasUniqueSolution() {
        // Vérification simplifiée de l'unicité de la solution
        // Cette méthode pourrait être améliorée pour plus de précision
        let emptyCells = [];
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (this.grid[i][j] === 0) {
                    emptyCells.push({row: i, col: j});
                }
            }
        }
        
        if (emptyCells.length === 0) return true;
        
        const cell = emptyCells[0];
        let solutions = 0;
        
        for (let num = 1; num <= 9; num++) {
            if (this.isValidMove(cell.row, cell.col, num)) {
                solutions++;
                if (solutions > 1) return false;
            }
        }
        
        return true;
    }

    isValidMove(row, col, num) {
        return this.isValid(this.grid, row, col, num);
    }

    makeMove(row, col, num) {
        if (this.isValidMove(row, col, num)) {
            this.grid[row][col] = num;
            return true;
        }
        return false;
    }

    isSolved() {
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (this.grid[row][col] !== this.solution[row][col]) {
                    return false;
                }
            }
        }
        return true;
    }

    getHint() {
        let emptyCells = [];
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                if (this.grid[row][col] === 0) {
                    emptyCells.push({row, col});
                }
            }
        }
        
        if (emptyCells.length === 0) return null;
        
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        return {
            row: randomCell.row,
            col: randomCell.col,
            value: this.solution[randomCell.row][randomCell.col]
        };
    }

    setDifficulty(level) {
        this.difficulty = level;
        this.initialize();
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = Sudoku;
} else {
    window.Sudoku = Sudoku;
}
