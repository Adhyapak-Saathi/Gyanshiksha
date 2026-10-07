(() => {
  "use strict";

  const root = document.querySelector("[data-learning-game]");
  if (!root) return;

  const modeButtons = [...document.querySelectorAll("[data-game-mode]")];
  const startButton = root.querySelector("[data-game-start]");
  const restartButton = root.querySelector("[data-game-restart]");
  const questionEl = root.querySelector("[data-game-question]");
  const optionsEl = root.querySelector("[data-game-options]");
  const feedbackEl = root.querySelector("[data-game-feedback]");
  const scoreEl = root.querySelector("[data-game-score]");
  const bestEl = root.querySelector("[data-game-best]");
  const numberEl = root.querySelector("[data-game-number]");
  const progressEl = root.querySelector("[data-game-progress]");
  const labelEl = root.querySelector("[data-game-label]");

  const labels = {
    arithmetic: "Math Sprint",
    percent: "Percentage Challenge",
    algebra: "Simple Algebra"
  };

  let mode = "arithmetic";
  let round = 0;
  let score = 0;
  let correctAnswer = 0;
  let locked = false;

  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffle = (items) => items.map(v => ({v, r:Math.random()})).sort((a,b)=>a.r-b.r).map(x=>x.v);

  function bestKey() {
    return `gyanshiksha_game_best_${mode}`;
  }

  function readBest() {
    const value = Number(localStorage.getItem(bestKey()) || 0);
    bestEl.textContent = value;
    return value;
  }

  function writeBest() {
    const current = readBest();
    if (score > current) {
      localStorage.setItem(bestKey(), String(score));
      bestEl.textContent = score;
    }
  }

  function arithmeticQuestion() {
    const ops = ["+", "−", "×", "÷"];
    const op = ops[rand(0, ops.length - 1)];
    let a = rand(6, 40), b = rand(2, 12), answer, text;
    if (op === "+") { answer = a + b; text = `${a} + ${b} = ?`; }
    else if (op === "−") {
      if (b > a) [a,b] = [b,a];
      answer = a - b; text = `${a} − ${b} = ?`;
    }
    else if (op === "×") { a = rand(2,12); b = rand(2,12); answer = a*b; text = `${a} × ${b} = ?`; }
    else { b = rand(2,12); answer = rand(2,12); a = b*answer; text = `${a} ÷ ${b} = ?`; }
    return {text, answer};
  }

  function percentQuestion() {
    const percentages = [10,20,25,50,75];
    const p = percentages[rand(0, percentages.length - 1)];
    let base;
    if (p === 25 || p === 75) base = rand(2,20) * 4;
    else if (p === 20) base = rand(2,20) * 5;
    else if (p === 10) base = rand(2,30) * 10;
    else base = rand(2,30) * 2;
    const answer = base * p / 100;
    return {text:`${base} નો ${p}% કેટલો?`, answer};
  }

  function algebraQuestion() {
    if (Math.random() < .55) {
      const x = rand(2,20), a = rand(2,15), b = x+a;
      return {text:`x + ${a} = ${b}, તો x = ?`, answer:x};
    }
    const x = rand(2,12), a = rand(2,10), b = a*x;
    return {text:`${a}x = ${b}, તો x = ?`, answer:x};
  }

  function currentQuestion() {
    if (mode === "percent") return percentQuestion();
    if (mode === "algebra") return algebraQuestion();
    return arithmeticQuestion();
  }

  function optionsFor(answer) {
    const choices = new Set([answer]);
    while (choices.size < 4) {
      const spread = Math.max(4, Math.round(Math.abs(answer) * .2));
      const candidate = Math.max(0, answer + rand(-spread, spread));
      choices.add(candidate);
    }
    return shuffle([...choices]);
  }

  function renderQuestion() {
    locked = false;
    const item = currentQuestion();
    correctAnswer = item.answer;
    questionEl.textContent = item.text;
    numberEl.textContent = round + 1;
    scoreEl.textContent = score;
    progressEl.style.width = `${(round / 10) * 100}%`;
    feedbackEl.textContent = "જવાબ પસંદ કરો.";
    optionsEl.innerHTML = "";

    optionsFor(item.answer).forEach(value => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = value;
      button.addEventListener("click", () => submitAnswer(button, value));
      optionsEl.appendChild(button);
    });
  }

  function submitAnswer(button, value) {
    if (locked) return;
    locked = true;
    [...optionsEl.children].forEach(el => {
      el.disabled = true;
      if (Number(el.textContent) === correctAnswer) el.classList.add("correct");
    });

    if (Number(value) === Number(correctAnswer)) {
      score += 1;
      scoreEl.textContent = score;
      button.classList.add("correct");
      feedbackEl.textContent = "સાચો જવાબ ✓";
    } else {
      button.classList.add("wrong");
      feedbackEl.textContent = `સાચો જવાબ: ${correctAnswer}`;
    }

    round += 1;
    progressEl.style.width = `${(round / 10) * 100}%`;
    setTimeout(() => round < 10 ? renderQuestion() : finishGame(), 650);
  }

  function finishGame() {
    writeBest();
    optionsEl.innerHTML = "";
    questionEl.textContent = `Game complete — ${score}/10`;
    feedbackEl.textContent = score >= 9 ? "Excellent! ખૂબ જ સારી practice." :
                             score >= 7 ? "Good job! ફરી રમો અને best score સુધારો." :
                             "સારી શરૂઆત. Accuracy પર ધ્યાન આપીને ફરી પ્રયાસ કરો.";
    startButton.hidden = true;
    restartButton.hidden = false;
    progressEl.style.width = "100%";
  }

  function startGame() {
    round = 0; score = 0; locked = false;
    labelEl.textContent = labels[mode];
    scoreEl.textContent = "0";
    startButton.hidden = true;
    restartButton.hidden = true;
    readBest();
    renderQuestion();
  }

  modeButtons.forEach(button => {
    button.addEventListener("click", () => {
      modeButtons.forEach(b => b.classList.remove("is-selected"));
      button.classList.add("is-selected");
      mode = button.dataset.gameMode;
      labelEl.textContent = labels[mode];
      readBest();
      if (!startButton.hidden || restartButton.hidden === false) {
        questionEl.textContent = "Ready?";
        optionsEl.innerHTML = "";
        feedbackEl.textContent = "Start Game દબાવો.";
        progressEl.style.width = "0%";
        scoreEl.textContent = "0";
        startButton.hidden = false;
        restartButton.hidden = true;
      }
    });
  });

  startButton.addEventListener("click", startGame);
  restartButton.addEventListener("click", startGame);
  labelEl.textContent = labels[mode];
  readBest();
})();