const testButton = document.querySelector('#test-button');
const mainGrid = document.querySelector('.main-grid');

testButton.addEventListener('click', () => {
  console.log('Working');
});

function generateGrid(rows, cols) {
  mainGrid.style.cssText = `grid-template-rows: repeat(${rows}, 1fr);grid-template-columns: repeat(${cols}, 1fr);`;

  for (let item = 0; item < rows * cols; item++) {
    let newCell = document.createElement('div');
    newCell.innerText = item + 1;
    mainGrid.appendChild(newCell).className = 'grid-item';
  }
}

generateGrid(16, 16);
