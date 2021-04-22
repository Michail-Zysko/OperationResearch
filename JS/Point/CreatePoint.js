export function CreatePoint(Graph, e, CurrentName) {

    Graph.push({
        name: CurrentName,
        visited: false,
        X: e.pageX,
        Y: e.pageY,
        // ChangeWidth(older, current, left) {
        //     return Math.round(parseInt(left) * parseInt(current) / parseInt(older));
        // }
    });
    document.getElementById("point_count").textContent = "Amount of points: " + Graph.length;

    let point = document.createElement('div');
    point.setAttribute("name", CurrentName);
    point.id = "Point";
    point.className = "point";

    point.style.left = e.pageX - 5 + 'px';
    point.style.top = e.pageY - 5 + 'px';

    let caption = document.createElement('div');
    caption.textContent = CurrentName;
    caption.className = "caption";
    caption.id = CurrentName;

    caption.style.left = e.pageX - 6 + 'px';
    caption.style.top = e.pageY - 30 + 'px';

    document.getElementById('Draw').appendChild(point);
    document.getElementById('Draw').appendChild(caption);

    return CurrentName = String.fromCodePoint(CurrentName.codePointAt(0) + 1);
}