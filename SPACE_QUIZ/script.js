const quizData = [
    {
        question: 'How many planets are there in the solar system?',
        options: ['5', '8', '9', '6'],
        answer: '8',
    },
    {
        question: 'What is the largest planet in our solar system?',
        options: ['Mars', 'Saturn', 'Jupiter', 'Neptune'],
        answer: 'Jupiter',
    },
    {
        question: 'What is the name of the galaxy in which we reside?',
        options: ['Andromeda', 'Milky way', 'Pinwheel', 'Cygnus A'],
        answer: 'Milky way',
    },
    {
        question: 'To which planet the NASA has sent its rovers to?',
        options: ['Venus', 'Jupiter', 'Neptune', 'Mars'],
        answer: 'Mars',
    },
    {
        question: 'What is the name of the spacecraft that has reached the farthest distance from our planet?',
        options: [
            'Cassini',
            'Voyager 1',
            'Chandrayaan ',
            'Voyager 2',
        ],
        answer: 'Voyager 1',
    },
    {
        question: 'When was a black hole first photographed?',
        options: ['2008', '1998', '2019', '1978'],
        answer: '2019',
    },
    {
        question: 'Who first told about the existence of gravitational waves?',
        options: [
            'Ptolemy',
            'Albert Einstein',
            'Aristotle',
            'Issac Newton',
        ],
        answer: 'Albert Einstein',
    },
    {
        question: 'Which planet is known as the Red Planet?',
        options: ['Mars', 'Venus', 'Mercury', 'Uranus'],
        answer: 'Mars',
    },
    {
        question: 'Which country sent the first man to space',
        options: [
            'USA',
            'Australia',
            'Russia',
            'UK',
        ],
        answer: 'Russia',
    },
    {
        question: 'Which county landed first on the southpole of the moon?',
        options: ['China', 'India', 'Japan', 'USA'],
        answer: 'India',
    },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');
const startButton = document.getElementById('start');
const progressBar = document.createElement('div');
progressBar.className = 'progress-bar';

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];
let timer;
let timeLimit = 10; // Time limit in seconds

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestion() {
    clearInterval(timer);
    const questionData = quizData[currentQuestion];

    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    for (let i = 0; i < shuffledOptions.length; i++) {
        const option = document.createElement('label');
        option.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = shuffledOptions[i];

        const optionText = document.createTextNode(shuffledOptions[i]);

        option.appendChild(radio);
        option.appendChild(optionText);
        optionsElement.appendChild(option);
    }

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
    quizContainer.appendChild(progressBar);

    startTimer();
}

function startTimer() {
    let timeRemaining = timeLimit;
    progressBar.style.width = '100%';
    progressBar.style.backgroundColor = '#317698';

    timer = setInterval(() => {
        timeRemaining--;
        progressBar.style.width = (timeRemaining / timeLimit) * 100 + '%';
        if (timeRemaining < 5) {
            progressBar.style.backgroundColor = '#cd5f1f';
        }
        if (timeRemaining <= 0) {
            clearInterval(timer);
            checkAnswer();
        }
    }, 1000);
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
        const answer = selectedOption.value;
        if (answer === quizData[currentQuestion].answer) {
            score++;
        } else {
            incorrectAnswers.push({
                question: quizData[currentQuestion].question,
                incorrectAnswer: answer,
                correctAnswer: quizData[currentQuestion].answer,
            });
        }
        currentQuestion++;
        selectedOption.checked = false;
        if (currentQuestion < quizData.length) {
            displayQuestion();
        } else {
            displayResult();
        }
    } else {
        incorrectAnswers.push({
            question: quizData[currentQuestion].question,
            incorrectAnswer: 'No answer',
            correctAnswer: quizData[currentQuestion].answer,
        });
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            displayQuestion();
        } else {
            displayResult();
        }
    }
}

function displayResult() {
    quizContainer.classList.add('hide');
    submitButton.classList.add('hide');
    retryButton.classList.remove('hide');
    showAnswerButton.classList.remove('hide');
    resultContainer.innerHTML = `<p class="final-score">You scored ${score} out of ${quizData.length}!</p>`;
}

function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.classList.remove('hide');
    submitButton.classList.remove('hide');
    retryButton.classList.add('hide');
    showAnswerButton.classList.add('hide');
    resultContainer.innerHTML = '';
    displayQuestion();
}

function showAnswer() {
    quizContainer.classList.add('hide');
    submitButton.classList.add('hide');
    retryButton.classList.remove('hide');
    showAnswerButton.classList.add('hide');

    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
        incorrectAnswersHtml += `
         <div class="answer-section">
            <p class="question">Question: ${incorrectAnswers[i].question}</p>
            <p class="incorrect-answer">Your Answer: ${incorrectAnswers[i].incorrectAnswer}</p>
            <p class="correct-answer">Correct Answer: ${incorrectAnswers[i].correctAnswer}</p>
        </div>
      `;
    }

    resultContainer.innerHTML = `
      <p class="final-score">You scored ${score} out of ${quizData.length}!</p>
      <div class="incorrect-answers">
        ${incorrectAnswersHtml}
      </div>
    `;
}

startButton.addEventListener('click', () => {
    startButton.classList.add('hide');
    quizContainer.classList.remove('hide');
    submitButton.classList.remove('hide');
    displayQuestion();
});

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);
