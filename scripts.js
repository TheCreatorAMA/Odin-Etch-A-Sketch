const mainGrid = document.querySelector('.main-grid');
const clearGridButton = document.querySelector('#clear-grid');
const slider = document.querySelector('#grid-slider');
const sliderValue = document.querySelector('#slider-value');

// This is here to simulate mouse "held" state
let mouseDown = false;
mainGrid.addEventListener('mousedown', () => (mouseDown = true));
mainGrid.addEventListener('mouseup', () => (mouseDown = false));

clearGridButton.addEventListener('click', clearGrid);

// setting slider value display to initial slider value and make it listen
// for when the slider value changes.
sliderValue.textContent = slider.value;
slider.oninput = () => {
  sliderValue.textContent = slider.value;
  generateGrid(sliderValue, sliderValue);
};

function generateGrid(size) {
  // To generate grid using css-grid.
  mainGrid.style.cssText = `grid-template-rows: repeat(${size}, 1fr);grid-template-columns: repeat(${size}, 1fr);`;

  for (let item = 0; item < size * size; item++) {
    let newCell = document.createElement('div');

    // Event listener to
    newCell.addEventListener('mouseover', changeColor);
    newCell.addEventListener('mousedown', changeColor);
    newCell.style.cssText = `width: ${1 / (size * size)}%;height: ${1 / (size * size)}%;`;
    mainGrid.appendChild(newCell).className = 'grid-item';
  }
}

function clearGrid() {
  let cells = document.querySelectorAll('.grid-item');

  for (let cell of cells) {
    cell.style.setProperty('background-color', 'initial');
  }
}

function changeColor(e) {
  // only change background color of cell if mousedown has occured and mouse is in cell
  if (e.type === 'mouseover' && !mouseDown) return;
  e.target.style.cssText = 'background-color: black;';
}

generateGrid(16);
