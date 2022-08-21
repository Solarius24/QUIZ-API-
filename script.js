async function generatquestion() {
  let response = await fetch(
    "https://opentdb.com/api.php?amount=10&type=boolean"
  );
  let data = await response.json();
  quizForm(data);
  button(data);
}
const quiz = document.getElementById("quiz-container");
const trueBtn = document.getElementById("true");
const falseBtn = document.getElementById("false");
let scores = document.getElementById("score");
const reload = document.getElementById('reload')
let score = 0;
let currentQuestion = 0;

function quizForm(data) {
  if (currentQuestion <= 9) {
    document.getElementById("question_number").innerHTML = `Question no: ${
      currentQuestion + 1
    }`;
    document.getElementById(
      "category"
    ).innerHTML = `Category: ${data.results[currentQuestion].category}`;
    document.getElementById(
      "difficulty"
    ).innerHTML = `Difficulty: ${data.results[currentQuestion].difficulty}`;
    document.getElementById(
      "question"
    ).innerHTML = `Question: ${data.results[currentQuestion].question}`;
  } else if (currentQuestion > 9) {
    quiz.style.display = "none";
    reload.style.display = 'inline-block'
    scores.style.display = "block";
    scores.innerHTML = `
  <h2>You answered ${score}/${currentQuestion} questions correctly</h2>`;
  }
}

function button(data) {
  trueBtn.addEventListener("click", () => {
    if (data.results[currentQuestion].correct_answer == "True") {
      score++;
    }
    currentQuestion++;
    quizForm(data);
  });

  falseBtn.addEventListener("click", () => {
    if (data.results[currentQuestion].correct_answer == "False") {
      score++;
    }
    currentQuestion++;
    quizForm(data);
  });
}

reload.addEventListener('click', () => {
window.location.reload()
})


generatquestion();
