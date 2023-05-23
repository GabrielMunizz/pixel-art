const colorContainer = document.querySelector("#color-container");
const colorPalette = document.createElement("ul");
colorContainer.appendChild(colorPalette);
colorPalette.classList.add("color-palette");
colorPalette.id = "color-palette";
//
//
// Cria array de cores. Fiz manualmente, mas pode ser gerado automaticamente atráves de uma função que gera cores rgb.
//
const colors = [
  "black",
  "purple",
  "gold",
  "darkcyan",
  "mediumblue",
  "chartreuse",
  "red",
  "steelblue",
  "blue",
  "green",
  "salmon",
  "pink",
  "crimson",
  "brown",
  "bisque",
  "deeppink",
  "deepskyblue",
];
//
//
// Cria função para gerar no html as cores contidas no array 'colors'.
//
const createColors = (array) => {
  for (let i = 0; i < array.length; i += 1) {
    if (i < 4) {
      const color = document.createElement("li");
      color.style.backgroundColor = array[i];
      color.classList.add("color");
      colorPalette.appendChild(color);
    }
  }
};
createColors(colors); // Chama a função createColors com o array 'colors'
//
//
// Cria botão para gerar cores random
//
const buttonRandom = document.createElement("button");
colorPalette.appendChild(buttonRandom);
buttonRandom.id = "button-random-color";
buttonRandom.innerText = "Cores aleatórias";
//
//
// Adiciona evento click onde o botão vai gerar cores random, porém a cor preta sempre fica na primeira posição [0].
//
buttonRandom.addEventListener("click", () => {
  for (let i = 1; i < 4; i += 1) {
    // For iterando sobre numeros que comecem no indice 1 e termine no 4, pois somente 4 cores serão exibidas na tela.
    const color = document.querySelectorAll(".color"); // Captura 'color' no html e itera sobre ele pulando o indice '[i]' zero [0]. Elemento 'color' foi criado na função 'createColors'.
    color[i].style.backgroundColor =
      colors[Math.floor(Math.random() * (colors.length + 1))]; // Gera um numero random de zero + 1(nunca pega o indice zero) até o numero maximo de cores (color.length) e coloca como valor de backgroundColor.
  }
});
//
//
// Adiciona outro evento click no botão, que salva as cores geradas no localStorage
//
buttonRandom.addEventListener("click", () => {
  const color = document.querySelectorAll(".color");
  const colorVariant = [];
  for (let j = 0; j < color.length; j += 1) {
    colorVariant.push(color[j].style.backgroundColor);
    localStorage.setItem("colorPalette", JSON.stringify(colorVariant));
  }
});
//
//
// Carrega as cores salvas no localStorage, se houver cores salvas.
//
const loadColors = () => {
  const color = document.querySelectorAll(".color");
  const savedColors = JSON.parse(localStorage.getItem("colorPalette"));
  if (savedColors) {
    for (let i = 0; i < color.length; i += 1) {
      color[i].style.backgroundColor = savedColors[i];
    }
  }
};
loadColors();
//
//
// Cria tabuleiro de pixels
//
const board = document.querySelector("#board");
const createBoard = (number) => {
  for (let line = 0; line < number; line += 1) {
    const lineDiv = document.createElement("div");
    lineDiv.id = "pixel-board";

    for (let columm = 0; columm < number; columm += 1) {
      const colummDiv = document.createElement("div");
      colummDiv.classList.add("pixel");
      colummDiv.style.backgroundColor = "#FFFFFF";
      lineDiv.appendChild(colummDiv);
    }
    board.appendChild(lineDiv);
  }
};
createBoard(5);
//
//
// Cria função para deixar a cor preta como padrão selecionado
//
const defaultSelectedColor = () => {
  const color = document.querySelectorAll(".color");
  color[0].classList.add("selected");
};
defaultSelectedColor();
//
//
// Cria função para selecionar cor
//
const selectedColor = () => {
  const color = document.querySelectorAll(".color");
  for (let i = 0; i < color.length; i += 1) {
    color[i].addEventListener("click", (event) => {
      const selected = document.querySelector(".selected");
      selected.classList.remove("selected");
      event.target.classList.add("selected");
    });
  }
};
selectedColor();
//
//
// Cria função para colorir pixel com cor selecionada e salva no localStorage
//
const paintPixel = () => {
  const pixels = document.querySelectorAll(".pixel");
  const colorVariant = [];
  for (let i = 0; i < pixels.length; i += 1) {
    colorVariant[i] = "#FFFFFF";
  }
  board.addEventListener("click", (event) => {
    const resetPixel = document.querySelectorAll(".pixel");
    if (event.target.classList.contains("pixel")) {
      const selected = document.querySelector(".selected");
      event.target.style.backgroundColor = selected.style.backgroundColor;
    }
    for (let j = 0; j < resetPixel.length; j += 1) {
      colorVariant[j] = resetPixel[j].style.backgroundColor;
    }
    localStorage.setItem("pixelBoard", JSON.stringify(colorVariant));
  });
};

paintPixel();
//
//
// Cria função para carregar as cores dos pixels salvas no localStorage
//
const loadPixels = () => {
  const pixels = document.querySelectorAll(".pixel");
  const savedPixels = JSON.parse(localStorage.getItem("pixelBoard"));
  if (savedPixels) {
    for (let i = 0; i < pixels.length; i += 1) {
      pixels[i].style.backgroundColor = savedPixels[i];
    }
  }
};
loadPixels();
//
//
// Cria botão para limpar o board //
//
const clearBtn = document.createElement("button");
const clearBtnContainer = document.querySelector("#clear-button-container");
clearBtnContainer.appendChild(clearBtn);
clearBtn.id = "clear-board";
clearBtn.innerText = "Limpar pixels";
//
//
// Função que coloca o fundo do board padrão branco
//
const whiteBoard = () => {
  const pixels = document.querySelectorAll(".pixel");
  const colorVariant = [];
  for (let i = 0; i < pixels.length; i += 1) {
    pixels[i].style.backgroundColor = "#FFFFFF";
    colorVariant.push(pixels[i].style.backgroundColor);
    colorVariant.push(pixels[i].style.backgroundColor);
    localStorage.setItem("pixelBoard", JSON.stringify(colorVariant));
  }
};
//
//
// Cria evento click no botão para limpar o board //
//
clearBtn.addEventListener("click", whiteBoard);
//
//
// Cria um input que permite usuario a selecionar o tamanho do board //
//
const inputSize = document.createElement("input");
const sizeContainer = document.querySelector("#size-button-container");
inputSize.id = "board-size";
inputSize.type = "number";
inputSize.min = "1";
inputSize.max = "20";
inputSize.placeholder = "Got pixels?";
sizeContainer.appendChild(inputSize);
//
//
// Cria botão VQV //
//
const sizeButton = document.createElement("button");
sizeButton.id = "generate-board";
sizeButton.innerText = "VQV";
sizeContainer.appendChild(sizeButton);
sizeButton.addEventListener("click", (event) => {
  board.innerHTML = "";
  let parsedInputValue = parseInt(inputSize.value);
  if (parsedInputValue < 5 && parsedInputValue > 0) {
    parsedInputValue = 5;
  } else if (parsedInputValue > 50) {
    parsedInputValue = 50;
  } else if (!parsedInputValue) {
    alert("Board inválido!");
    createBoard(5);
  }
  createBoard(parsedInputValue);
  localStorage.setItem("boardSize", JSON.stringify(parsedInputValue));
});
//
//
// Cria função que carrega o tamanho do board
//
const loadBoard = () => {
  const savedBoard = JSON.parse(localStorage.getItem("boardSize"));
  if (savedBoard) {
    board.innerHTML = "";
    createBoard(savedBoard);
  }
  loadPixels();
};
loadBoard();
//
//
// Cria dark mode no input #change-theme //
//
const changeTheme = document.querySelector("#change-theme");
const body = document.querySelector("body");
const titleP = document.querySelector(".title-container");
const header = document.querySelector("header");
const getPalette = document.querySelector("#color-palette");
const footer = document.querySelector("footer");
changeTheme.addEventListener("change", () => {
  if (changeTheme.checked) {
    body.classList.add("dark");
    titleP.classList.add("dark-title");
    getPalette.classList.add("dark-palette");
    header.classList.add("dark-header");
    footer.classList.add("dark-footer");
    clearBtn.id = "dark-clear";
    sizeButton.id = "dark-generate";
  } else {
    body.classList.remove("dark");
    titleP.classList.remove("dark-title");
    getPalette.classList.remove("dark-palette");
    header.classList.remove("dark-header");
    footer.classList.remove("dark-footer");
    clearBtn.id = "clear-board";
    sizeButton.id = "generate-board";
  }
});
// Código de animação do titulo Pixel Art, fonte : https://codepen.io/Coding_Journey/pen/BEMgbX //
//
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["ART"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // On DOM Load initiate the effect
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});
//
// Fim do código do site //
