import { CreatePoint } from './CreatePoint.js'
import { CreateEdge } from '../Edge/CreateEdge.js'
import { CreateSubGraph} from '../SubGraph/CreateSubGraph.js'

export let Edges = new Array;
export let Graph = new Array;
export let SubGraph = new Array;

let CurrentName = 'A';

export function AddPoint(event) {

    if (CurrentName != "[") {
        CurrentName = CreatePoint(Graph, event, CurrentName);
        CreateEdge(Graph, Edges);
        SubGraph = CreateSubGraph(Graph, Edges);
    }
}

// export function CreateMatrix(arr) {
//     let adj = new Map;

//     for (let i = 0; i < arr.length; i++) {
//         adj.set(arr[i].name, []);
//         for (let j = 0; j < arr.length; j++) {
//             if (i != j)
//                 adj.get(arr[i].name).push(arr[j]);
//         }
//     }

//     return adj;
// }

// export function ChangeTable(Arr) {

//     document.getElementById("Table")?.remove();

//     let table = document.createElement("table");
//     table.id = "Table";
//     let n = Graph.length + 1;

//     for (let i = 0; i < n; i++) {
//         let tr = document.createElement("tr");
//         for (let j = 0; j < n; j++) {
//             let td = document.createElement("td");
//             if (i == 0 && j != 0) {
//                 td.innerHTML = Graph[j - 1].name;
//             }
//             else if (j == 0 && i != 0) {
//                 td.innerHTML = Graph[i - 1].name;
//             }
//             else if (i > 0 && j > 0) {
//                 Arr.forEach(element => {
//                     if (i != j && element.name.includes(Graph[i - 1].name) && element.name.includes(Graph[j - 1].name)) {
//                         td.innerHTML = Math.round(element.length / 10);
//                     }
//                 });
//             }

//             if (td.innerHTML == "") {
//                 td.innerHTML = "-";
//             }
//             if (j == 0 && i == 0) {
//                 td.innerHTML = "";
//             }
//             tr.append(td);
//         }
//         table.append(tr);
//     }

//     document.getElementById("box").appendChild(table);
// }

// export function CreateSubGraph(Graph, Edges) {
//     SubGraph = MinTreeSearch(Edges, CreateMatrix(Graph));

//     document.getElementById("Length").innerText = "Average length: " + Math.round(SubGraph.reduce((sum, elem) => sum + elem.length, 0) / 10);
//     document.getElementById("edge_count").innerText = "Amount of edge: " + SubGraph.length;

//     SubGraph.forEach(element => {
//         AddEdge(element, Graph);
//     });

//     for (let line of document.querySelectorAll('.line')) {
//         let result = SubGraph.find(function (item) {
//             if (item.name == line.getAttribute("name"))
//                 return true;
//         });
//         if (!result) line.remove();
//     }

//     ChangeTable(SubGraph);
// }