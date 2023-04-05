// YourReactComponent.tsx
import React from "react";
import MazeComponent from "./MazeComponent";
import { Maze } from "./Maze";

// Example usage of the Maze class and MazeComponent in your React component
const YourReactComponent: React.FC = () => {
  // Create an instance of the Maze class
  const maze = new Maze(11, 10); // Example with 10 rows and 10 columns
  maze.generateMaze(); // Generate the maze

  return (
    <div>
      <h1>Maze Visualizer</h1>
      <MazeComponent maze={maze} /> {/* Render the maze using MazeComponent */}
    </div>
  );
};

export default YourReactComponent;

