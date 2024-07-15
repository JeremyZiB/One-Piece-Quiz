const questions = [
    {
        question: "What was the first island the Strawhats visited after entering the Grand Line?",
        answers: [
            { text: "Alabasta", correct: false},
            { text: "Dressrosa", correct: false},
            { text: "Whisky Peak", correct: true},
            { text: "Laugh Tale", correct: false},
        ]
    },
    {
        question: "What is Cyborg Franky's real name?",
        answers: [
            { text: "Gol D. Roger", correct: false},
            { text: "Iceberg", correct: false},
            { text: "Franky", correct: false},
            { text: "Cutty Flam", correct: true},
        ]
    },
    {
        question: "Who was the King of the Pirates?",
        answers: [
            { text: "Gol D. Roger", correct: true},
            { text: "Rocks D. Xebec", correct: false},
            { text: "Monkey D. Garp", correct: false},
            { text: "Edward Newgate", correct: false},
        ]
    },
    {
        question: "What is the One Piece?",
        answers: [
            { text: "Money", correct: false},
            { text: "A Devil Fruit", correct: false},
            { text: "The friends we made along the way", correct: true},
            { text: "The secrets of the world", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();