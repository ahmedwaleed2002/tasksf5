const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const readline = require('readline');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Global statistics tracking
let totalFiles = 0;
let totalDirectories = 0;
let totalSize = 0;

// Function to update statistics
function updateStats(stats) {
  if (stats.isFile()) {
    totalFiles++;
    totalSize += stats.size;
  } else if (stats.isDirectory()) {
    totalDirectories++;
  }
}

// Function to format file sizes in human-readable format
function formatFileSize(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Function to display information about files and directories
function displayFileInfo(filePath, stats) {
  // Update statistics
  updateStats(stats);
  
  if (stats.isDirectory()) {
    console.log(chalk.blue.bold(filePath) + chalk.green(' (Directory)'));
  } else if (stats.isFile()) {
    const sizeFormatted = formatFileSize(stats.size);
    console.log(chalk.cyan.bold(filePath) + chalk.yellow(` (File - ${sizeFormatted})`));
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
  let files;
  
  try {
    files = fs.readdirSync(dirPath); // Get directory contents
  } catch (error) {
    console.log(chalk.red(`Error reading directory ${dirPath}: ${error.message}`));
    return;
  }
  
  const directories = [];
  const fileStats = [];

  // First, collect all file stats and separate files from directories
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    
    try {
      const stats = fs.statSync(filePath);
      fileStats.push({ filePath, stats });
      
      if (stats.isDirectory()) {
        directories.push(filePath);
      }
    } catch (error) {
      console.log(chalk.red(`Error reading ${filePath}: ${error.message}`));
    }
  });

  // Sort files and directories for better display
  fileStats.sort((a, b) => {
    // Directories first, then files
    if (a.stats.isDirectory() && !b.stats.isDirectory()) return -1;
    if (!a.stats.isDirectory() && b.stats.isDirectory()) return 1;
    return a.filePath.localeCompare(b.filePath);
  });

  // Display sorted files and directories
  fileStats.forEach(({ filePath, stats }) => {
    displayFileInfo(filePath, stats);
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

// Function to display summary statistics
function displaySummary() {
  console.log(chalk.green('\n--- Summary ---'));
  console.log(chalk.cyan(`Total Files: ${totalFiles}`));
  console.log(chalk.blue(`Total Directories: ${totalDirectories}`));
  console.log(chalk.yellow(`Total Size: ${formatFileSize(totalSize)}`));
  console.log(chalk.green('--- Exploration complete! ---'));
}

// Function to start the file explorer from the given directory
async function startFileExplorer() {
  const directory = process.argv[2] || '.'; // Default to current directory

  // Reset statistics
  totalFiles = 0;
  totalDirectories = 0;
  totalSize = 0;

  // Check if the directory exists
  if (!fs.existsSync(directory)) {
    console.log(chalk.red('Error: The directory does not exist.'));
    rl.close();
    return;
  }

  console.log(chalk.green('Exploring directory: ') + chalk.yellow(directory));
  console.log(chalk.gray('--- Main files and folders ---\n'));
  
  await exploreDirectory(directory); // Start exploring the directory
  
  displaySummary();
  rl.close();
}

// Run the file explorer
startFileExplorer();

