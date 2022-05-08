const mainGrid = document.querySelector('.main-grid');

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function generateGrid(rows, cols) {
  mainGrid.style.cssText = `grid-template-rows: repeat(${rows}, 1fr);grid-template-columns: repeat(${cols}, 1fr);`;

  for (let item = 0; item < rows * cols; item++) {
    let newCell = document.createElement('div');

    // Event listener to
    newCell.addEventListener('mouseover', changeColor);
    newCell.addEventListener('mousedown', changeColor);
    newCell.style.cssText = `width: ${1 / (rows * cols)};height: 1/(rows * cols)}%;`;
    mainGrid.appendChild(newCell).className = 'grid-item';
  }
}

function changeColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return;
  e.target.style.cssText = 'background-color: black;';
}

generateGrid(16, 16);
