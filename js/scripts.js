// IMC DATA
const data = [
  {
    min: 0,
    max: 18.4,
    classification: "Menor que 18,5",
    info: "Magreza",
    obesity: "0",
  },
  {
    min: 18.5,
    max: 24.9,
    classification: "Entre 18,5 e 24,9",
    info: "Normal",
    obesity: "0",
  },
  {
    min: 25,
    max: 29.9,
    classification: "Entre 25,0 e 29,9",
    info: "Sobrepeso",
    obesity: "I",
  },
  {
    min: 30,
    max: 39.9,
    classification: "Entre 30,0 e 39,9",
    info: "Obesidade",
    obesity: "II",
  },
  {
    min: 40,
    max: 99,
    classification: "Maior que 40,0",
    info: "Obesidade grave",
    obesity: "III",
  },
];

// Seleção de elementos - DOM

const imcTable = document.querySelector("#imc-table");

const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn");

const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");

const imcNumber = document.querySelector("#imc-number span");
const imcInfo = document.querySelector("#imc-info span");

const backBtn = document.querySelector("#back-btn");


// Funções
function createTable(data) {
  data.forEach((item) => {

    // <div class="table-data">
    //                 <p>25</p>
    //                 <p>Magreza</p>
    //                 <p>|</p>
    //             </div>           ESSA DIV QUE CRIEI ABAIXO PAA ADICIONAR NO HTML

    const div = document.createElement("div");  // criei o elemento
    div.classList.add("table-data"); // inserir a classe nela (já estilizei antes)

    const classification = document.createElement("p");
    classification.innerText = item.classification;

    const info = document.createElement("p");
    info.innerText = item.info;

    const obesity = document.createElement("p");
    obesity.innerText = item.obesity;

    // aqui coloquei os paragrafos dentro da div:
    div.appendChild(classification);
    div.appendChild(info);
    div.appendChild(obesity);
    // e aqui a div (com os paragrafos) dentro da div inc-table:
    imcTable.appendChild(div);
  });
}

function validDigits(text) {
  return text.replace(/[^0-9,]/g, "");
}

function calcImc(height, weight) {
  const imc = (weight / (height * height)).toFixed(1);
  return imc;
}

// AQUI BOTÃO DE LIMPAR
function cleanInputs() {
  heightInput.value = "";
  weightInput.value = "";
  //aqui corrigir a "magreza que ficou com outrra cor"
  imcNumber.className = "";
  imcInfo.className = "";
}

//função esconder html - O TOGGLE inverte (o hide aparece onde não tem e desaparece onde tem)
function showOrHideResults() {
  calcContainer.classList.toggle("hide");
  resultContainer.classList.toggle("hide");
}

// Init - criar e coloca a tabela no html
createTable(data);

// Eventos

//AQUI VALIDAÇÃO PARA O USUARIO
[heightInput, weightInput].forEach((el) => {
  el.addEventListener("input", (e) => {
    const updatedValue = validDigits(e.target.value);

    e.target.value = updatedValue;
  });
});

//aqui para não resetar a pagina
calcBtn.addEventListener("click", (e) => {
  e.preventDefault();
//substituir vírgula por ponto
  const weight = +weightInput.value.replace(",", ".");
  const height = +heightInput.value.replace(",", ".");

  console.log(weight, height);

  if (!weight || !height) return;

  const imc = calcImc(height, weight);
  let info;

  data.forEach((item) => {
    if (imc >= item.min && imc <= item.max) {
      info = item.info;
    }
  });

  if (!info) return;

  imcNumber.innerText = imc;
  imcInfo.innerText = info;


  //Aqui mudar as cores das letras com as classes abaixo
  switch (info) {
    case "Magreza":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;
    case "Normal":
      imcNumber.classList.add("good");
      imcInfo.classList.add("good");
      break;
    case "Sobrepeso":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;
    case "Obesidade":
      imcNumber.classList.add("medium");
      imcInfo.classList.add("medium");
      break;
    case "Obesidade grave":
      imcNumber.classList.add("high");
      imcInfo.classList.add("high");
      break;
  }

  showOrHideResults();
});


//botão limpar
clearBtn.addEventListener("click", (e) => {
  e.preventDefault();

  cleanInputs();
});
// botão voltar
backBtn.addEventListener("click", (e) => {
  cleanInputs();
  showOrHideResults();
});
