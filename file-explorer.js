const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// Function to display information about files and directories
function displayFileInfo(filePath, stats) {
  if (stats.isDirectory()) {
    console.log(chalk.blue.bold(filePath) + chalk.green(' (Directory)'));
  } else if (stats.isFile()) {
    console.log(chalk.cyan.bold(filePath) + chalk.yellow(` (File - ${stats.size} bytes)`));
  }
}

// Recursive function to explore directories
function exploreDirectory(dirPath) {
  const files = fs.readdirSync(dirPath); // Get directory contents

  files.forEach(file => {
    const filePath = path.join(dirPath, file); // Get full path of each item
    const stats = fs.statSync(filePath); // Get file stats

    displayFileInfo(filePath, stats);

    // If it's a directory, recurse into it
    if (stats.isDirectory()) {
      exploreDirectory(filePath); // Recursion for subdirectories
    }
  });
}

// Function to start the file explorer from the given directory
function startFileExplorer() {
  const directory = process.argv[2] || '.'; // Default to current directory

  // Check if the directory exists
  if (!fs.existsSync(directory)) {
    console.log(chalk.red('Error: The directory does not exist.'));
    return;
  }

  console.log(chalk.green('Exploring directory: ') + chalk.yellow(directory));
  exploreDirectory(directory); // Start exploring the directory
}

// Run the file explorer
startFileExplorer();

