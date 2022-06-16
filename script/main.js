let canvas = document.querySelector('.canvas');
let rowsInCanvas = 16;
let columnsInCanvas = 16;

//stop the page from adding anything to canvas if there is something on the canvas
if (canvas.childNodes.length == 0){
setCanvas();
}

function setCanvas(){
  for(let i = 0 ; i < rowsInCanvas ; i++){
    let row = document.createElement('div')
    row.className = 'row';
    row.style.display = 'flex';
    row.style.backgroundColor = 'rgb(224, 224, 224)';
    row.style.flex = '1';
    row.style.gap = '1px'
    
    for(let i = 0 ; i < columnsInCanvas ; i++){
      let cell = document.createElement('div');
      cell.style.flex = '1';
      cell.style.backgroundColor = 'white';
      row.appendChild(cell);
    }
    canvas.appendChild(row);
  }
}

let mouseDown = 0;

let currentColor = 'silver'

canvas.addEventListener('mousemove', (e)=>{
  if (currentTool == 'pencil' && e.target.parentNode.className == 'row' && mouseDown){
  e.target.style.backgroundColor = currentColor;
  } else if (currentTool == 'eraser' && e.target.parentNode.className == 'row' && mouseDown){
    e.target.style.backgroundColor = 'white';
    }
});

document.addEventListener('mousedown', (e)=>{
  ++mouseDown;
});

document.addEventListener('mouseup', (e)=>{
  --mouseDown;
});

let pencil = document.querySelector('.pencil');
let eraser = document.querySelector('.eraser');
let currentTool;
let toolBox = document.querySelector('.tools')
let allBtns = document.querySelectorAll('.btn')

toolBox.addEventListener('click', (e) =>{
  allBtns.forEach(element => {
    element.style.backgroundColor = 'white';
    element.style.boxShadow = 'none';
    element.style.border = 'none'
  });
  currentTool = e.target.classList[1];
  e.target.style.backgroundColor = 'rgb(255, 185, 176)';
  e.target.style.boxShadow = 'inset 0px 0px 34px 10px white';
  e.target.style.border = '2px dotted silver';
})

window.addEventListener('dragstart', (e)=>{
  e.preventDefault();
  return false;
})

resolutionBtn = document.querySelector('.resolution');
function setResolution(){
  let dimension = prompt('please enter a number between 16 and 100.');
  if (dimension < 16 || dimension > 100){
    alert('minimum:16, maximum:100');
    return;
  } else {
    rowsInCanvas = dimension;
    columnsInCanvas = rowsInCanvas;
  }
}

resolutionBtn.addEventListener('click', ()=>{
  clearCanvas();
  setResolution();
  setCanvas();
})

function clearCanvas(){
  for(let i = 0 ; i < rowsInCanvas ; i++){
    canvas.firstChild.remove();
  }
}

canvas.addEventListener('mousedown', (e)=>{
  if (currentTool == 'pencil' && e.target.parentNode.className == 'row'){
  e.target.style.backgroundColor = currentColor;
  }
});

canvas.addEventListener('mousedown', (e)=>{
  if (currentTool == 'eraser' && e.target.parentNode.className == 'row'){
  e.target.style.backgroundColor = 'white';
  }
});

colorPalette = document.querySelector('.palette');

for (let i = 0; i < 12; i++){
  let paletteCell = document.createElement('div');
  colorPalette.appendChild(paletteCell);
}

const paletteABSXII = ['#1c0903', '#433655', '#7e2738', '#495989', '#a23d2a', '#5f6468', '#4b6b68', '#7a5e6e', '#9e5738', '#d2935b', '#a1a6a6', '#d7c9c1'];
const currentPalette = paletteABSXII;

for (let i = 0; i < 12; i++){
  colorPalette.childNodes[i].style.backgroundColor = currentPalette[i];
}

let lastCell = colorPalette.firstChild;
colorPalette.addEventListener('click', (e)=>{
  lastCell.style.boxShadow = 'none';
  lastCell = e.target;
  if (e.target.className != 'palette'){
  currentColor = e.target.style.backgroundColor;
  e.target.style.boxShadow = 'inset 0 0 3px 3px beige';
  }
});