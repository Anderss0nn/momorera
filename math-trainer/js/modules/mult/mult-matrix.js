const MultMatrix = {
  render(container, factorA, factorB, targetVal = null) {
    const dim = 13;
    const viewBoxSize = 130;
    const cellSize = viewBoxSize / dim;

    let svgCells = "";

    for (let r = 0; r < dim; r++) {
      for (let c = 0; c < dim; c++) {
        const x = c * cellSize;
        const y = r * cellSize;
        const isHeader = r === 0 || c === 0;
        const val = isHeader ? (r === 0 ? c : r) : r * c;

        if (r === 0 && c === 0) continue;

        let cellClass = "matrix-cell";
        let isTextActive = false;

        if (isHeader) {
          cellClass += " matrix-cell-header";
          if ((r === 0 && (c === factorA || c === factorB)) || (c === 0 && (r === factorA || r === factorB))) {
            cellClass += " matrix-cell-highlight";
            isTextActive = true;
          }
        } else {
          if (r === c) cellClass += " matrix-cell-diagonal";

          const isIntersection1 = (r === factorA && c === factorB);
          const isIntersection2 = (r === factorB && c === factorA);

          if (isIntersection1 || isIntersection2) {
            cellClass += targetVal !== null ? " matrix-cell-target" : " matrix-cell-highlight";
            isTextActive = true;
          }
        }

        svgCells += `
          <rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" class="${cellClass}" />
          <text x="${x + cellSize / 2}" y="${y + cellSize / 2}" class="matrix-text ${isTextActive ? 'active' : ''}">
            ${isHeader || isTextActive ? val : ""}
          </text>
        `;
      }
    }

    container.innerHTML = `
      <svg class="mult-matrix-svg" viewBox="0 0 ${viewBoxSize} ${viewBoxSize}">
        ${svgCells}
      </svg>
    `;
  }
};