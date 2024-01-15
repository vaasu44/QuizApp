const qusns = [
  {
    qusn: "What is largest animal in the world?",
    ans: [
      { text: "shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    qusn: "What is largest desert in the world?",
    ans: [
      { text: "Kalahari", correct: false },
      { text: "Gobi", correct: false },
      { text: "Sahara", correct: false },
      { text: "Antarctica", correct: true },
    ],
  },
  {
    qusn: "Grand Central Terminal, Park Avenue, New York is the world's ? ",
    ans: [
      { text: "largest railway station", correct: true },
      { text: "highest railway station", correct: false },
      { text: "longest railway station", correct: false },
      { text: "None of the above", correct: false },
    ],
  },
  {
    qusn: "Garampani sanctuary is located at",
    ans: [
      { text: "Junagarh, Gujarat", correct: false },
      { text: "Diphu, Assam", correct: true },
      { text: "Kohima, Nagaland", correct: false },
      { text: "Gangtok, Sikkim", correct: false },
    ],
  },
  {
    qusn: "Where is India's Silicon Valley located?",
    ans: [
      { text: "Banglore", correct: true },
      { text: "Chennai", correct: false },
      { text: "kolkata", correct: false },
      { text: "Mumbai", correct: false },
    ],
  },
  {
    qusn: "The ratio of width of our National flag to its length is ",
    ans: [
      { text: "3:5", correct: false },
      { text: "2:3", correct: true },
      { text: "2:4", correct: false },
      { text: "3:4", correct: false },
    ],
  },
  {
    qusn: "'Dandia' is a popular dance of",
    ans: [
      { text: "Punjab", correct: false },
      { text: "Tamil Nadu", correct: false },
      { text: "Gujarat", correct: true },
      { text: "Maharashtra", correct: false },
    ],
  },
  {
    qusn: "Mohiniattam dance from developed originally in which state?",
    ans: [
      { text: "Tamil Nadu", correct: false },
      { text: "Orissa", correct: false },
      { text: "Kerala", correct: true },
      { text: "Karnataka", correct: false },
    ],
  },
  {
    qusn: "The book of Parsis is",
    ans: [
      { text: "Toraht", correct: false },
      { text: "Bible", correct: false },
      { text: "Gita", correct: false },
      { text: "Zend Avesta", correct: true },
    ],
  },
  {
    qusn: "Who wrote the famous book - 'We the people'?",
    ans: [
      { text: "Nani Palkhivala", correct: true },
      { text: "T.N.Kaul", correct: false },
      { text: "Khushwant Singh", correct: false },
      { text: "J.R.D. Tata", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timeCount = document.querySelector(".time-sec");

let currentQusnIndex = 0;
let score = 0;

function startQuiz() {
  currentQusnIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQusn = qusns[currentQusnIndex];
  let qusnNo = currentQusnIndex + 1;
  questionElement.innerHTML = qusnNo + ". " + currentQusn.qusn;

  currentQusn.ans.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button); //displaying inside div
    if (answer.correct) {
      button.dataset.correct = answer.correct; //storing data in dataset attribute of HTML
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  clearInterval(counter);
  const selectedBtn = e.target;
  const correctBtn = selectedBtn.dataset.correct === "true";
  if (correctBtn) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQusnIndex++;
  if (currentQusnIndex < qusns.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  const scoreText = document.getElementById("score-text");
  scoreText.innerHTML = ` You scored ${score} out of ${qusns.length} !`;
  document.querySelector(".result").style.display = "flex";
  document.querySelector(".app").style.display = "none";
}

nextButton.addEventListener("click", () => {
  if (currentQusnIndex < qusns.length) {
    handleNextButton();
    clearInterval(counter);
    StartTimer(timeValue);
  } else {
    //startQuiz();
    showScore();
  }
});

const instruction = document.querySelector(".instructions ");
document.getElementById("start").addEventListener("click", () => {
  instruction.style.display = "block";
  document.getElementById("start-sess").style.display = "none";
});

document.getElementById("continue").addEventListener("click", () => {
  document.querySelector(".app").style.display = "block";
  instruction.style.display = "none";
  startQuiz();
  StartTimer(timeValue);
});

document.getElementById("exit").addEventListener("click", () => {
  document.getElementById("start-sess").style.display = "flex";
  instruction.style.display = "none";
});

document.getElementById("restart").addEventListener("click", () => {
  document.querySelector(".app").style.display = "block";
  document.querySelector(".result").style.display = "none";
  startQuiz();
  clearInterval(counter);
  StartTimer(timeValue);
});

document.getElementById("quit").addEventListener("click", () => {
  window.location.reload();
});

let counter;
let timeValue = 15;

function StartTimer(time) {
  counter = setInterval(timer, 1000);

  function timer() {
    timeCount.textContent = time;
    time--;

    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      timeCount.textContent = "00";
      clearInterval(counter);
      showScore();
      //StartTimer(timeValue);
    }
  }
}
