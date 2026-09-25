const TrigVisual = {
  render(container, angleDeg) {
    const size = 260;
    const center = size / 2;
    const r = 100;
    const rad = (angleDeg * Math.PI) / 180;
    const px = center + r * Math.cos(rad);
    const py = center - r * Math.sin(rad);

    let nodesSvg = "";
    TrigData.forEach(item => {
      const a = (item.deg * Math.PI) / 180;
      const nx = center + r * Math.cos(a);
      const ny = center - r * Math.sin(a);
      const isActive = item.deg === angleDeg;
      nodesSvg += `<circle cx="${nx}" cy="${ny}" r="${isActive ? 6 : 3.5}" class="trig-touch-node ${isActive ? 'active' : ''}" />`;
    });

    container.innerHTML = `
      <svg class="trig-circle-svg" viewBox="0 0 ${size} ${size}">
        <circle cx="${center}" cy="${center}" r="${r}" class="trig-circle-bg" />
        <line x1="10" y1="${center}" x2="${size - 10}" y2="${center}" class="trig-axis" />
        <line x1="${center}" y1="10" x2="${center}" y2="${size - 10}" class="trig-axis" />
        <line x1="${center}" y1="${center}" x2="${px}" y2="${py}" class="trig-hypotenuse" />
        <line x1="${center}" y1="${center}" x2="${px}" y2="${center}" class="trig-proj-x" />
        <line x1="${px}" y1="${center}" x2="${px}" y2="${py}" class="trig-proj-y" />
        ${nodesSvg}
      </svg>
    `;
  }
};