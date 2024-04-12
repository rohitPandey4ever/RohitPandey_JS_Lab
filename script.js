const questions = [
    {
        question: "Which is the largest continent in the world?",
        answers: [
            { text: "Africa", correct: false },
            { text: "Australia", correct: false },
            { text: "Asia", correct: true },
            { text: "Antarctica", correct: false }
        ]
    },
    {
        question: "How many heading tags are there in the HTML?",
        answers: [
            { text: "4", correct: false },
            { text: "8", correct: false },
            { text: "6", correct: true },
            { text: "5", correct: false }
        ]
    },
    {
        question: "How many alphabets are there in the word 'JAVASCRIPT'?",
        answers: [
            { text: "9", correct: false },
            { text: "10", correct: true },
            { text: "11", correct: false },
            { text: "9.5", correct: false }
        ]
    },
    {
        question: "What is the default size for the text field?",
        answers: [
            { text: "10", correct: false },
            { text: "15", correct: false },
            { text: "20", correct: true },
            { text: "25", correct: false }
        ]
    }
]

let question = document.getElementById('question')
let answerButtons = document.querySelector('.buttons')
let nextButton = document.getElementById('next')
let showQno = document.querySelector('#showQno')
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    // nextButton.innerHTML = "Next"
    showQuestion()
}


function showQuestion() {
    resetQ()
    // Setting Question
    let currentQ = questions[currentQuestionIndex];
    let Qno = currentQuestionIndex + 1
    question.innerHTML = Qno + '.' + currentQ.question;
    showQno.innerHTML = `Question ${Qno} of ${questions.length}`

    //Setting Answers
    answerButtons.innerHTML = "";
    currentQ.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
    })

    // nextButton.style.display = 'block'
}

function resetQ() {
    showQno.innerHTML = "";
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(event) {
    let selectedBtn = event.target
    let isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add('correct')
        score++
    } else {
        selectedBtn.classList.add('incorrect')
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    })

    nextButton.style.display = 'block'
}

function showScore() {
    resetQ();
    question.innerHTML = `You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = 'Play Again'
    nextButton.style.display = 'block'
}

function handleNextButton() {
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length) {
        showQuestion()
    } else {
        showScore()
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton()
    } else {
        startQuiz()
    }
})


startQuiz()