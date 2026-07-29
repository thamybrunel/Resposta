/* ==========================================
   ELEMENTOS
========================================== */

const pages = document.querySelectorAll(".page");

const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");

const progressSteps = document.querySelectorAll(".progress-step");
const progressThreads = document.querySelectorAll(".progress-thread");

const heartsContainer = document.getElementById("hearts-container");

const terminalOutput = document.getElementById("terminal-output");
const terminalPage = document.getElementById("page-3");

const albumCover = document.getElementById("album-cover");
const playButton = document.getElementById("play-button");
const playerMessage = document.getElementById("player-message");
const albumMessage = document.getElementById("album-message");

const playerLine = document.querySelector(".player-line span");

let currentPage = 0;
let terminalExecution = 0;


/* ==========================================
   MOSTRAR PÁGINA
========================================== */

function showPage(index) {

    if (index < 0) {
        index = 0;
    }

    if (index > pages.length - 1) {
        index = pages.length - 1;
    }

    pages.forEach((page) => {

        page.classList.remove("active");

    });

    pages[index].classList.add("active");

    currentPage = index;

    updateProgress();
    updateButtons();

}


/* ==========================================
   BARRA DE PROGRESSO
========================================== */

function updateProgress() {

    progressSteps.forEach((step, index) => {

        step.classList.remove("active", "completed");

        if (index < currentPage) {

            step.classList.add("completed");

        }

        if (index === currentPage) {

            step.classList.add("active");

        }

    });

    progressThreads.forEach((thread, index) => {

        if (index < currentPage) {

            thread.classList.add("completed");

        } else {

            thread.classList.remove("completed");

        }

    });

}


/* ==========================================
   BOTÕES DE NAVEGAÇÃO
========================================== */

function updateButtons() {

    previousButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === pages.length - 1;

}


/* ==========================================
   EVENTOS DE NAVEGAÇÃO
========================================== */

startButton.addEventListener("click", () => {

    showPage(1);

});

previousButton.addEventListener("click", () => {

    showPage(currentPage - 1);

});

nextButton.addEventListener("click", () => {

    showPage(currentPage + 1);

});

restartButton.addEventListener("click", () => {

    resetPlayer();
    showPage(0);

});

progressSteps.forEach((step, index) => {

    step.addEventListener("click", () => {

        showPage(index);

    });

});


/* ==========================================
   TECLADO
========================================== */

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {

        showPage(currentPage + 1);

    }

    if (event.key === "ArrowLeft") {

        showPage(currentPage - 1);

    }

});


/* ==========================================
   CORAÇÕES CAINDO
========================================== */

function createFallingHeart() {

    const heart = document.createElement("span");

    heart.className = "falling-heart";
    heart.textContent = "♥";

    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${0.7 + Math.random() * 1.2}rem`;
    heart.style.animationDuration = `${6 + Math.random() * 5}s`;
    heart.style.opacity = `${0.15 + Math.random() * 0.25}`;

    heartsContainer.appendChild(heart);

    heart.addEventListener("animationend", () => {

        heart.remove();

    });

}

setInterval(createFallingHeart, 700);


/* ==========================================
   FUNÇÕES DO TERMINAL
========================================== */

function wait(milliseconds) {

    return new Promise((resolve) => {

        setTimeout(resolve, milliseconds);

    });

}

function addText(text) {

    terminalOutput.appendChild(
        document.createTextNode(text)
    );

}

async function typeText(text, speed, execution) {

    for (const character of text) {

        if (execution !== terminalExecution) {

            return false;

        }

        addText(character);

        await wait(
            speed + Math.random() * 18
        );

    }

    return true;

}

async function typeLine(
    text,
    speed,
    execution,
    pauseAfter = 160
) {

    const completed = await typeText(
        `${text}\n`,
        speed,
        execution
    );

    if (!completed) {

        return false;

    }

    await wait(pauseAfter);

    return true;

}


/* ==========================================
   SPINNER DO TERMINAL
========================================== */

async function runSpinner(execution) {

    const spinnerFrames = [
        "⠋",
        "⠙",
        "⠹",
        "⠸",
        "⠼",
        "⠴",
        "⠦",
        "⠧",
        "⠇",
        "⠏"
    ];

    const spinner = document.createElement("span");

    terminalOutput.appendChild(spinner);

    for (let round = 0; round < 2; round++) {

        for (const frame of spinnerFrames) {

            if (execution !== terminalExecution) {

                spinner.remove();

                return false;

            }

            spinner.textContent = frame;

            await wait(90);

        }

    }

    spinner.remove();

    addText("\n");

    return true;

}


/* ==========================================
   NOME GUILHERME
========================================== */

async function showHighlightedName(execution) {

    if (execution !== terminalExecution) {

        return false;

    }

    addText("Nome: ");

    const name = document.createElement("span");

    name.textContent = "Guilherme ❤️";
    name.style.color = "#ffffff";
    name.style.opacity = "0";
    name.style.fontWeight = "bold";
    name.style.textShadow =
        "0 0 14px rgba(248, 184, 200, 0.9)";
    name.style.transition = "opacity 0.7s ease";

    terminalOutput.appendChild(name);

    requestAnimationFrame(() => {

        name.style.opacity = "1";

    });

    addText("\n");

    await wait(1100);

    return true;

}


/* ==========================================
   CURSOR PISCANDO
========================================== */

async function showBlinkingCursor(execution) {

    const cursor = document.createElement("span");

    cursor.textContent = "█";

    terminalOutput.appendChild(cursor);

    let visible = true;

    const cursorInterval = setInterval(() => {

        visible = !visible;

        cursor.style.opacity = visible ? "1" : "0";

    }, 450);

    await wait(1800);

    clearInterval(cursorInterval);

    if (execution !== terminalExecution) {

        cursor.remove();

        return false;

    }

    cursor.remove();

    return true;

}


/* ==========================================
   EXECUÇÃO DO TERMINAL
========================================== */

async function startTerminal() {

    terminalExecution++;

    const execution = terminalExecution;

    terminalOutput.textContent = "";

    await wait(400);

    if (execution !== terminalExecution) {

        return;

    }

    if (!await typeLine(
        "> iniciando sistema...",
        45,
        execution,
        550
    )) return;

    if (!await typeLine(
        "✔ procurando pessoa especial",
        19,
        execution
    )) return;

    if (!await typeLine(
        "✔ verificando compatibilidade",
        19,
        execution
    )) return;

    if (!await typeLine(
        "✔ carinhos recebidos",
        19,
        execution
    )) return;

    if (!await typeLine(
        "✔ memórias criadas",
        19,
        execution,
        500
    )) return;

    addText("\n");

    if (!await typeLine(
        "Compilando sentimentos...",
        46,
        execution,
        300
    )) return;

    if (!await runSpinner(execution)) return;

    if (!await typeLine(
        "✔ compilação concluída",
        24,
        execution,
        550
    )) return;

    addText("\n");

    if (!await typeLine(
        "Nenhum erro encontrado.",
        37,
        execution,
        650
    )) return;

    addText("\n");

    if (!await typeLine(
        "Resultado encontrado.",
        48,
        execution,
        700
    )) return;

    if (!await showHighlightedName(execution)) return;

    addText("\n");

    if (!await typeLine(
        "Compatibilidade: 100% (e aumentando)",
        34,
        execution,
        650
    )) return;

    addText("\n");

    if (!await typeLine(
        "Aguardando confirmação...",
        52,
        execution,
        300
    )) return;

    if (!await showBlinkingCursor(execution)) return;

    addText("\n");

    if (!await typeLine(
        "Resposta recebida.",
        42,
        execution,
        550
    )) return;

    addText("\n");

    if (!await typeLine(
        "Abrindo...",
        65,
        execution,
        900
    )) return;

    if (
        execution === terminalExecution &&
        terminalPage.classList.contains("active")
    ) {

        showPage(3);

    }

}


/* ==========================================
   DETECTAR A TELA DO TERMINAL
========================================== */

const terminalObserver = new MutationObserver(() => {

    if (terminalPage.classList.contains("active")) {

        startTerminal();

    } else {

        terminalExecution++;

    }

});

terminalObserver.observe(
    terminalPage,
    {
        attributes: true,
        attributeFilter: ["class"]
    }
);


/* ==========================================
   BOTÃO PLAY
========================================== */

playButton.addEventListener("click", () => {

    playerMessage.classList.add("visible");

    playButton.classList.add("played");

    playerLine.classList.remove("active");

    void playerLine.offsetWidth;

    playerLine.classList.add("active");

});


/* ==========================================
   CLIQUE DUPLO NO CORAÇÃO
========================================== */

albumCover.addEventListener("dblclick", () => {

    albumCover.classList.remove("revealed");

    void albumCover.offsetWidth;

    albumCover.classList.add("revealed");

    albumMessage.classList.add("visible");

});


/* ==========================================
   RESETAR PLAYER
========================================== */

function resetPlayer() {

    playerMessage.classList.remove("visible");
    albumMessage.classList.remove("visible");

    playButton.classList.remove("played");
    albumCover.classList.remove("revealed");
    playerLine.classList.remove("active");

}


/* ==========================================
   MENSAGEM SECRETA NO CONSOLE
========================================== */

/*
Oi, Guilherme.

Se você chegou até aqui,
imagino que sua curiosidade venceu. 😅

Eu poderia ter respondido apenas "sim".

Mas acho que você já percebeu
que eu gosto de complicar as coisas...

Obrigada por cuidar tão bem de mim.

Espero que este seja só o primeiro
de muitos projetos que vamos construir juntos.

Com carinho,
Thamyres ❤️
*/

console.log(`
Oi, Guilherme.

Se você chegou até aqui,
imagino que sua curiosidade venceu. 😅

Eu poderia ter respondido apenas "sim".

Mas acho que você já percebeu
que eu gosto de complicar as coisas...

Obrigada por cuidar tão bem de mim.

Espero que este seja só o primeiro
de muitos projetos que vamos construir juntos.

Com carinho,
Thamyres ❤️
`);


/* ==========================================
   INÍCIO
========================================== */

/* ==========================================
   CRONÔMETRO DO AMOR
========================================== */

const timerDays = document.getElementById("timer-days");
const timerHours = document.getElementById("timer-hours");
const timerMinutes = document.getElementById("timer-minutes");
const timerSeconds = document.getElementById("timer-seconds");

/*
Junho é o mês 5 porque, no JavaScript,
os meses começam no número 0.
*/

const relationshipStart = new Date(
    2026,
    5,
    14,
    0,
    0,
    0
);

function updateLoveTimer() {

    const now = new Date();

    let difference = now - relationshipStart;

    if (difference < 0) {

        difference = 0;

    }

    const totalSeconds = Math.floor(
        difference / 1000
    );

    const days = Math.floor(
        totalSeconds / 86400
    );

    const hours = Math.floor(
        (totalSeconds % 86400) / 3600
    );

    const minutes = Math.floor(
        (totalSeconds % 3600) / 60
    );

    const seconds =
        totalSeconds % 60;

    timerDays.textContent = days;
    timerHours.textContent =
        String(hours).padStart(2, "0");
    timerMinutes.textContent =
        String(minutes).padStart(2, "0");
    timerSeconds.textContent =
        String(seconds).padStart(2, "0");

}

updateLoveTimer();

setInterval(
    updateLoveTimer,
    1000
);
showPage(0);