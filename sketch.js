// general
let canvas;
let margin = 21;
let marginLarge = margin * 2;
let marginSmall = margin * 0.5;
let bgColor = "#272553";

// fretboard
let fbColor = "#1e1b36";
let fbsColor = "#38358b";
let fretboardHeight;
let fretboardWidth;
let fretboardY;
let fretboardX = margin;

// strings
let numberOfStrings = 6;
let strColor = "#969cd1";
let strX0;
let strX1;
let strY0;
let strLen;
let stringSpacing;

let strings = [];

// frets
let TET = 12.0;
let fretColor = "#c7699a";
let numberOfFrets = 16;
let ratios = [];
let fretPositions = [];

let fretClickableStroke = "#8e3672";
let fretClickableFill = "#c7699a";
let fretClickableHighlight = "#6669c6";

// buttons
let buttons = [];

// scale
let scaleClickableStroke = fretClickableStroke;
let scaleClickableFill = fretClickableFill;
let scaleClickableActive = "#6dbf8a";
let scale = [0, 2, 5, 7, 10];
let tuning = [7, 0, 5, 10, 2, 7];


function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  initSizes();

  initRatios();
  initFretPositions();
  initStrings();

  initButtons();

  init12TETeMajor();
}

function draw() {
  background(bgColor);
  drawFretboard();
  drawFrets();
  drawStrings();

  drawButtons();
}

function init12TETeMajor() {
  for (let i = 0; i < strings.length; i++) {
    strings[i].baseNote = tuning[i];
  }
}

function clearScale() {
  scale = [];
}

function initButtons() {
  buttons = [];
  let addFretButton = new ClickableCircle(
    fretboardX + fretboardWidth,
    fretboardY + fretboardHeight + marginLarge,
    30, "#000000", "#ffffff");
  addFretButton.setFunction(addFret);

  let removeFretButton = new ClickableCircle(
    fretboardX + fretboardWidth - marginLarge,
    fretboardY + fretboardHeight + marginLarge,
    30, "#000000", "#ffffff");
  removeFretButton.setFunction(removeFret);

  let increaseTETButton = new ClickableCircle(
    fretboardX + fretboardWidth,
    fretboardY + fretboardHeight + marginLarge * 2,
    30, "#000000", "#ffffff");
  increaseTETButton.setFunction(increaseTET);

  let decreaseTETButton = new ClickableCircle(
    fretboardX + fretboardWidth - marginLarge,
    fretboardY + fretboardHeight + marginLarge * 2,
    30, "#000000", "#ffffff");
  decreaseTETButton.setFunction(decreaseTET);

  buttons.push(removeFretButton);
  buttons.push(addFretButton);
  buttons.push(increaseTETButton);
  buttons.push(decreaseTETButton);

  // scale buttons
  for (let i = 0; i < TET; i++) {
    let x = map(i, 0, TET - 1, fretboardX, fretboardX + fretboardWidth);
    let b = new ClickableCircle(
      x,
      fretboardY - marginLarge,
      30,
      scaleClickableStroke, scaleClickableFill, scaleClickableActive
    );
    b.note = i;
    b.setFunction(() => {
      b.toggle = !b.toggle;
      if (b.toggle) {
        scale.push(b.note);
      } else {
        const index = scale.indexOf(b.note);
        if (index > -1) {
          scale.splice(index, 1);
        }
      }
      let tmp = b.fillCol;
      b.fillCol = b.altCol;
      b.altCol = tmp;
      scale = scale.sort((a, b) => a - b);
    });
    if (scale.includes(i)) {
      b.toggle = true;
      let tmp = b.fillCol;
      b.fillCol = b.altCol;
      b.altCol = tmp;
    }

    buttons.push(b);
  }
}

function decreaseTET() {
  TET -= 1;
  reInit();
}

function increaseTET() {
  TET += 1;
  reInit();
}

function removeFret() {
  numberOfFrets -= 1;
  reInit();
}

function addFret() {
  numberOfFrets += 1;
  reInit();
}

function reInit() {
  initSizes();

  initRatios();
  initFretPositions();
  initStrings();

  initButtons();
}

function mousePressed() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].tryClick();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initSizes();
  initFretPositions();
  initStrings();
  initButtons();
}

function initSizes() {
  fretboardHeight = max(windowHeight * 0.5, 300);
  fretboardY = (windowHeight - fretboardHeight) / 2;
  fretboardWidth = max(windowWidth - 2 * margin, 800);

  strX0 = fretboardX + marginLarge;
  strX1 = fretboardX + fretboardWidth - marginLarge;
  strLen = strX1 - strX0;
  stringSpacing = (fretboardHeight - 2 * marginLarge) / (numberOfStrings - 1);

  strY0 = fretboardY + marginLarge;
}

function initRatios() {
  ratios = [];
  for (let i = 0; i < numberOfFrets; i++) {
    ratios.push(pow(2, i * (1.0 / TET)));
  }
}

function initFretPositions() {
  let lastR = pow(2, (numberOfFrets - 1) * (1.0 / TET));
  let modL = strLen / (1 - 1.0 / lastR);
  fretPositions = [];
  for (let i = 0; i < numberOfFrets; i++) {
    let pos = (1 - 1.0 / ratios[i]) * modL + strX0;
    fretPositions.push(pos);
  }
}

function initStrings() {
  strings = [];
  for (let i = 0; i < numberOfStrings; i++) {
    let y = strY0 + stringSpacing * i;
    strings.push(new String(strX0, y, strX1, y));
  }
}

function drawButtons() {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].display();
  }
}

function drawFretboard() {
  fill(fbColor);
  stroke(fbsColor);
  strokeWeight(5);
  rect(fretboardX, fretboardY, fretboardWidth, fretboardHeight);
}

function drawStrings() {

  for (const s of strings) {
    s.display();
  }
}

function drawFrets() {
  stroke(fretColor);
  strokeWeight(3);
  for (let i = 0; i < numberOfFrets; i++) {
    let pos = fretPositions[i];
    let add = 0;
    if (i == 0 || i == numberOfFrets - 1)
      add = margin;
    line(
      pos,
      strY0 - marginSmall - add,
      pos,
      marginSmall + add + strY0 + stringSpacing * (numberOfStrings - 1));
  }
}