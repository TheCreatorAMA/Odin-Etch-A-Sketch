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
  e.target.style.cssText = 'background-color: black;';
}

window.onload = () => {
  generateGrid(16);
};
