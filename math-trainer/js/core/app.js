const App = {
  currentModule: TrigModule,
  isStep1: true,
  streak: 0,
  score: 0,

  init() {
    this.streak = Storage.load("streak", 0);
    this.score = Storage.load("score", 0);
    this.updateStats();

    this.bindEvents();
    this.loadNextQuestion();
  },

  bindEvents() {
    const btnTrig = document.getElementById("btn-mod-trig");
    const btnMult = document.getElementById("btn-mod-mult");
    const btnStep1 = document.getElementById("btn-step-1");
    const btnStep2 = document.getElementById("btn-step-2");

    btnTrig.onclick = () => {
      this.currentModule = TrigModule;
      btnTrig.classList.add("active");
      btnMult.classList.remove("active");
      this.loadNextQuestion();
    };

    btnMult.onclick = () => {
      this.currentModule = MultModule;
      btnMult.classList.add("active");
      btnTrig.classList.remove("active");
      this.loadNextQuestion();
    };

    btnStep1.onclick = () => {
      this.isStep1 = true;
      btnStep1.classList.add("active");
      btnStep2.classList.remove("active");
      this.renderCurrentVisual();
    };

    btnStep2.onclick = () => {
      this.isStep1 = false;
      btnStep2.classList.add("active");
      btnStep1.classList.remove("active");
      this.renderCurrentVisual();
    };
  },

  loadNextQuestion() {
    const q = this.currentModule.generateQuestion();
    document.getElementById("question-label").textContent = q.displayPrompt;
    document.getElementById("feedback-panel").textContent = "";

    this.renderCurrentVisual();

    const keypadContainer = document.getElementById("keypad-container");
    this.currentModule.renderKeypad(keypadContainer, (ans) => this.handleAnswer(ans));
  },

  renderCurrentVisual() {
    const container = document.getElementById("visual-container");
    this.currentModule.renderVisual(container, this.isStep1);
  },

  handleAnswer(answer) {
    const feedback = document.getElementById("feedback-panel");
    const isCorrect = this.currentModule.validateAnswer(answer);

    if (isCorrect) {
      this.streak++;
      this.score += this.isStep1 ? 10 : 20;
      feedback.className = "feedback-panel feedback-correct";
      feedback.textContent = "Korrekt!";

      if (this.currentModule === MultModule && this.isStep1) {
        const visual = document.getElementById("visual-container");
        MultMatrix.render(visual, this.currentModule.currentQuestion.a, this.currentModule.currentQuestion.b, answer);
      }

      Storage.save("streak", this.streak);
      Storage.save("score", this.score);
      this.updateStats();

      setTimeout(() => this.loadNextQuestion(), 600);
    } else {
      this.streak = 0;
      feedback.className = "feedback-panel feedback-wrong";
      feedback.textContent = `Fel. Rätt svar: ${this.currentModule.currentQuestion.expected}`;
      Storage.save("streak", this.streak);
      this.updateStats();

      setTimeout(() => this.loadNextQuestion(), 1600);
    }
  },

  updateStats() {
    document.getElementById("streak-counter").textContent = `Streak: ${this.streak}`;
    document.getElementById("score-counter").textContent = `Poäng: ${this.score}`;
  }
};

window.onload = () => App.init();