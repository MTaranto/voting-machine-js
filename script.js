// declaring interface controls variables
let seuVotoPara = document.querySelector('.up-left-up span');
let charge = document.querySelector('.up-left-charge span');
let description = document.querySelector('.up-left-desc');
let warning = document.querySelector('.down');
let aside = document.querySelector('.up-right');
let numbers = document.querySelector('.up-left-numbers');

// declaring environment controls variables

let currentStage = 0;
let number = '';
let whiteVote = false;

startStage();

// create functions

function interfaceUpdate() {
  let stage = stages[currentStage];
  let applicant = stage.applicants.filter((item)=>{
    if(item.number===number) {
      return true;
    } else {
      return false;
    }
  });
  if(applicant.length>0) {
    applicant = applicant[0];
    seuVotoPara.style.display = 'block';
    description.innerHTML = `Nome: ${applicant.name}<br>Partido: ${applicant.party}`
    warning.style.display = 'block';
    let picturesHtml = '';
      for(let i in applicant.pictures) {
        picturesHtml += `<div class="up-right-image"><img src="${applicant.pictures[i].url}" alt="">${applicant.pictures[i].legend}</div>`;
      } 
    aside.innerHTML = picturesHtml;
    } else {
      applicant = applicant[0];
      seuVotoPara.style.display = 'block';
      description.innerHTML = `NÚMERO ERRADO<br><br><div class="null--warning">VOTO NULO</div>`
      warning.style.display = 'block';

  }
  console.log('Candidato', applicant);
}

function startStage() {
  let stage = stages[currentStage];
  let numberHtml = '';
  number = '';
  whiteVote = false;

  
  for(let i=0;i<stage.numbers;i++) {
    if(i===0) {
      numberHtml += '<div class="number blink"></div>'
    } else {
    numberHtml += '<div class="number"></div>'
    }
  }
  seuVotoPara.style.display = 'none';
  charge.innerHTML = stage.title;
  description.innerHTML = '';
  warning.style.display = 'none';
  aside.innerHTML = '';
  numbers.innerHTML = numberHtml;
}

function clicked(n) {
  let elNumber = document.querySelector('.number.blink');
  if(elNumber !== null) {
    elNumber.innerHTML = n;
    number = `${number}${n}`;

    elNumber.classList.remove('blink');
    if(elNumber.nextElementSibling !== null) {
      elNumber.nextElementSibling.classList.add('blink'); // search for the next element
    } else {
      interfaceUpdate();
    }
  }
}
function white() {
  if(number==='') {
    whiteVote = true;
    seuVotoPara.style.display = 'block';
    numbers.innerHTML = '';
    description.innerHTML = `<div class="white--warning">VOTO EM BRANCO</div>`
    warning.style.display = 'block';
  } else {
    alert('Para votar em BRANCO o campo de voto deve estar vazio. Aperte CORRIGE para apagar o campo de voto.')
  }
}
function revise() {
  startStage();  
}
function vote() {
  let stage = stages[currentStage];

  if(whiteVote===true) {
    console.log('Branco confirmado');
  } else if(number.length===stage.numbers) {
    console.log('Voto confirmado '+number);
  } else if(number.length===2) {
    alert('Você esta votando na Legenda '+number)
  }
  {
    alert('Para CONFIRMAR é necessário digitar pelo menos o número do partido ou votar em BRANCO.')
  }
  
}