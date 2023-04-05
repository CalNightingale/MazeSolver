// Maze declaration
class Cell {
    north_wall: boolean; // true if wall exists to the north
    east_wall: boolean; // true if wall exists to the east
    south_wall: boolean; // true if wall exists to the south
    west_wall: boolean; // true if wall exists to the west

    constructor() {
        this.north_wall = true;
        this.east_wall = true;
        this.south_wall = true;
        this.west_wall = true;
    }
}

class Maze {
    rows: number; // number of rows in the maze
    columns: number; // number of columns in the maze
    grid: Cell[][]; // 2D array of cells representing the maze

    constructor(rows: number, columns: number) {
        this.rows = rows;
        this.columns = columns;

        // Initialize the grid with cells
        this.grid = new Array(rows);
        for (let i = 0; i < rows; i++) {
            this.grid[i] = new Array(columns);
            for (let j = 0; j < columns; j++) {
                this.grid[i][j] = new Cell();
            }
        }
    }

    // Accessor methods to get and set wall status for a cell
    getNorthWall(row: number, col: number): boolean {
        return this.grid[row][col].north_wall;
    }

    getEastWall(row: number, col: number): boolean {
        return this.grid[row][col].east_wall;
    }

    getSouthWall(row: number, col: number): boolean {
        return this.grid[row][col].south_wall;
    }

    getWestWall(row: number, col: number): boolean {
        return this.grid[row][col].west_wall;
    }

    setNorthWall(row: number, col: number, status: boolean): void {
        this.grid[row][col].north_wall = status;
    }

    setEastWall(row: number, col: number, status: boolean): void {
        this.grid[row][col].east_wall = status;
    }

    setSouthWall(row: number, col: number, status: boolean): void {
        this.grid[row][col].south_wall = status;
    }

    setWestWall(row: number, col: number, status: boolean): void {
        this.grid[row][col].west_wall = status;
    }

    // Function to generate the maze using randomized depth-first search
    generateMaze(): void {
        const stack: { row: number, col: number }[] = []; // stack to keep track of visited cells
        const visited: boolean[][] = new Array(this.rows); // array to keep track of visited cells
        for (let i = 0; i < this.rows; i++) {
            visited[i] = new Array(this.columns).fill(false);
        }

        // Helper function to get neighboring cells
        const getNeighbors = (row: number, col: number): { row: number, col: number }[] => {
            const neighbors: { row: number, col: number }[] = [];
            if (row > 1) {
                neighbors.push({ row: row - 2, col });
            }
            if (col > 1) {
                neighbors.push({ row, col: col - 2 });
            }
            if (row < this.rows - 2) {
                neighbors.push({ row: row + 2, col });
            }
            if (col < this.columns - 2) {
                neighbors.push({ row, col: col + 2 });
            }
            return neighbors;
        };

        // Start from the top-left corner of the maze
        const startRow = 0;
        const startCol = 0;
        stack.push({ row: startRow, col: startCol });
        visited[startRow][startCol] = true;

        while (stack.length > 0) {
            const current = stack[stack.length - 1]; // get the current cell from the stack
            const neighbors = getNeighbors(current.row, current.col); // get neighboring cells

            const unvisitedNeighbors = neighbors.filter(neighbor => {
                const { row, col } = neighbor;
                return !visited[row][col];
            });

            if (unvisitedNeighbors.length > 0) {
                // If there are unvisited neighbors, randomly choose one
                const randomIndex = Math.floor(Math.random() * unvisitedNeighbors.length);
                const chosenNeighbor = unvisitedNeighbors[randomIndex];

                // Remove the wall between the current cell and the chosen neighbor
                const { row, col } = current;
                const { row: chosenRow, col: chosenCol } = chosenNeighbor;

                if (chosenRow === row - 2) {
                    // Chosen neighbor is above the current cell
                    this.setNorthWall(row - 1, col, false); // Remove north wall of current cell
                } else if (chosenRow === row + 2) {
                    // Chosen neighbor is below the current cell
                    this.setSouthWall(row + 1, col, false); // Remove south wall of current cell
                } else if (chosenCol === col - 2) {
                    // Chosen neighbor is to the left of the current cell
                    this.setWestWall(row, col - 1, false); // Remove west wall of current cell
                } else if (chosenCol === col + 2) {
                    // Chosen neighbor is to the right of the current cell
                    this.setEastWall(row, col + 1, false); // Remove east wall of current cell
                }

                // Mark the chosen neighbor as visited and push it to the stack
                visited[chosenRow][chosenCol] = true;
                stack.push(chosenNeighbor);
            } else {
                // If there are no unvisited neighbors, backtrack by popping from the stack
                stack.pop();
            }
        }
    }
}

let maze: Maze = new Maze(10,10);
maze.generateMaze();

let message: string = 'Hello, World!';
// create a new heading 1 element
let heading = document.createElement('h1');
heading.textContent = message;
// add the heading the document
document.body.appendChild(heading);