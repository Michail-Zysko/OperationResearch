import { AddEdge } from '../Edge/AddEdge.js';
import { MinTreeSearch } from './Alghoritm.js'

export function CreateSubGraph(Graph, Edges) {

    let SubGraph = MinTreeSearch(Edges, CreateMatrix(Graph));

    document.getElementById("Length").innerText = "Average length: " + Math.round(SubGraph.reduce((sum, elem) => sum + elem.length, 0) / 10);
    document.getElementById("edge_count").innerText = "Amount of edge: " + SubGraph.length;

    SubGraph.forEach(element => {
        AddEdge(element, Graph);
    });

    for (let line of document.querySelectorAll('.line')) {
        let result = SubGraph.find(function (item) {
            if (item.name == line.getAttribute("name"))
                return true;
        });
        if (!result) line.remove();
    }

    ChangeTable(SubGraph, Graph);
    return SubGraph;
}

export function CreateMatrix(arr) {
    let adj = new Map;

    for (let i = 0; i < arr.length; i++) {
        adj.set(arr[i].name, []);
        for (let j = 0; j < arr.length; j++) {
            if (i != j)
                adj.get(arr[i].name).push(arr[j]);
        }
    }

    return adj;
}

export function ChangeTable(Arr, Graph) {

    document.getElementById("Table")?.remove();

    let table = document.createElement("table");
    table.id = "Table";
    let n = Graph.length + 1;

    for (let i = 0; i < n; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < n; j++) {
            let td = document.createElement("td");
            td.style.position = "sticky";
            if (i == 0 && j != 0) {
                td.style.top = 0 + "px";
                td.style.backgroundColor = 'green';
                td.style.zIndex = 9;
                td.innerHTML = Graph[j - 1].name;
            }
            else if (j == 0 && i != 0) {
                td.style.backgroundColor = 'green';
                td.style.left = 0 + "px";
                td.style.zIndex = 9;
                td.innerHTML = Graph[i - 1].name;
            }
            else if (i > 0 && j > 0) {
                Arr.forEach(element => {
                    if (i != j && element.name.includes(Graph[i - 1].name) && element.name.includes(Graph[j - 1].name)) {
                        td.innerHTML = Math.round(element.length / 10);
                    }
                });
            }

            if (td.innerHTML == "") {
                td.innerHTML = "-";
            }
            if (j == 0 && i == 0) {
                td.style.top = 0 + "px";
                td.style.left = 0 + "px";
                td.style.backgroundColor = 'rgb(104,104,104)';
                td.style.zIndex = 10;
                td.innerHTML = "";
            }
            tr.append(td);
        }
        table.append(tr);
    }

    document.getElementById("box").appendChild(table);
}