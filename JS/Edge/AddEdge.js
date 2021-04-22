export function AddEdge(edge, Graph) {

    let from;
    let to;

    for (let i = 0; i < Graph.length; i++) {
        if (Graph[i].name == edge.name[0]) from = Graph[i];
        if (Graph[i].name == edge.name[1]) to = Graph[i];
        if (to !== undefined && from !== undefined) break;
    }

    let x, x1, y, y1;

    x = from.X;
    y = from.Y;
    x1 = to.X;
    y1 = to.Y;

    let line = document.createElement('div');
    line.setAttribute("name", from.name + to.name);
    line.setAttribute("length", edge.length);
    line.id = "Line";
    line.className = "line";

    line.style.left = x + 'px';
    line.style.top = y + 'px';
    line.style.width = edge.length + 'px';

    let angle = (Math.atan((y1 - y) / (x1 - x)) * 180 / Math.PI);

    if ((x1 <= x && y1 <= y) || (x1 < x && y1 > y)) {
        angle -= 180;
    }

    line.style.transform = 'rotate(' + angle + 'deg)';

    document.getElementById('Draw').appendChild(line);
    line.addEventListener("mouseover", ShowLength);
    line.addEventListener("mouseout", HideLength);
}

function ShowLength(event) {
    let TextLength = document.createElement('div');
    TextLength.id = "TextLength";
    TextLength.innerHTML = Math.round(event.currentTarget.getAttribute("length") / 10);
    TextLength.style.left = event.clientX + 10 + "px";
    TextLength.style.top = event.clientY - 30 + "px";
    TextLength.style.transition = "2s";
    document.body.append(TextLength);
}

function HideLength() {
    document.getElementById("TextLength").remove();
}