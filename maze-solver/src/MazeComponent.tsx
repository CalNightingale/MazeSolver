// MazeComponent.tsx

import React from "react";
import { Maze, Cell } from "./Maze"; // Import Maze and Cell types
import "./MazeComponent.css"; // Import CSS file for MazeComponent

interface Props {
  maze: Maze;
}

const MazeComponent: React.FC<Props> = ({ maze }) => {
  return (
    <div className="maze-container">
      {/* Render the maze cells */}
      {maze.grid.map((row, rowIndex) => (
        <div key={rowIndex} className="maze-row">
          {row.map((cell, colIndex) => (
            <div key={colIndex} className="maze-cell">
              {/* Render individual maze walls using the properties of the 'cell' object */}
              {cell.top && <div className="wall top"></div>}
              {cell.right && <div className="wall right"></div>}
              {cell.bottom && <div className="wall bottom"></div>}
              {cell.left && <div className="wall left"></div>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MazeComponent;