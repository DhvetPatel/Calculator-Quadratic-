const ph = document.getElementById("placeholder");

// ── Basic Calculator ──

function ap(v) {
    ph.value += v;
}

function clearVal() {
    ph.value = "";
}

function calculate() {
    try {
        ph.value = eval(ph.value);
    } catch {
        ph.value = "Error";
    }
}

// ── Switch ──

let showingBasic = true;

function switchCalc() {
    showingBasic = !showingBasic;
    document.getElementById("basicCalc").style.display = showingBasic ? "block" : "none";
    document.getElementById("quadCalc").style.display  = showingBasic ? "none"  : "block";
}

// ── Quadratic Calculator ──

function clearQuad() {
    document.getElementById("value_a").value = "";
    document.getElementById("value_b").value = "";
    document.getElementById("value_c").value = "";
    document.getElementById("Ans").innerHTML = "Roots will appear here";
}

function quadratic() {
    const a = Number(document.getElementById("value_a").value);
    const b = Number(document.getElementById("value_b").value);
    const c = Number(document.getElementById("value_c").value);
    const ans = document.getElementById("Ans");

    const aVal = document.getElementById("value_a").value;
    const bVal = document.getElementById("value_b").value;
    const cVal = document.getElementById("value_c").value;

    if (aVal === "" || bVal === "" || cVal === "") {
        ans.innerHTML = "Please enter values for a, b, and c.";
        return;
    }

    const D = b * b - 4 * a * c;

    if (D > 0) {
        const x1 = (-b + Math.sqrt(D)) / (2 * a);
        const x2 = (-b - Math.sqrt(D)) / (2 * a);
        ans.innerHTML = `Two real roots:<br>x₁ = ${x1.toFixed(4)}&nbsp;&nbsp; x₂ = ${x2.toFixed(4)}`;
    } else if (D === 0) {
        const x1 = -b / (2 * a);
        ans.innerHTML = `One repeated root:<br>x = ${x1.toFixed(4)}`;
    } else {
        const re = (-b / (2 * a)).toFixed(4);
        const im = (Math.sqrt(-D) / (2 * a)).toFixed(4);
        ans.innerHTML = `Complex roots:<br>x₁ = ${re} + ${im}i&nbsp;&nbsp; x₂ = ${re} − ${im}i`;
    }
}

// ── Graph Popup ──

function openGraph() {
    const a = Number(document.getElementById("value_a").value);
    const b = Number(document.getElementById("value_b").value);
    const c = Number(document.getElementById("value_c").value);

    const xs = [], ys = [];
    for (let x = -10; x <= 10; x += 0.1) {
        xs.push(+x.toFixed(2));
        ys.push(a * x * x + b * x + c);
    }

    Plotly.newPlot("graphDiv", [{
        x: xs,
        y: ys,
        type: "scatter",
        mode: "lines",
        line: { color: "#026e70", width: 2.5 }
    }], {
        title: `y = ${a}x² + ${b}x + ${c}`,
        margin: { t: 40, l: 50, r: 20, b: 40 },
        xaxis: { title: "x", zeroline: true },
        yaxis: { title: "y", zeroline: true },
        width: 520,
        height: 360
    }, { displayModeBar: false });

    document.getElementById("graphPopup").classList.add("active");
    document.getElementById("overlay").classList.add("active");
}

function closeGraph() {
    document.getElementById("graphPopup").classList.remove("active");
    document.getElementById("overlay").classList.remove("active");
}

// ── Drag Logic ──

const popup  = document.getElementById("graphPopup");
const header = document.getElementById("graphHeader");

let isDragging = false, startX, startY, initLeft, initTop;

header.addEventListener("mousedown", e => {
    isDragging = true;
    const rect = popup.getBoundingClientRect();
    // Replace transform-based centering with absolute px on first drag
    popup.style.left      = rect.left + "px";
    popup.style.top       = rect.top  + "px";
    popup.style.transform = "none";

    startX   = e.clientX;
    startY   = e.clientY;
    initLeft = rect.left;
    initTop  = rect.top;
    e.preventDefault();
});

document.addEventListener("mousemove", e => {
    if (!isDragging) return;
    popup.style.left = initLeft + (e.clientX - startX) + "px";
    popup.style.top  = initTop  + (e.clientY - startY) + "px";
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});
