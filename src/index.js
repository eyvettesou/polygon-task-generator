import html2canvas from "html2canvas";

const shapesMap = {
  6: {
    sides: 6,
    svg: "assets/hexagon-regular.svg",
  },
  7: {
    sides: 7,
    svg: "assets/heptagon-regular.svg",
  },
  8: {
    sides: 8,
    svg: "assets/octagon-regular.svg",
  },
  9: {
    sides: 9,
    svg: "assets/nonagon-regular.svg",
  },
  10: {
    sides: 10,
    svg: "assets/decagon-regular.svg",
  },
};

// TO DO: Add drop down that will take in range values for sides
// TO DO: Add input of total number of rows
// TO DO: Add input for total number of items per ro
// TO DO: Add error check if not evenly divisible
// TO DO: Add button for generating shapes


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomShapes({min: min, max: max, totalNum: totalNum}) {
  let index;
  const shapes = [];
  const shapesCount = {};

  for (index = 0; index < totalNum; index++) {
    const randomShape = getRandomInt(min, max);
    shapesCount[randomShape] = shapesCount[randomShape] + 1 || 1;
    shapes.push(randomShape);
  }

  return {
    shapes,
    shapesCount,
  };
}

function createContentContainer() {
  const content = document.createElement("div");
  content.classList.add("content-container");
  return content;
}

function createShapeContainer() {
  const shapeContent = document.createElement("div");
  shapeContent.id = "shape-content";
  return shapeContent;
}

function createRow() {
  const newRow = document.createElement("div");
  newRow.classList.add("row-container");
  return newRow;
}

function createShape(shape) {
  const itemContainer = document.createElement("div");
  itemContainer.classList.add("item-container");
  const img = document.createElement("img");
  img.src = shapesMap[shape].svg;
  img.width = 75;
  const randomDegreesValue = getRandomInt(5, 175);
  img.style.transform = `rotate(${randomDegreesValue}deg)`;
  itemContainer.appendChild(img);
  return itemContainer;
}

function createShapesContent(shapes, shapeContainer){
  const shapeSVGs = document.createElement("div");
  shapeSVGs.classList.add("shape-container");
  shapeSVGs.id = "shape-svgs";
  shapeContainer.appendChild(shapeSVGs);

  let row;

  shapes.forEach((shape, index) => {
    if (index === 0 || !(index % 8)) {
      row = createRow();
      shapeSVGs.appendChild(row);
    }
    const newShape = createShape(shape);
    row.appendChild(newShape);
  });
  
}

function addSolutionsRow(shapesCount, min, max) {
  const solutionsRow = document.getElementById("solutions-row");
  let i;
  for (i = min; i < max + 1; i++) {
    const cell = document.createElement("td");
    cell.innerHTML = shapesCount[i];
    solutionsRow.appendChild(cell);
  }
}

const content = createContentContainer();
const shapeContainer = createShapeContainer();
content.appendChild(shapeContainer);

const minSide = 7;
const maxSide = 10;
const totalNumOfShapes = 24;

const { shapes: shapesList, shapesCount } = getRandomShapes({
  min: minSide,
  max: maxSide,
  totalNum: totalNumOfShapes
});

createShapesContent(shapesList, shapeContainer);
addSolutionsRow(shapesCount, 7, 10);

const app = document.getElementById("content");
app.appendChild(content);

setTimeout(() => {
  const shapeContent = document.getElementById("shape-content");
  const shapeSVGs = document.getElementById("shape-svgs");
  html2canvas(shapeContent).then(function(canvas) {
      shapeContent.removeChild(shapeSVGs);
      shapeContent.appendChild(canvas);
  });
}, 500);

// window.onload = () => {
//   console.log('window loaded')
//   const shapeContent = document.getElementById("shape-content");
//   const shapeSVGs = document.getElementById("shape-svgs");
//   html2canvas(shapeContent).then(function(canvas) {
//       shapeContent.removeChild(shapeSVGs);
//       shapeContent.appendChild(canvas);
//   });
// };
