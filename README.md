# 📁 File Explorer CLI Tool

A powerful Node.js command-line tool that recursively explores directories and provides detailed information about files and folders, including their sizes and types.

## 🚀 Features

- **Interactive Directory Exploration**: Shows main files and folders first, then asks for permission to explore subdirectories
- **Smart Recursive Exploration**: Only explores subdirectories when you want to
- **File Information Display**: Shows file sizes in bytes
- **Colorful Output**: Uses chalk for beautiful, color-coded terminal output
- **Cross-Platform Compatibility**: Works on Windows, macOS, and Linux
- **Dynamic Input**: Accepts any directory path as a command-line argument
- **Error Handling**: Gracefully handles non-existent directories
- **User-Friendly Interface**: Clean, organized output with clear sections

## 📦 Installation

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm (Node Package Manager)

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ahmedwaleed2002/tasksf5.git
   cd tasksf5
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## 💻 Usage

### Basic Usage

Explore the current directory:
```bash
node file-explorer.js
```

Explore a specific directory:
```bash
node file-explorer.js /path/to/directory
```

### Windows Examples
```bash
# Explore C: drive
node file-explorer.js C:\

# Explore Documents folder
node file-explorer.js C:\Users\%USERNAME%\Documents

# Explore Desktop
node file-explorer.js C:\Users\%USERNAME%\Desktop
```

### macOS/Linux Examples
```bash
# Explore home directory
node file-explorer.js ~

# Explore a specific folder
node file-explorer.js /usr/local/bin

# Explore current directory
node file-explorer.js .
```

## 🎨 Output Format

The tool displays information in a color-coded format:

- **🔵 Blue Bold**: Directory names
- **🟢 Green**: "(Directory)" label
- **🔷 Cyan Bold**: File names
- **🟡 Yellow**: File sizes in bytes

### Example Output:
```
Exploring directory: ./sample-folder
--- Main files and folders ---

./sample-folder/document.txt (File - 1024 bytes)
./sample-folder/images (Directory)
./sample-folder/scripts (Directory)
./sample-folder/config.json (File - 256 bytes)

Do you want to explore subdirectories? (y/n): y

--- Exploring subdirectories ---

Exploring subdirectory: ./sample-folder/images
./sample-folder/images/photo.jpg (File - 2048576 bytes)
./sample-folder/images/banner.png (File - 1024000 bytes)

Exploring subdirectory: ./sample-folder/scripts
./sample-folder/scripts/script.js (File - 512 bytes)
./sample-folder/scripts/utils.js (File - 256 bytes)

--- Exploration complete! ---
```

## 🛠️ Technical Details

### Core Technologies
- **Node.js**: JavaScript runtime environment
- **fs module**: File system operations
- **path module**: Cross-platform path handling
- **chalk**: Terminal string styling
- **readline**: Interactive user input handling

### Key Functions

#### `displayFileInfo(filePath, stats)`
- Displays formatted file/directory information
- Uses `stats.isDirectory()` and `stats.isFile()` for type detection
- Applies appropriate colors based on file type

#### `askToExploreSubdirectories()`
- Interactive function that prompts user for subdirectory exploration
- Returns a Promise that resolves to user's choice (y/n)
- Uses readline interface for clean user interaction

#### `exploreDirectory(dirPath, exploreSubdirs)`
- Intelligently explores directories with user confirmation
- Uses `fs.readdirSync()` to read directory contents
- Calls `fs.statSync()` to get file statistics
- Implements conditional recursive calls based on user preference
- Separates main directory listing from subdirectory exploration

#### `startFileExplorer()`
- Async entry point function
- Handles command-line argument parsing
- Validates directory existence
- Initiates directory exploration with proper cleanup

## 🔧 Development

### Project Structure
```
tasksf5/
├── file-explorer.js    # Main CLI tool
├── package.json        # Node.js project configuration
├── package-lock.json   # Dependency lock file
├── node_modules/       # Installed dependencies
└── README.md          # This file
```

### Running in Development Mode
```bash
# Make the script executable (macOS/Linux)
chmod +x file-explorer.js

# Run with Node.js
node file-explorer.js [directory-path]
```

## 📝 Git Workflow

### Initial Setup
```bash
git init
git add .
git commit -m "Initial commit: Created file explorer CLI tool"
```

### Making Changes
```bash
git add .
git commit -m "Feature: Added recursive directory exploration"
git commit -m "Enhancement: Improved output formatting with chalk"
git commit -m "Fix: Added error handling for non-existent directories"
```

### Push to GitHub
```bash
git remote add origin https://github.com/ahmedwaleed2002/tasksf5.git
git push -u origin main
```

## 🚧 Error Handling

The tool includes robust error handling:

- **Non-existent Directory**: Displays a red error message if the specified directory doesn't exist
- **Permission Errors**: Gracefully handles directories that can't be accessed
- **Invalid Arguments**: Defaults to current directory if no argument is provided

## 🔮 Future Enhancements

- [ ] Add file type filtering options
- [ ] Implement size formatting (KB, MB, GB)
- [ ] Add sorting options (by size, name, date)
- [ ] Include last modified date information
- [ ] Add depth limit option for recursion
- [ ] Export results to JSON/CSV format
- [ ] Add progress bar for large directories
- [ ] Implement ignore patterns (.gitignore style)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ahmed Waleed**
- GitHub: [@ahmedwaleed2002](https://github.com/ahmedwaleed2002)
- Repository: [tasksf5](https://github.com/ahmedwaleed2002/tasksf5)

## 🙏 Acknowledgments

- Node.js community for excellent documentation
- Chalk library for beautiful terminal output
- Contributors and testers

---

*Built with ❤️ using Node.js and JavaScript*
