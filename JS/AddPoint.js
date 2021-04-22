import { AddEdge, DrawLine } from './DrawLine.js';

export let Edges = new Array;
export let Graph = new Array;
export let SubGraph = new Array;

let CurrentName = 'A';

export function AddPoint(e) {

    if (CurrentName != "[") {

        Graph.push({
            name: CurrentName,
            visited: false,
            X: e.pageX,
            Y: e.pageY,
        });
        document.getElementById("point_count").innerText = "Amount of points: " + Graph.length;

        let point = document.createElement('div');
        point.setAttribute("name", CurrentName);
        point.id = "Point";

        point.style.left = e.pageX - 5 + 'px';
        point.style.top = e.pageY - 5 + 'px';

        let caption = document.createElement('div');
        caption.innerText = CurrentName;
        caption.className = "caption";
        caption.id = CurrentName;

        caption.style.left = e.pageX - 6 + 'px';
        caption.style.top = e.pageY - 30 + 'px';

        document.getElementById('Draw').appendChild(point);
        document.getElementById('Draw').appendChild(caption);

        CurrentName = String.fromCodePoint(CurrentName.codePointAt(0) + 1);

        for (let i = 0; i < Graph.length; i++)
            for (let j = i + 1; j < Graph.length; j++)
                if (!Edges.find(item => item.name == Graph[i].name + Graph[j].name) || Edges.length == 0) {
                    AddEdge(Graph[i], Graph[j]);
                }

        SubGraph = MinTreeSearch(Edges, CreateMatrix(Graph));

        document.getElementById("Length").innerText = "Average length: " + Math.round(SubGraph.reduce((sum, elem) => sum + elem.length, 0) / 10);
        document.getElementById("edge_count").innerText = "Amount of edge: " + SubGraph.length;

        SubGraph.forEach(element => {
            DrawLine(element);
        });

        for (let line of document.querySelectorAll('.line')) {
            let result = SubGraph.find(function (item) {
                if (item.name == line.getAttribute("name"))
                    return true;
            });
            if (!result) line.remove();
        }

        ChangeTable(SubGraph);
    }
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

export function ChangeTable(Arr) {

    document.getElementById("Table")?.remove();

    let table = document.createElement("table");
    table.id = "Table";
    let n = Graph.length + 1;

    for (let i = 0; i < n; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < n; j++) {
            let td = document.createElement("td");
            if (i == 0 && j != 0) {
                td.innerHTML = Graph[j - 1].name;
            }
            else if (j == 0 && i != 0) {
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
                td.innerHTML = "";
            }
            tr.append(td);
        }
        table.append(tr);
    }

    document.getElementById("box").appendChild(table);
}