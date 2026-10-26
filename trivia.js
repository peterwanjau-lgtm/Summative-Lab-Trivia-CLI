
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Store questions as an array of objects
const questions = [
    {
        question: "What is the largest mammal on Earth?",
        options: ["A. Elephant", "B. Blue Whale", "C. Giraffe", "D. Hippopotamus"],
        answer: "B"
    },
    {
        question: "How many continents are there in the world?",
        options: ["A. Five", "B. Six", "C. Seven", "D. Eight"],
        answer: "C"
    },
    {
        question: "What is the official currency of Kenya?",
        options: ["A. Shilling", "B. Dollar", "C. Euro", "D. Pound"],
        answer: "A"
    },
    {
        question: "How many sides does a hexagon have?",
        options: ["A. Five", "B. Six", "C. Seven", "D. Eight"],
        answer: "B"
    },
    {
        question: "Which ocean is the largest?",
        options: ["A. Atlantic", "B. Indian", "C. Pacific", "D. Arctic"],
        answer: "C"
    }
];

const TIME_LIMIT = 10;

let score = 0;
let currentQuestion = 0;
let timeLeft = TIME_LIMIT;
let countdown;
let questionActive = false;

// Ask the player to start
function startGame() {
    rl.question("Welcome to Trivia Game!\nStart the game? (yes/no): ", (input) => {
        const choice = input.trim().toLowerCase();

        if (choice === "yes" || choice === "y") {
            console.log("\nLet's play!\n");
            askQuestion();
        } else if (choice === "no" || choice === "n") {
            console.log("Maybe next time. Goodbye!");
            rl.close();
        } else {
            console.log("Please enter yes or no.\n");
            startGame();
        }
    });
}

// Display a question and its options
function askQuestion() {
    if (currentQuestion >= questions.length) {
        endGame();
        return;
    }

    const item = questions[currentQuestion];

    console.log(`\nQuestion ${currentQuestion + 1} of ${questions.length}`);
    console.log(item.question);

    item.options.forEach(option => console.log(option));

    timeLeft = TIME_LIMIT;
    questionActive = true;

    console.log(`You have ${TIME_LIMIT} seconds!`);
    console.log("Enter A, B, C or D:");

    startTimer();

    // Listen for the player's answer
    rl.question("> ", (input) => {
        if (!questionActive) return;

        questionActive = false;
        clearInterval(countdown);

        checkAnswer(input);
    });
}

// Countdown timer
function startTimer() {
    countdown = setInterval(() => {
        timeLeft--;

        console.log(`Time left: ${timeLeft} seconds`);

        if (timeLeft <= 0) {
            clearInterval(countdown);

            if (questionActive) {
                questionActive = false;
                console.log("\nTime's up!");
                console.log(
                    `Correct answer: ${questions[currentQuestion].answer}`
                );

                currentQuestion++;
                askQuestion();
            }
        }
    }, 1000);
}

// Check the player's answer
function checkAnswer(input) {
    const userAnswer = input.trim().toUpperCase();
    const correctAnswer = questions[currentQuestion].answer;

    if (!["A", "B", "C", "D"].includes(userAnswer)) {
        console.log("Invalid option! Please choose A, B, C or D.");
        askQuestion();
        return;
    }

    if (userAnswer === correctAnswer) {
        console.log("Correct! Well done!");
        score++;
    } else {
        console.log(`Incorrect! The correct answer was ${correctAnswer}.`);
    }

    console.log(`Current score: ${score}/${questions.length}`);

    currentQuestion++;
    askQuestion();
}

// Display the final score
function endGame() {
    console.log("\n========== GAME OVER ==========");
    console.log(`Your score: ${score}/${questions.length}`);

    const percentage = Math.round((score / questions.length) * 100);
    console.log(`Percentage: ${percentage}%`);

    if (percentage >= 80) {
        console.log("Excellent work!");
    } else if (percentage >= 50) {
        console.log("Good effort! Keep practising.");
    } else {
        console.log("Keep learning and try again!");
    }

    rl.close();
}

startGame();
