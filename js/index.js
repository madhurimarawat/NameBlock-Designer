/*
Author: Madhurima Rawat
Date: December 7, 2024
Description:
This JavaScript file provides functionality for the "NameBlock Designer" project, allowing users to create customizable name blocks. It includes features like dynamic block generation, color customization, automatic color application, and downloading the design as a PNG image using html2canvas.

Dependencies:
1. html2canvas (1.4.1) - Used for capturing the block container as an image.

Functions:
1. generateBlocks: Dynamically generates blocks for each character of the input name.
2. applyAutoColors: Applies a predefined set of colors to the generated blocks.
3. downloadImage: Downloads the name block design as a PNG image.
4. changeBackground: Changes the background gradient of the page.
*/

/**
 * Dynamically generates blocks for each character in the input name and creates corresponding color pickers.
 */
function generateBlocks() {
    const nameInput = document.getElementById('name-input').value; // User input for the name
    const blockContainer = document.getElementById('block-container'); // Container to hold the blocks
    const colorOptions = document.getElementById('color-options'); // Section for color options
    const colorPickers = document.getElementById('color-pickers'); // Section for individual color pickers

    // Clear any existing blocks
    blockContainer.innerHTML = '';

    // Validate input
    if (nameInput.trim() === '') {
        alert('Please enter a name.');
        return;
    }

    // Create blocks for each character (excluding spaces)
    nameInput.split('').forEach((char, index) => {
        if (char !== ' ') {
            const block = document.createElement('div');
            block.classList.add('block'); // Apply the "block" class for styling
            block.textContent = char; // Set the character as the block content
            block.id = `block-${index}`; // Unique ID for each block
            blockContainer.appendChild(block); // Add block to the container
        }
    });

    // Display color options and clear existing pickers
    colorOptions.style.display = 'block';
    colorPickers.innerHTML = '';

    // Create color pickers for each character block
    nameInput.split('').forEach((char, index) => {
        if (char !== ' ') {
            const colorPicker = document.createElement('input');
            colorPicker.type = 'color'; // Input type for color selection
            colorPicker.id = `color-picker-${index}`; // Unique ID for each picker
            colorPicker.value = '#ffffff'; // Default color

            // Update block color when the color picker value changes
            colorPicker.addEventListener('input', () => {
                const block = document.getElementById(`block-${index}`);
                if (block) {
                    block.style.backgroundColor = colorPicker.value;
                }
            });

            colorPickers.appendChild(colorPicker); // Add picker to the options section
        }
    });
}

/**
 * Applies a predefined set of colors to the generated blocks in a repeating sequence.
 */
function applyAutoColors() {
    const blocks = document.querySelectorAll('.block'); // Select all generated blocks
    const colors = ['#e63946', '#f4a261', '#2a9d8f', '#e9c46a', '#264653', '#6a4c93', '#9c6644', '#457b9d', '#ff6f61', '#48cae4', '#8338ec', '#b56576', '#2c6e49', '#ff9f1c']; // Predefined color palette

    blocks.forEach((block, index) => {
        block.style.backgroundColor = colors[index % colors.length]; // Apply colors in a loop
    });
}

/**
 * Captures the block container as a PNG image and downloads it with a filename based on the input name.
 */
function downloadImage() {
    const blockContainer = document.getElementById('block-container'); // Container with the blocks
    const nameInput = document.getElementById('name-input').value.trim().toUpperCase(); // Input name in uppercase

    // Validate input
    if (nameInput === '') {
        alert('Please enter a name to download the image.');
        return;
    }

    const fileName = `${nameInput}_NameBlock.png`; // Generate filename

    // Capture the container using html2canvas and download as an image
    html2canvas(blockContainer, {
        useCORS: true, // Handle cross-origin images
        backgroundColor: null // Ensure transparent background
    }).then(canvas => {
        const link = document.createElement('a'); // Create download link
        link.download = fileName; // Set download filename
        link.href = canvas.toDataURL('image/png'); // Convert canvas to data URL
        link.click(); // Trigger the download
    });
}

/**
 * Updates the page background to a gradient using two selected colors.
 * @param {string} color1 - The first color in the gradient.
 * @param {string} color2 - The second color in the gradient.
 */
function changeBackground(color1, color2) {
    document.body.style.background = `linear-gradient(to right, ${color1}, ${color2})`; // Apply gradient background
}
