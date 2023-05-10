//javascript to display the quiz questions and answers
const questions = [{
        question: "If John can complete a task in 6 hours and Mary can complete the same task in 8 hours, how long will it take them to complete the task together? ",
        answers: [
            { text: "1-hours ", correct: false },
            { text: "4-hours", correct: false },
            { text: "3-hours ", correct: true },
            { text: "5-hours", correct: false },
        ]
    },
    {
        question: " If 6x + 3 = 33, what is the value of x? ",
        answers: [
            { text: "3", correct: false },
            { text: "2", correct: false },
            { text: "9", correct: false },
            { text: "5", correct: true },
        ]
    },
    {
        question: ". A box contains 20 red marbles and 30 blue marbles. If a marble is selected at random, what is the probability that it will be red? ",
        answers: [
            { text: "0.4", correct: true },
            { text: "0.1", correct: false },
            { text: "0.2", correct: false },
            { text: "0.5", correct: false },
        ]
    },
    {
        question: "If all cats are animals and all animals are mammals, is it true that all cats are mammals? ",
        answers: [
            { text: "false", correct: false },
            { text: "true", correct: true },
        ]
    },
    {
        question: "If it takes 3 workers 8 hours to paint a house, how long would it take 6 workers to paint the same house? ",
        answers: [
            { text: "3-hours", correct: false },
            { text: "4-hours", correct: true },
            { text: "6-hours", correct: false },
            { text: "5-hours", correct: false },
        ]
    },
    {
        question: " Which sentence uses proper subject-verb agreement? ",
        answers: [
            { text: "The dogs barks loudly. ", correct: false },
            { text: "The dogs barks loudly.", correct: false },
            { text: "The dogs bark loudly. ", correct: false },
            { text: "The dog barks loudly. ", correct: true },
        ]
    },
    {
        question: "Which of the following sentences is grammatically correct? ",
        answers: [
            { text: "Me and my sister are going to the mall.", correct: false },
            { text: "My sister and I are going to the mall. ", correct: true },
            { text: "I and my sister are going to the mall ", correct: false },
            { text: "none", correct: false },
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