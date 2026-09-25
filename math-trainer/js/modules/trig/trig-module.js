const TrigModule = {
  currentQuestion: null,

  generateQuestion() {
    const data = TrigData[Math.floor(Math.random() * TrigData.length)];
    const types = ["sin", "cos", "tan"];
    const type = types[Math.floor(Math.random() * types.length)];
    const useRad = Math.random() > 0.5;

    this.currentQuestion = {
      deg: data.deg,
      rad: data.rad,
      type: type,
      expected: data[type],
      displayPrompt: `${type}(${useRad ? data.rad : data.deg + "°"})`
    };
    return this.currentQuestion;
  },

  renderVisual(container, isStep1) {
    if (!isStep1) {
      container.innerHTML = `<div style="color:#737380;font-size:14px;">Visuellt stöd dolt i Steg 2</div>`;
      return;
    }
    TrigVisual.render(container, this.currentQuestion.deg);
  },

  renderKeypad(container, onInput) {
    container.innerHTML = `<div class="trig-grid"></div>`;
    const grid = container.querySelector(".trig-grid");

    TrigAnswers.forEach(ans => {
      const btn = document.createElement("button");
      btn.className = "keypad-btn";
      btn.textContent = ans;
      btn.onclick = () => onInput(ans);
      grid.appendChild(btn);
    });
  },

  validateAnswer(input) {
    return input === this.currentQuestion.expected;
  }
};