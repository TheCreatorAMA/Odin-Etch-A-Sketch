const DEFAULT_SIZE = 16;

const mainGrid = document.querySelector('.main-grid');
const clearGridButton = document.querySelector('#clear-grid');
const eraserModeButton = document.querySelector('#eraser');
const rainbowModeButton = document.querySelector('#rainbow');
// const shaderModeButton = document.querySelector('#shader');
const slider = document.querySelector('#grid-slider');
const sliderValue = document.querySelector('#slider-value');
const colorPicker = document.querySelector('.color-picker');

let currentColor = colorPicker.value;
let colorModeTracker = 'normal';
let mouseDown = false;
let currentActiveButton = null;

// This is here to simulate mouse "held" state
mainGrid.addEventListener('mousedown', () => (mouseDown = true));
mainGrid.addEventListener('mouseup', () => (mouseDown = false));

// Event listener on clear grid button to reset canvas
clearGridButton.addEventListener('click', clearGrid);

// Event listeners for color modes
eraserModeButton.addEventListener('click', () => {
  setButtonState(eraserModeButton);
  colorModeTracker = colorModeTracker === 'eraser' ? 'normal' : 'eraser';
});
rainbowModeButton.addEventListener('click', () => {
  setButtonState(rainbowModeButton);
  colorModeTracker = colorModeTracker === 'rainbow' ? 'normal' : 'rainbow';
});
// shaderModeButton.addEventListener(
//   'click',
//   () => (colorModeTracker = colorModeTracker === 'shader' ? 'normal' : 'shader')
// );

// setting slider value display to initial slider value and make it listen
// for when the slider value changes.
sliderValue.textContent = slider.value;
slider.oninput = () => {
  sliderValue.textContent = slider.value;
  deleteGrid();
  generateGrid(slider.value);
};

// Event listener for color picker input
colorPicker.oninput = (e) => {
  setButtonState(currentActiveButton);
  currentColor = e.target.value;
  colorModeTracker = 'normal';
};

function generateGrid(size) {
  // To generate grid using css-grid.
  // Read online that this is a faster method to adding multiple elements to DOM
  let fragment = document.createDocumentFragment();
  mainGrid.style.cssText = `grid-template-rows: repeat(${size}, 1fr);grid-template-columns: repeat(${size}, 1fr);`;

  for (let item = 0; item < size * size; item++) {
    let newCell = document.createElement('div');
    newCell.classList.add('grid-item');

    // Add Event listener to each element for changing background color
    newCell.addEventListener('mouseover', changeColor);
    newCell.addEventListener('mousedown', changeColor);
    fragment.appendChild(newCell);
  }

  mainGrid.appendChild(fragment);
}

function deleteGrid() {
  while (mainGrid.hasChildNodes()) {
    console.log('removing children');
    mainGrid.removeChild(mainGrid.lastChild);
  }
}

function clearGrid() {
  let cells = document.querySelectorAll('.grid-item');
  cells.forEach((cell) => {
    cell.style.setProperty('background-color', 'white');
  });
}

function changeColor(e) {
  // only change background color of cell if mousedown has occured and mouse is in cell
  if (e.type === 'mouseover' && !mouseDown) return;

  switch (colorModeTracker) {
    case `normal`:
      e.target.style.cssText = `background-color: ${currentColor};`;
      break;
    case 'rainbow':
      e.target.style.cssText = `background-color: ${generateRandomColor()};`;
      break;
    case 'shader':
      e.target.style.cssText = `background-color: ${shadeCurrentElement(e.target)};`;
      break;
    case 'eraser':
      e.target.style.cssText = 'background-color: white;';
      break;
  }
}

function generateRandomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);

  let color = `rgb(${r}, ${g}, ${b})`;

  return color;
}

function setButtonState(button) {
  // Simulating button state to assign active class
  if (!currentActiveButton) {
    currentActiveButton = button;
    if (currentActiveButton) {
      button.classList.add('active-button');
    }
  } else if (button === currentActiveButton) {
    currentActiveButton = null;
    button.classList.remove('active-button');
  } else {
    currentActiveButton.classList.remove('active-button');
    currentActiveButton = button;
    currentActiveButton.classList.add('active-button');
  }
}

// function shadeCurrentElement(targetElement) {
//   // target
// }

window.onload = () => {
  generateGrid(DEFAULT_SIZE);
};
