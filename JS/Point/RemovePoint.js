import { Graph, Edges } from './AddPoint.js';
import { CreateSubGraph } from '../SubGraph/CreateSubGraph.js'

'use strict';

export function RemovePoint(e) {

	let point = document.elementFromPoint(e.pageX, e.pageY); // Берем элемет по месту клика

	if (point.id == "Point") { // Если это точка

		let PointName = point.getAttribute("name"); // Получаем имя точки

		document.getElementById(PointName)?.remove(); // Удаляем подпись к точке

		Graph.find(function (item, index) { // Т.к. удалили удаляем точку, то удалем ее из графа
			if (item.name == PointName) {
				Graph.splice(index, 1);
				return true;
			}
		});
		document.getElementById("point_count").innerText = "Amount of points: " + Graph.length; // Изменяем кол-во вершин графа

		for (let i = Edges.length - 1; i > -1; i--) // Удаляем ребра графа, которые были связаны с этой точкой
			if (Edges[i].name.includes(PointName)) {
				Edges.splice(i, 1);
			}

		for (let line of document.querySelectorAll('.line')) // Удаляем визиуальное отображение ребра
			if (line.getAttribute("name").includes(PointName)) {
				line?.remove();
			}

		point?.remove(); // Удаляем визуальное отображение точки

		CreateSubGraph(Graph, Edges); // Т.к. удалили точку, то исходный граф изменился
	}

	e.preventDefault(); // Чтобы не отображалось контекстное меню
}