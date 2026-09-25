const MultModule = {
  currentQuestion: null,
  currentInput: "",

  generateQuestion() {
    const q = MultData.getRandomFactors(12);
    this.currentQuestion = {
      a: q.a,
      b: q.b,
      expected: q.result.toString(),
      displayPrompt: `${q.a} × ${q.b}`
    };
    this.currentInput = "";
    return this.currentQuestion;
  },

  renderVisual(container, isStep1) {
    if (!isStep1) {
      container.innerHTML = `<div style="color:#737380;font-size:14px;">Matrisen döljs i Steg 2</div>`;
      return;
    }
    MultMatrix.render(container, this.currentQuestion.a, this.currentQuestion.b);
  },

  renderKeypad(container, onInput) {
    container.innerHTML = `
      <div class="num-display" id="mult-display">_</div>
      <div class="num-grid">
        ${[1,2,3,4,5,6,7,8,9,"C",0,"OK"].map(k => `<button class="keypad-btn" data-key="${k}">${k}</button>`).join("")}
      </div>
    `;

    const display = container.querySelector("#mult-display");

    container.querySelectorAll(".keypad-btn").forEach(btn => {
      btn.onclick = () => {
        const val = btn.getAttribute("data-key");
        if (val === "C") {
          this.currentInput = "";
        } else if (val === "OK") {
          if (this.currentInput.length > 0) onInput(this.currentInput);
          return;
        } else {
          if (this.currentInput.length < 3) this.currentInput += val;
        }
        display.textContent = this.currentInput || "_";
      };
    });
  },

  validateAnswer(input) {
    return input === this.currentQuestion.expected;
  }
};