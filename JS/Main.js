import { AddPoint, Graph } from './Point/AddPoint.js';
import { RemovePoint } from './Point/RemovePoint.js';

'use strict';

// let width = document.getElementById("Draw").clientWidth;
// let height = document.getElementById("Draw").clientWidth;

Draw.addEventListener("click", AddPoint);
Body.addEventListener("contextmenu", RemovePoint);
// window.addEventListener('resize', function (event) {

//     for (let point of document.querySelectorAll('.point'))
//         for (let i = 0; i < Graph.length; i++) {
//             if (Graph[i].name == point.getAttribute("name"))
//                 point.style.left = Graph[i].ChangeWidth(width, document.getElementById("Draw").clientWidth, point.style.left) + 'px';
//         }


// }, true);