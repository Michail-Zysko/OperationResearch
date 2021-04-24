'use strict';

export function AddEdge(edge) {

    let x, x1, y, y1; // Узнаем начальное и конечное положение линии

    x = edge.fromX;
    y = edge.fromY;
    x1 = edge.toX;
    y1 = edge.toY;

    let angle = (Math.atan((y1 - y) / (x1 - x)) * 180 / Math.PI); // Считаем угол поворота

    if ((x1 <= x && y1 <= y) || (x1 < x && y1 > y)) {
        angle -= 180;
    }

    let line = document.createElement('div'); // Создаем линию со всеми свйствами
    line.setAttribute("name", edge.name);
    line.setAttribute("length", edge.length);
    line.id = "Line";
    line.className = "line";
    line.style.left = x + 'px';
    line.style.top = y + 'px';
    line.style.width = edge.length + 'px';
    line.style.transform = 'rotate(' + angle + 'deg)';

    document.getElementById('Draw').appendChild(line); // Отрисовываем линию 
    line.addEventListener("mouseover", ShowLength);    // Добовляем события
    line.addEventListener("mouseout", HideLength);     // Добовляем события
}

function ShowLength(event) {
    let TextLength = document.createElement('div'); // Показываем длинну
    TextLength.id = "TextLength";
    TextLength.textContent = Math.round(event.currentTarget.getAttribute("length") / 10);
    TextLength.style.left = event.clientX + 10 + "px";
    TextLength.style.top = event.clientY - 30 + "px";
    document.body.append(TextLength);
}

function HideLength() { // Скрываем длинну
    document.getElementById("TextLength")?.remove();
}