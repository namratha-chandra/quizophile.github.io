//javascript to display the quiz questions and answers
const questions = [{
        question: "If the ratio of boys to girls in a class is 2:3 and there are 20 boys, how many girls are there in the class?",
        answers: [
            { text: "20", correct: false },
            { text: "30", correct: true },
            { text: "35 ", correct: false },
            { text: "25", correct: false },
        ]
    },
    {
        question: "A man can row 12 km/hr in still water. If the speed of the current is 4 km/hr, how long will he take to row 60 km upstream?",
        answers: [
            { text: "12-hours", correct: false },
            { text: "8-hours", correct: false },
            { text: "15-hours", correct: true },
            { text: "4-hours", correct: false },
        ]
    },
    {
        question: "If the radius of a circle is increased by 20%, what is the percentage increase in the area of the circle?",
        answers: [
            { text: "40%", correct: false },
            { text: "44%", correct: true },
            { text: "45%", correct: false },
            { text: "41%", correct: false },
        ]
    },
    {
        question: "Complete the analogy: Doctor is to patient as teacher is to ___________.",
        answers: [
            { text: "class", correct: false },
            { text: "school", correct: false },
            { text: "students", correct: true },
            { text: "book", correct: false },
        ]
    },
    {
        question: "Complete the analogy: Accurate is to precise as clever is to ___________.",
        answers: [
            { text: "cunning", correct: true },
            { text: "wise", correct: false },
            { text: "intelligent", correct: false },
            { text: "astute", correct: false },
        ]
    },
    {
        question: " Identify the sentence that contains a misplaced modifier.",
        answers: [
            { text: "The car hit the pedestrian that was crossing the street", correct: false },
            { text: "After finishing the math homework, the TV was turned on.", correct: true },
            { text: " He served a plate of spaghetti to his dog, covered in tomato sauce.", correct: false },
            { text: " The student who studied hard received a good grade.", correct: false },
        ]
    },
    {
        question: " Choose the correct verb tense to complete the following sentence: 'By the time we _____ dinner, the movie will have already started' ",
        answers: [
            { text: "finish", correct: false },
            { text: "finished", correct: false },
            { text: "have finished", correct: true },
            { text: "will have finished", correct: false },
        ]
    }
];
//Accessing the html elements
const questionElement = document.getElementById("Q");
const answerElement = document.getElementById("AB");
const nextElement = document.getElementById("N");
const submitElement = document.getElementById("sub");

//to store the question index and score

let currentindex = 0;
let score = 0;

//function for keep count to question and score

function start() {
    currentindex = 0;
    score = 0;
    nextElement.innerHTML = "Next";
    //calling the function to display the answer
    showQuestion();
}

function showQuestion() {
    //calling the reset function
    reset();
    //current question's index
    let current_question = questions[currentindex];
    //current question's question number
    let questionNO = currentindex + 1;
    questionElement.innerHTML = questionNO + ". " + current_question.question;

    //to display the answers
    current_question.answers.forEach(answers => {
        // create the button and add the text(answer)
        const button = document.createElement("button");
        button.innerHTML = answers.text;
        //adding the classname "ans"
        button.classList.add("ans");
        answerElement.appendChild(button);

        // to check the correct answer

        if (answers.correct) {
            button.dataset.correct = answers.correct;
        }
        //to perfrom the click event,by calling the function select_answer
        button.addEventListener("click", select_answer);
    });
}
// to reset the previsious answers the function reset is used
function reset() {
    nextElement.style.display = "none";
    while (answerElement.firstChild) {
        answerElement.removeChild(answerElement.firstChild);
    }
}
//in this function it checks the answer is corect or wrong.
function select_answer(a) {
    const selectedbtn = a.target;
    const isCorrect = selectedbtn.dataset.correct === "true";
    if (isCorrect) {
        selectedbtn.classList.add("correct");
        score++;
    } else {
        selectedbtn.classList.add("incorrect");
    }
    // here inorder to block the other options when on of the option is selected 
    Array.from(answerElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextElement.style.display = "block";
}
// function to display the score and if no question is found again the quiz is restarted
function showScore() {
    reset();
    questionElement.innerHTML = 'your score is' + score + ' ' + 'out of' + ' ' + questions.length + '!' +
        "<br>" + "<br>" + "<i>Thank You For Attending the Quiz..!</i>" + "<br>";
    nextElement.innerHTML = "Re-try";
    nextElement.style.display = "block";
    submitElement.innerHTML = "play_NextLevel";
    submitElement.style.display = "block";
}

function handle_next_button() {
    currentindex++;
    if (currentindex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}
//function 
nextElement.addEventListener("click", () => {
    if (currentindex < questions.length) {
        handle_next_button();
    } else {
        start();
    }
});

start();