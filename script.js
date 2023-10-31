// Perguntas
const questions = [
    {
        question: "Quem foi o primeiro presidente dos Estados Unidos?",
        options: ["Abraham Lincoln", "Thomas Jefferson", "George Washington", "John F. Kennedy"],
        correctAnswer: "George Washington",
        image: "george.jpg"
    },
    {
        question: "Qual é a fórmula correta para calcular a área de um triângulo?",
        options: ["Base x Altura x 2", " Lado x Lado", "Comprimento x Largura", "Base x Altura / 2 "],
        correctAnswer: "Base x Altura / 2 ",
        image: "soma.jpg"
    },
    {
        question: "Quem foi o autor da obra 'Dom Quixote'?",
        options: ["M. de Cervantes", "Machado de Assis", " Fernando Pessoa", "W. Shakespeare"],
        correctAnswer: "M. de Cervantes",
        image: "autor.jpg"
    },
    {
        question: "Quem é conhecido como o 'Pai da Filosofia Ocidental'?",
        options: ["Charles Darwin", "Sócrates", "Albert Einstein", "Isaac Newton"],
        correctAnswer: "Sócrates",
        image: "socrates.jpg"
    },
    {
        question: "Qual é a capital da Espanha?",
        options: ["Paris", "Roma", "Lisboa", "Madrid"],
        correctAnswer: "Madrid",
        image: "espanha.png"
    }
];

const imageElement = document.querySelector('.imageQuestion');
const questionContainer = document.querySelector(".question");
const optionsContainer = document.querySelector(".options");
const feedbackContainer = document.querySelector(".feedback");

let currentQuestionIndex = 0;

let chances = 2;

let score = 0;

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    questionContainer.textContent = question.question;
    imageElement.src = question.image;
    optionsContainer.innerHTML = "";
    feedbackContainer.textContent = "";
    question.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerHTML = `
            <i class="${getIconClass(index)}"></i>
            <span>${option}</span>
        `;
        button.addEventListener("click", () => checkAnswer(index));
        optionsContainer.appendChild(button);
    });
}

function getIconClass(index) {

    switch (index) {
        
        case 0: 
            return "fas fa-square";
        case 1:
            return "fas fa-play";
        case 2:
            return "fas fa-circle";
        case 3:
            return "fas fa-star";
         
        default:

            return "fas fa-question";
    }
}

function checkAnswer(selectedIndex) { 
    const question = questions[currentQuestionIndex];
    if (question.options[selectedIndex] === question.correctAnswer) {
        score += 10;
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            questionContainer.textContent = "Parabéns! Quiz concluído!";
            optionsContainer.innerHTML = `<p>Você fez ${score} pontos!</p>`;
        } 
    } else {
        chances--;
        if (chances === 0) {
            questionContainer.textContent = "Game over :(";
            optionsContainer.innerHTML = `<p>Você fez ${score} pontos!</p>`;
        } else {
            feedbackContainer.textContent = "Resposta incorreta. Tente novamente.";
        }
    }
}

const restartButton = document.getElementById('restartQuiz');  
        restartButton.addEventListener('click', () => {
            if (confirm('Deseja reiniciar o quiz?')) {
                currentQuestionIndex = 0;
                chances = 2;
                score = 0;
                loadQuestion();
            }
        });

loadQuestion();