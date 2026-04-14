/**
 * KORA Portfolio Sketch
 * Experimento interactivo integrado en layout
 */

function setup() {
    // Buscamos el contenedor por ID
    let container = document.getElementById('canvas-container');
    let w = container.offsetWidth;
    let h = container.offsetHeight;

    let canvas = createCanvas(w, h);
    canvas.parent('canvas-container'); // Mantiene el canvas dentro del div
    
    background(255);
}

function draw() {
    background(255, 50); // Efecto ghosting/trail
    
    // Estética técnica: Líneas de guía
    stroke(0, 30);
    strokeWeight(0.5);
    line(mouseX, 0, mouseX, height);
    line(0, mouseY, width, mouseY);

    // Cursor interactivo Bauhaus
    noFill();
    stroke(0);
    rectMode(CENTER);
    square(mouseX, mouseY, 40);
    
    // Punto de acento neón
    fill(0, 255, 65); // Verde terminal
    noStroke();
    circle(mouseX, mouseY, 4);
}

// Crucial para que sea responsivo
function windowResized() {
    let container = document.getElementById('canvas-container');
    resizeCanvas(container.offsetWidth, container.offsetHeight);
}
