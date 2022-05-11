const mainGrid = document.querySelector('.main-grid');
const clearGridButton = document.querySelector('#clear-grid');
const rainbowModeButton = document.querySelector('#rainbow');
const slider = document.querySelector('#grid-slider');
const sliderValue = document.querySelector('#slider-value');

// This is here to simulate mouse "held" state
let mouseDown = false;
mainGrid.addEventListener('mousedown', () => (mouseDown = true));
mainGrid.addEventListener('mouseup', () => (mouseDown = false));

// Rainbow mode tracker
let rainbowMode = false;

// Event listener on clear grid button to reset canvas
clearGridButton.addEventListener('click', clearGrid);

// Event listener for rainbowMode button
rainbowModeButton.addEventListener('click', () => (rainbowMode = !rainbowMode));

// setting slider value display to initial slider value and make it listen
// for when the slider value changes.
sliderValue.textContent = slider.value;
slider.oninput = () => {
  sliderValue.textContent = slider.value;
  deleteGrid();
  generateGrid(slider.value);
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
    cell.style.setProperty('background-color', 'initial');
  });
}

function changeColor(e) {
  // only change background color of cell if mousedown has occured and mouse is in cell
  if (e.type === 'mouseover' && !mouseDown) return;

  if (!rainbowMode) {
    e.target.style.cssText = 'background-color: black;';
  } else {
    e.target.style.cssText = `background-color: ${generateRandomColor()};`;
  }
}

function generateRandomColor() {
  let r = Math.floor(Math.random() * 256);
  let g = Math.floor(Math.random() * 256);
  let b = Math.floor(Math.random() * 256);

  let color = `rgb(${r}, ${g}, ${b})`;

  return color;
}

window.onload = () => {
  generateGrid(16);
};
