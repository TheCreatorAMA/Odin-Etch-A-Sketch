const mainGrid = document.querySelector('.main-grid');
const clearGridButton = document.querySelector('#clear-grid');

// This is here to simulate mouse "held" state
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

clearGridButton.addEventListener('click', clearGrid);

function generateGrid(rows, cols) {
  // To generate grid using css-grid.
  mainGrid.style.cssText = `grid-template-rows: repeat(${rows}, 1fr);grid-template-columns: repeat(${cols}, 1fr);`;

  for (let item = 0; item < rows * cols; item++) {
    let newCell = document.createElement('div');

    // Event listener to
    newCell.addEventListener('mouseover', changeColor);
    newCell.addEventListener('mousedown', changeColor);
    newCell.style.cssText = `width: ${1 / (rows * cols)}%;height: ${1 / (rows * cols)}%~S;`;
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

generateGrid(16, 16);
