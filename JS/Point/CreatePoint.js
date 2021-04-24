'use strict';

export function CreatePoint(Graph, e, currentName) {

    Graph.push({ // Добовляем вершину в граф
        name: currentName,
        visited: false,
        X: e.pageX,
        Y: e.pageY,
        // ChangeWidth(older, current, left) {
        //     return Math.round(parseInt(left) * parseInt(current) / parseInt(older));
        // }
    });
    document.getElementById("point_count").textContent = "Amount of points: " + Graph.length; // меняем кол-во вершин 


    let point = document.createElement('div'); // Создаем точку
    point.setAttribute("name", currentName);
    point.id = "Point";
    point.style.left = e.pageX - 5 + 'px';
    point.style.top = e.pageY - 5 + 'px';

    let caption = document.createElement('div'); // Создаем подпись к ней
    caption.textContent = caption.id = currentName;
    caption.className = "caption";
    caption.style.left = e.pageX - 6 + 'px';
    caption.style.top = e.pageY - 30 + 'px';

    document.getElementById('Draw').appendChild(point);   // Отображаем элемент
    document.getElementById('Draw').appendChild(caption); // Отображаем элемент

    return String.fromCodePoint(currentName.codePointAt(0) + 1); // Изменяем на след букву
}