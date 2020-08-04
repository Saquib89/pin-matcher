const wrongNotify = document.getElementById('notify-wrong');
const successNotify = document.getElementById('notity-success');

const numberKeyPad = document.querySelector('.numbers');
let userInput = document.getElementById('user-input-pin');

const submitBtn = document.getElementById('submit-btn');

let tryLeft = document.getElementById('numOfTry');
let totalTry = 3;





function hideAllMessage() {
  wrongNotify.style.display = 'none';
  successNotify.style.display = 'none';
}
hideAllMessage();




const generateBtn = document.getElementById('generate-btn');
const generatedPin = document.getElementById('show-pin');

generateBtn.addEventListener('click', function () {
  generatedPin.value = randomRange(1000, 9999);
  submitBtn.disabled = false;
  submitBtn.style.backgroundColor = '#495bc3';
  resetStage();
});

function randomRange(minNum, maxNum) {
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

numberKeyPad.addEventListener('click', function (e) {
  hideAllMessage();
  let targetKey = e.target;
  keyPadInput(targetKey);
});

function keyPadInput(targetKey) {
  if (targetKey.classList.contains('button')) {

    if (targetKey.dataset.type == 'clear') {
      userInput.value = '';
    }
    else if (targetKey.dataset.type == 'backSpace') {
      let inputString = userInput.value;
      userInput.value = inputString.slice(0, inputString.length - 1);
    }
    else {
      const newDigit = targetKey.innerHTML;
      userInput.value += newDigit;
    }
  }

  if (
    targetKey.classList.contains('submit-btn') &&
    generatedPin.value.length > 0
  ) {
    varifyUserInput();
  }
}

function varifyUserInput() {
  if (userInput.value == generatedPin.value) {
    successNotify.style.display = 'block';
  }

  else {
    wrongNotify.style.display = 'block';
    totalTry--;
    tryLeft.innerText = totalTry;

    if (totalTry == 0) {
      submitBtn.disabled = true;
      submitBtn.style.backgroundColor = '#3d4153';
    }
  }
}


function resetStage() {
  totalTry = 3;
  tryLeft.innerText = totalTry;
  userInput.value = '';
  hideAllMessage();
}