const audio = document.querySelector('#birthday-audio');
const finalAudio = document.querySelector('#final-audio');
const startButton = document.querySelector('#start-button');
const playButton = document.querySelector('#play-button');
const muteButton = document.querySelector('#mute-button');
const playIcon = document.querySelector('#play-icon');
const playLabel = document.querySelector('#play-label');
const muteIcon = document.querySelector('#mute-icon');
const muteLabel = document.querySelector('#mute-label');
const readyMessage = document.querySelector('#ready-message');
const welcomeScreen = document.querySelector('#welcome-screen');
const memoriesScreen = document.querySelector('#memories-screen');
const memoryImage = document.querySelector('#memory-image');
const photoFrame = document.querySelector('#photo-frame');
const photoFallback = document.querySelector('#photo-fallback');
const memoryCaption = document.querySelector('#memory-caption');
const photoCounter = document.querySelector('#photo-counter');
const previousButton = document.querySelector('#previous-button');
const nextButton = document.querySelector('#next-button');
const memoriesContinue = document.querySelector('#memories-continue');
const questionScreen = document.querySelector('#question-screen');
const questionNote = document.querySelector('#question-note');
const yesButton = document.querySelector('#yes-button');
const noButton = document.querySelector('#no-button');
const messageScreen = document.querySelector('#message-screen');
const birthdayMessageElement = document.querySelector('#birthday-message');
const typingCursor = document.querySelector('#typing-cursor');
const messageNote = document.querySelector('#message-note');
const moreButton = document.querySelector('#more-button');
const quizScreen = document.querySelector('#quiz-screen');
const quizProgress = document.querySelector('#quiz-progress');
const quizCard = document.querySelector('#quiz-card');
const quizQuestion = document.querySelector('#quiz-question');
const quizOptions = document.querySelector('#quiz-options');
const quizFeedback = document.querySelector('#quiz-feedback');
const quizContinue = document.querySelector('#quiz-continue');
const quizResult = document.querySelector('#quiz-result');
const resultScore = document.querySelector('#result-score');
const resultMessage = document.querySelector('#result-message');
const quizFinish = document.querySelector('#quiz-finish');
const finalScreen = document.querySelector('#final-screen');
const finalMessageElement = document.querySelector('#final-message');
const finalPhoto = document.querySelector('#final-photo');
const confettiLayer = document.querySelector('#confetti-layer');

// Replace this message with your own words while keeping the backticks.
const birthdayMessage = `Happiest birthday, Rohan! You are the best person I have ever met in my life.

I hope our friendship never ends because I want you in my life forever. You are truly one of the best people in my life, and in the simplest words, I can say that you are my SUKOON.

I want to make lots of memories with you and click many pictures together. I know we have fought many times, and our last fight made me realise that I made a mistake. I am sorry for it.

Thank you for forgiving me and continuing our friendship as it is. I request you to always be the same person I met one year ago. ❤️`;

// Replace this message and final photo path with your own ending.
const finalMessage = `Thank you for being the kind of friend who makes ordinary days feel like stories worth keeping.

No matter how busy life gets, I hope you always know that you have someone cheering for you, laughing with you, and saving you the best piece of cake.`;
const finalPhotoPath = 'images/pic 7 cleaned.jpg';

const quizQuestions = [
    {
        question: 'What is something you think we\'ll still be doing even years from now?',
        options: ['Randomly texting each other', 'Making fun of each other 😂', 'Talking about old memories', 'All of the above 🫶']
    },
    {
        question: 'If we have an argument, who is more likely to break the silence first? 👀',
        options: ['Me', 'You', 'Whoever realizes they\'re wrong first 😂', 'Neither—we\'ll just randomly start talking again']
    },
    {
        question: 'What makes our friendship different from other friendships?',
        options: ['We can be completely ourselves', 'We understand each other\'s moods', 'We have our own crazy memories 😂', 'It\'s just impossible to explain ❤️']
    },
    {
        question: 'What do you think is the best thing we\'ve gained from our friendship?',
        options: ['Memories', 'Trust', 'Someone who is always there', 'A person who knows way too much about us 😂']
    },
    {
        question: 'After all these years, what do you think we have the most of?',
        options: ['Arguments 😂', 'Memories ❤️', 'Inside jokes', 'All of the above 🫶']
    }
];

// Add, remove, or reorder memories here without changing the carousel markup.
const memories = [
    {
        image: 'images/pic 1.jpg',
        caption: 'The face of someone who definitely had a plan. Probably. 😂'
    },
    {
        image: 'images/pic 2.jpg',
        caption: 'Proof that Rohan can look this innocent when required. ✨'
    },
    {
        image: 'images/pic3.jpg',
        caption: 'Photo 3 caption goes here. Add your own joke or memory. 😄'
    },
    {
        image: 'images/pic 4.jpg',
        caption: 'Photo 4 caption goes here. This one deserves a story. 📸'
    },
    {
        image: 'images/pic 5.jpg',
        caption: 'Photo 5 caption goes here. Rohan being Rohan. ✨'
    },
    {
        image: 'images/pic 6.jpg',
        caption: 'Photo 6 caption goes here. One more favourite memory. ❤️'
    }
];

let currentMemoryIndex = 0;
let currentQuizIndex = 0;
let hasAnsweredCurrentQuestion = false;

// Keep the music controls useful even when the birthday song has not been added yet.
let audioAvailable = true;
audio.addEventListener('error', () => {
    audioAvailable = false;
    playButton.disabled = true;
    playButton.setAttribute('aria-label', 'Birthday music is not available yet');
    playLabel.textContent = 'Add music later';
    playIcon.textContent = '♪';
});

audio.addEventListener('play', () => {
    playIcon.textContent = '⏸';
    playLabel.textContent = 'Pause music';
    playButton.setAttribute('aria-label', 'Pause birthday music');
    playButton.setAttribute('aria-pressed', 'true');
});

audio.addEventListener('pause', () => {
    playIcon.textContent = '▶';
    playLabel.textContent = 'Play music';
    playButton.setAttribute('aria-label', 'Play birthday music');
    playButton.setAttribute('aria-pressed', 'false');
});

playButton.addEventListener('click', async () => {
    if (!audioAvailable) {
        return;
    }

    if (audio.paused) {
        try {
            await audio.play();
        } catch {
            readyMessage.textContent = 'Add your birthday song whenever you are ready 🎶';
        }
    } else {
        audio.pause();
    }
});

muteButton.addEventListener('click', () => {
    audio.muted = !audio.muted;
    const isMuted = audio.muted;
    muteIcon.textContent = isMuted ? '🔇' : '🔊';
    muteLabel.textContent = isMuted ? 'Sound off' : 'Sound on';
    muteButton.setAttribute('aria-label', isMuted ? 'Unmute birthday music' : 'Mute birthday music');
    muteButton.setAttribute('aria-pressed', String(isMuted));
});

startButton.addEventListener('click', () => {
    welcomeScreen.hidden = true;
    welcomeScreen.classList.remove('is-visible');
    memoriesScreen.hidden = false;
    memoriesScreen.classList.add('is-visible');
    renderMemory(currentMemoryIndex);
    memoriesScreen.querySelector('h2').focus({ preventScroll: true });
});

function renderMemory(index) {
    const memory = memories[index];
    if (!memory) {
        return;
    }

    memoryImage.src = memory.image;
    memoryImage.alt = memory.caption;
    memoryImage.hidden = false;
    photoFallback.hidden = true;
    photoFrame.classList.remove('is-missing');
    memoryCaption.textContent = memory.caption;
    photoCounter.textContent = `Memory ${index + 1} of ${memories.length}`;
    previousButton.disabled = index === 0;
    nextButton.disabled = index === memories.length - 1;
    memoriesContinue.hidden = index !== memories.length - 1;
}

memoryImage.addEventListener('error', () => {
    memoryImage.hidden = true;
    photoFallback.hidden = false;
    photoFrame.classList.add('is-missing');
});

previousButton.addEventListener('click', () => {
    if (currentMemoryIndex > 0) {
        currentMemoryIndex -= 1;
        renderMemory(currentMemoryIndex);
    }
});

nextButton.addEventListener('click', () => {
    if (currentMemoryIndex < memories.length - 1) {
        currentMemoryIndex += 1;
        renderMemory(currentMemoryIndex);
    }
});

memoriesContinue.addEventListener('click', () => {
    memoriesScreen.hidden = true;
    memoriesScreen.classList.remove('is-visible');
    questionScreen.hidden = false;
    questionScreen.classList.add('is-visible');
    questionScreen.querySelector('h2').focus({ preventScroll: true });
});

let teaseCount = 0;
noButton.addEventListener('click', () => {
    teaseCount += 1;
    const teaseMessages = [
        'Nice try 😂',
        'Wrong answer, Rohan 😏',
        'The NO button is feeling optimistic today.'
    ];
    questionNote.textContent = teaseMessages[(teaseCount - 1) % teaseMessages.length];
    noButton.classList.remove('tease-left', 'tease-right');
    noButton.classList.add(teaseCount % 2 === 0 ? 'tease-right' : 'tease-left');
});

yesButton.addEventListener('click', () => {
    questionScreen.hidden = true;
    questionScreen.classList.remove('is-visible');
    messageScreen.hidden = false;
    messageScreen.classList.add('is-visible');
    messageScreen.querySelector('h2').focus({ preventScroll: true });
    revealBirthdayMessage();
});

function revealBirthdayMessage() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
        birthdayMessageElement.textContent = birthdayMessage;
        typingCursor.classList.add('is-done');
        return;
    }

    let characterIndex = 0;
    const typingSpeed = 24;
    const typeNextCharacter = () => {
        birthdayMessageElement.textContent = birthdayMessage.slice(0, characterIndex);
        characterIndex += 1;
        if (characterIndex <= birthdayMessage.length) {
            window.setTimeout(typeNextCharacter, typingSpeed);
        } else {
            typingCursor.classList.add('is-done');
        }
    };
    typeNextCharacter();
}

moreButton.addEventListener('click', () => {
    messageScreen.hidden = true;
    messageScreen.classList.remove('is-visible');
    quizScreen.hidden = false;
    quizScreen.classList.add('is-visible');
    quizScreen.querySelector('h2').focus({ preventScroll: true });
    renderQuizQuestion();
});

function renderQuizQuestion() {
    const currentQuestion = quizQuestions[currentQuizIndex];
    hasAnsweredCurrentQuestion = false;
    quizProgress.textContent = `Question ${currentQuizIndex + 1} of ${quizQuestions.length}`;
    quizQuestion.textContent = currentQuestion.question;
    quizFeedback.textContent = '';
    quizContinue.hidden = true;
    quizOptions.replaceChildren();

    currentQuestion.options.forEach((option, optionIndex) => {
        const optionButton = document.createElement('button');
        optionButton.className = 'quiz-option';
        optionButton.type = 'button';
        optionButton.textContent = option;
        optionButton.addEventListener('click', () => selectQuizAnswer(optionButton));
        quizOptions.append(optionButton);
    });
}

function selectQuizAnswer(selectedButton) {
    if (hasAnsweredCurrentQuestion) {
        return;
    }

    hasAnsweredCurrentQuestion = true;
    selectedButton.classList.add('is-selected');
    quizFeedback.textContent = 'That answer is yours, and I love it ❤️';

    [...quizOptions.children].forEach((optionButton) => {
        optionButton.disabled = true;
    });

    quizContinue.hidden = false;
    quizContinue.querySelector('span').textContent = currentQuizIndex === quizQuestions.length - 1 ? '✓' : '→';
    quizContinue.firstChild.textContent = currentQuizIndex === quizQuestions.length - 1 ? 'See the finale ' : 'Next question ';
}

quizContinue.addEventListener('click', () => {
    if (!hasAnsweredCurrentQuestion) {
        return;
    }

    if (currentQuizIndex < quizQuestions.length - 1) {
        currentQuizIndex += 1;
        renderQuizQuestion();
        quizQuestion.focus({ preventScroll: true });
        return;
    }

    showQuizResult();
});

function showQuizResult() {
    quizCard.hidden = true;
    quizProgress.textContent = 'Quiz complete';
    resultScore.textContent = 'Every answer was yours ❤️';
    resultMessage.textContent = 'There are no wrong answers here. I just wanted to know what you think about us.';
    quizResult.hidden = false;
    quizFinish.hidden = false;
    quizFinish.focus({ preventScroll: true });
}

quizFinish.addEventListener('click', async () => {
    quizScreen.hidden = true;
    quizScreen.classList.remove('is-visible');
    finalScreen.hidden = false;
    finalScreen.classList.add('is-visible');
    finalMessageElement.textContent = finalMessage;
    finalPhoto.src = finalPhotoPath;
    finalPhoto.alt = 'A final birthday photo of Rasmalai';
    finalScreen.querySelector('h2').focus({ preventScroll: true });
    launchConfetti();

    audio.pause();
    if (finalAudio.paused) {
        try {
            await finalAudio.play();
        } catch {
            readyMessage.textContent = 'Tap Play music to start the birthday song 🎶';
        }
    }
});

function launchConfetti() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const colors = ['#e87861', '#f4b942', '#82b5a5', '#d798b2', '#b84c47'];
    const pieces = document.createDocumentFragment();
    for (let index = 0; index < 24; index += 1) {
        const piece = document.createElement('span');
        piece.className = 'celebration-piece';
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.background = colors[index % colors.length];
        piece.style.setProperty('--drift', `${(Math.random() - 0.5) * 14}rem`);
        piece.style.animationDelay = `${Math.random() * 0.55}s`;
        pieces.append(piece);
    }
    confettiLayer.replaceChildren(pieces);
}
