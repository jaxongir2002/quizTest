const questions = [
    {
        question:"Azamat qani",
        answers:[
            { text:"uxlayapdi",correct:false },
            { text:"yo'lda",correct:true },
            { text:"men qaydan bilay",correct:false },
            { text:"shunaqa",correct:false },
        ]
    },
    {
        question:"qanday ozi",
        answers:[
            { text:"yaxshi",correct:true },
            { text:"ajoib",correct:false },
            { text:"boladi",correct:false },
            { text:"uncha emas",correct:false },
        ]
    },
    {
        question:"Kim chumo",
        answers:[
            { text:"bilmiman",correct:true },
            { text:"balki",correct:false },
            { text:"ha yoge",correct:false },
            { text:"balki",correct:false },
        ]
    },
]
const questionElement = document.querySelector(".question")
const answerBtn = document.getElementById("answer")
const nextBtn = document.getElementById("nextBtn")

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next"
    showQuestion()
}
function showQuestion (){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button")
        button.innerHTML = answer.text;
        button.classList.add("btn")
        answerBtn.appendChild(button)
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    })
}


function resetState() {
    nextBtn.style.display = "none"
    while (answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }
}
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct")
        score++;
    }else{
        selectedBtn.classList.add("incorrect")

    }
    Array.from(answerBtn.children).forEach(button=>{
    if (button.dataset.correct === "true") {
    button.classList.add("correct");
    }
       button.disabled = true;
    })
    nextBtn.style.display = "block";
}
function showScore() {
    resetState();
    questionElement.innerHTML = `You score ${score} out of ${questions.length}!`
    nextBtn.innerHTML = "play Again"
    nextBtn.style.display = "block"
}


function  handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        showScore();
    }
}


nextBtn.addEventListener("click",()=>{
    if (currentQuestionIndex < questions.length) {
    handleNextButton();       
    }else{
        startQuiz();
    }
})

startQuiz()