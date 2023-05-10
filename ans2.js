//javascript to display the quiz questions and answers
const questions = [{
        question: "What is 35% of 80?",
        answers: [
            { text: "65", correct: false },
            { text: "28", correct: true },
            { text: "75 ", correct: false },
            { text: "25", correct: false },
        ]
    },
    {
        question: "What is the next number in the sequence: 2, 4, 6, 8, 10, ...?",
        answers: [
            { text: "14", correct: false },
            { text: "8", correct: false },
            { text: "6", correct: false },
            { text: "12", correct: true },
        ]
    },
    {
        question: "If a store sells a shirt for $25 and a pair of pants for $40, how much would it cost to buy 2 shirts and 3 pairs of pants?",
        answers: [
            { text: "$170", correct: true },
            { text: "$155", correct: false },
            { text: "$100", correct: false },
            { text: "$65", correct: false },
        ]
    },
    {
        question: ". If all dogs are animals and all animals have fur, then it must be true that all dogs have fur. Is this statement true or false?",
        answers: [
            { text: "false", correct: false },
            { text: "true", correct: true },
        ]
    },
    {
        question: "A toy train has a weight of 2 kilograms. If the weight of the toy train and a toy car together is 4 kilograms, what is the weight of the toy car?",
        answers: [
            { text: "2 kilograms", correct: true },
            { text: "4 kilograms", correct: false },
            { text: "1 kilograms", correct: false },
            { text: "3 kilograms", correct: false },
        ]
    },
    {
        question: "What is the verb in the following sentence? The cat chased the mouse around the house.",
        answers: [
            { text: "cat", correct: false },
            { text: "house", correct: false },
            { text: "mouse", correct: false },
            { text: "chased", correct: true },
        ]
    },
    {
        question: " What is the object pronoun in the following sentence?'Can you please give that book to me?'",
        answers: [
            { text: "you", correct: false },
            { text: "me", correct: true },
            { text: "please", correct: false },
            { text: "give", correct: false },
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
    nextElement.innerHTML = "Re-try ";
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