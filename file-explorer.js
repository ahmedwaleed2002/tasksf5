const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const readline = require('readline');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to display information about files and directories
function displayFileInfo(filePath, stats) {
  if (stats.isDirectory()) {
    console.log(chalk.blue.bold(filePath) + chalk.green(' (Directory)'));
  } else if (stats.isFile()) {
    console.log(chalk.cyan.bold(filePath) + chalk.yellow(` (File - ${stats.size} bytes)`));
  }
}

// Function to ask user if they want to explore subdirectories
function askToExploreSubdirectories() {
  return new Promise((resolve) => {
    rl.question(chalk.magenta('\nDo you want to explore subdirectories? (y/n): '), (answer) => {
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

// Function to explore directory with user confirmation for subdirectories
async function exploreDirectory(dirPath, exploreSubdirs = false) {
  const files = fs.readdirSync(dirPath); // Get directory contents
  const directories = [];

  // First, display all files and directories in the current level
  files.forEach(file => {
    const filePath = path.join(dirPath, file); // Get full path of each item
    const stats = fs.statSync(filePath); // Get file stats

    displayFileInfo(filePath, stats);

    // Keep track of directories for potential exploration
    if (stats.isDirectory()) {
      directories.push(filePath);
    }
  });

  // If there are subdirectories and we haven't been told to explore them yet
  if (directories.length > 0 && !exploreSubdirs) {
    const shouldExplore = await askToExploreSubdirectories();
    
    if (shouldExplore) {
      console.log(chalk.yellow('\n--- Exploring subdirectories ---\n'));
      
      // Explore each subdirectory recursively
      for (const dir of directories) {
        console.log(chalk.green(`\nExploring subdirectory: ${dir}`));
        await exploreDirectory(dir, true); // Recursive exploration
      }
    }
  } else if (directories.length > 0 && exploreSubdirs) {
    // If we're already in recursive mode, explore all subdirectories
    for (const dir of directories) {
      await exploreDirectory(dir, true);
    }
  }
}

// Function to start the file explorer from the given directory
async function startFileExplorer() {
  const directory = process.argv[2] || '.'; // Default to current directory

  // Check if the directory exists
  if (!fs.existsSync(directory)) {
    console.log(chalk.red('Error: The directory does not exist.'));
    rl.close();
    return;
  }

  console.log(chalk.green('Exploring directory: ') + chalk.yellow(directory));
  console.log(chalk.gray('--- Main files and folders ---\n'));
  
  await exploreDirectory(directory); // Start exploring the directory
  
  console.log(chalk.green('\n--- Exploration complete! ---'));
  rl.close();
}

// Run the file explorer
startFileExplorer();

