export function addElement(elem, className, parent){
  let item = document.createElement(elem);
  item.className = className;
  parent.append(item);
  return item;
}

export function createAndFillButton(button, kind ,text){
  button.type = kind;
  button.textContent = text;
}

function rotateMatrix(matrix) {
  const rotateArr = matrix;
  const len = rotateArr.length;

  for (let i = 0; i < len / 2; i += 1) {
    for (let j = i; j < len - i - 1; j += 1) {
      const item = rotateArr[i][j];
      const lenJ = len - j - 1;
      const lenI = len - i - 1;

      rotateArr[i][j] = rotateArr[lenJ][i];
      rotateArr[lenJ][i] = rotateArr[lenI][lenJ];
      rotateArr[lenI][lenJ] = rotateArr[j][lenI];
      rotateArr[j][lenI] = item;
    }
  }
  return rotateArr;
}

export function createTooltips(matrix){
  let arr = [];
  matrix.forEach((element) => {
    let line = [];
    let index = 0;
    for(let i = 0; i < element.length; i++){
      if (element[i] === 1){
        index ++;
      }
      if(element[i] === 0 || i === element.length -1){
        line.push(index);
        index = 0;
      }
    }
    arr.push(line.filter(x => x !== 0))
  })
  return arr;
}


export function addTooltips(arr, parent, container, line, grid){
  const containerLeftTooltips = addElement('div', container, parent);
  for(let j = 0; j < arr.length; j++){
    const nonogramLine = addElement('div',line, containerLeftTooltips);
    for(let i = 0; i < arr[j].length; i++){
      let tooltipsGrid = addElement('div', grid, nonogramLine);
      tooltipsGrid.textContent = arr[j][i];
    }
  }
}

export function addNonogram(nonogram, parent){
  addTooltips(createTooltips(nonogram), parent, 'playing-field__container-left-tooltips', 'left-tooltips__line', `left-tooltips__grid`);
  addTooltips(createTooltips(rotateMatrix(nonogram)), parent, 'playing-field__container-top-tooltips', 'top-tooltips__line', `top-tooltips__grid`);
  rotateMatrix(rotateMatrix(rotateMatrix(nonogram)));
  const containerCodedImage = addElement('div', 'nonogram__container-coded-image', parent);
    for(let j = 0; j < nonogram.length; j++){
      const nonogramLine = addElement('div','coded-image__line', containerCodedImage);
      for(let i = 0; i < nonogram[j].length; i++){
        addElement('div',`coded-image__grid`, nonogramLine);
    }
  }
}

export function createMatrixGame(line){
  let arr =[]
  for(let j = 0; j < line.length; j ++){
    arr.push(Array(line.length).fill(0));
  }
  return arr.flat();
}

export function createRandomNonogram(obj){
  const indexRandom = Object.keys(obj)[Math.floor(Math.random() * Object.keys(obj).length)];
  return obj[indexRandom]
}