import { Graph, Edges, CreateMatrix, ChangeTable } from './AddPoint.js';
import { MinTreeSearch } from '../Alghoritm.js'
import { DrawLine } from '../DrawLine.js'

export function RemovePoint(e) {

	let point = document.elementFromPoint(e.pageX, e.pageY);

	if (point.id == "Point") {

		let PointName = point.getAttribute("name");

		document.getElementById(PointName).remove();

		Graph.find(function (item, index, array) {
			if (item.name == PointName) {
				array.splice(index, 1);
				return true;
			}
		});

		for (let i = Edges.length - 1; i > -1; i--) {
			if (Edges[i].name.includes(PointName)) {
				Edges.splice(i, 1);
			}
		}

		let lines = document.querySelectorAll('.line');

		for (let line of lines) {
			if (line.getAttribute("name").includes(PointName)) {
				line.remove();
			}
		}

		point.remove();

		let SubGraph = MinTreeSearch(Edges, CreateMatrix(Graph));
		ChangeTable(SubGraph);

		SubGraph.forEach(element => {
			DrawLine(element)
		});

		for (let line of lines) {

			let result = SubGraph.find(function (item) {
				if (item.name == line.getAttribute("name"))
					return true;
			});
			if (!result) line.remove();
		}

		document.getElementById("edge_count").innerText = "Amount of edge: " + SubGraph.length;
		document.getElementById("Length").innerText = "Average length: " + Math.round(SubGraph.reduce((sum, elem) => sum + elem.length, 0) / 10);
		document.getElementById("point_count").innerText = "Amount of points: " + Graph.length;
	}

	e.preventDefault();
}