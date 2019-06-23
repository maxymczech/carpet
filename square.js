//2d array for room
const roomSize = 6;
let room = new Array(roomSize).fill(null).map(() => new Array(roomSize).fill(null));
room[0][0] = 6;
room[1][3] = 4;
room[2][3] = 6;
room[3][4] = 6;
room[4][0] = 4;
room[4][1] = 4;
room[5][5] = 6;

//List of available figures
const figures = [
  {letter: 'a', color: '#6eacaa', w: 2, h: 2},
  {letter: 'b', color: '#bc7b33', w: 1, h: 6},
  {letter: 'c', color: '#a6a623', w: 1, h: 4},
  {letter: 'd', color: '#6a679e', w: 3, h: 2},
  {letter: 'e', color: '#965186', w: 2, h: 3},
  {letter: 'f', color: '#b5313f', w: 4, h: 1},
  {letter: 'g', color: '#6e9b5b', w: 1, h: 6},
];

function rotateFigure(figure){
  return Object.assign(Object.assign({}, figure), {w: figure.h, h: figure.w});
}

function printRoom(room){
  console.log(room.map(row => row.map(item => item || '.').join('')).join("\n"));
}

function deepCopy(room){
  return JSON.parse(JSON.stringify(room));
}

function canPlace(room, figure, at){
  const area = figure.w * figure.h;
  let row, col;
  if(at.row + figure.h > roomSize || at.col + figure.w > roomSize){
    return false;
  }
  for(row = at.row; row < at.row + figure.h; row++){
    for(col = at.col; col < at.col + figure.w; col++){
      if(![null, area].includes(room[row][col])){
        return false;
      }
    }
  }
  return true;
}

function placeFigure(room, figure, at){
  let newRoom = deepCopy(room);
  for(row = at.row; row < at.row + figure.h; row++){
    for(col = at.col; col < at.col + figure.w; col++){
      newRoom[row][col] = figure.letter;
    }
  }
  return newRoom;
}

let count = 0;

function main(room, figures){
  let i, row, col;
  //printRoom(room);
  //console.log('');
  count++;
  if(!figures.length){
    printRoom(room);
    return;
  }
  for(let i = 0; i < figures.length; i++){
    let fig = figures[i];
    for(row = 0; row <= roomSize - fig.h; row++){
      for(col = 0; col <= roomSize - fig.w; col++){
        let at = {row, col};
        if(canPlace(room, fig, at)){
          let newRoom = placeFigure(room, fig, at);
          main(newRoom, figures.filter((item, index) => index != i));
        }
        if(fig.w != fig.h){
          let rotated = rotateFigure(fig);
          if(canPlace(room, rotated, at)){
            let newRoom = placeFigure(room, rotated, at);
            main(newRoom, figures.filter((item, index) => index != i));
          }
        }
      }
    }
  }
}

main(room, figures);
console.log(count);
