let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let numberOfQuestions = document.querySelector(".number-of-questions");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount = 1;
let scoreCount = 0;
let count = 11;
let countdown = 10;
let nextBtn = document.getElementById("next-button");

let countOfQuestion = 1;

const quizArray = [
  {
    id: "0",
    question: "Which is the tallest peak in the world?",
    options: ["Mont Everest", "K2", "Kanchenjunga", "Makalu", "Nanga Parbat"],
    correct: "Mont Everest",
  },

  {
    id: "1",
    question: "What is the height of the tallest peak in the world?",
    options: ["8,848m", "8,456m", "8,611m", "8,598m", "8,516m"],
    correct: "8,848m",
  },

  {
    id: "2",
    question: "How many peaks above 8,000m are in Nepal?",
    options: ["8", "6", "4", "10", "5"],
    correct: "8",
  },

  {
    id: "3",
    question:
      "What is the name of alpinist who has summited Mont Everest the most?",
    options: [
      "Kami Rita Sherpa",
      "Phurba Tashi Sherpa",
      "Mingma Sherpa",
      "Lhakpa Gelu Sherpa",
      "Apa Sherpa",
    ],
    correct: "Kami Rita Sherpa",
  },

  {
    id: "4",
    question: "Which is the tallest peak in Europe?",
    options: ["Mont Blanc", "Mount Elbros", "Dykh-Tau", "Anapurna", "K2"],
    correct: "Mount Elbros",
  },

  {
    id: "5",
    question: "Which is the highest peak in Europe?",
    options: ["Mont Blanc", "Mount Etna", "Mulhacen", "Aneto", "K2"],
    correct: "Mont Blanc",
  },

  {
    id: "6",
    question: "Which  city separates Europe and Asia?",
    options: ["Istanbul", "London", "Paris", "Moscow", "Berlin"],
    correct: "Istanbul",
  },

  {
    id: "7",
    question: "Which is the largest city in Europe?",
    options: ["Istanbul", "Stockholm", "Oslo", "London", "Munich"],
    correct: "Istanbul",
  },

  {
    id: "8",
    question: "Which is the largest city in the World?",
    options: ["Istanbul", "Tokyo", "New York", "London", "Peking"],
    correct: "Tokyo",
  },

  {
    id: "9",
    question: "Which is the biggest country in Europe?",
    options: ["Turkey", "Russia", "Germany", "Sweden", "France"],
    correct: "Russia",
  },
];

restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
  countOfQuestion = 1;
  setCountOfQuestions();
});

function setCountOfQuestions() {
  numberOfQuestions.innerHTML =
    countOfQuestion + " of " + quizArray.length + " questions";
}
//Next Button
nextBtn.addEventListener("click", displayNext);
function displayNext() {
  countOfQuestion += 1;
  questionCount += 1;

  if (questionCount == quizArray.length) {
    displayContainer.classList.add("hide");
    scoreContainer.classList.remove("hide");
    //user score
    userScore.innerHTML =
      "Your score is " + scoreCount + " out of " + questionCount;
  } else {
    setCountOfQuestions();
    quizDisplay(questionCount);
    clearInterval(countdown);
    timerDisplay();
  }
}
const timerDisplay = () => {
  count = 10;
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};
//Display quiz
const quizDisplay = (questionCount) => {
  //if (!count == 0) {
  let quizCards = document.querySelectorAll(".container-mid");

  quizCards.forEach((card) => {
    card.classList.add("hide");
  });

  quizCards[questionCount].classList.remove("hide");
  //}
};

function quizCreator() {
  quizArray.sort(() => Math.random() - 0.5);

  for (let i of quizArray) {
    i.options.sort(() => Math.random() - 0.5);
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");

    //countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";

    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options;
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[4]}</button>
    `;
    quizContainer.appendChild(div);
  }
}
//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  options.forEach((element) => {
    element.disabled = true;
  });
}

function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 11;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};
