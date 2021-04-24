import { AddEdge } from '../Edge/AddEdge.js';
import { MinTreeSearch } from './Alghoritm.js'

'use strict';

export function CreateSubGraph(Graph, Edges) {

    let SubGraph = MinTreeSearch(Edges, CreateMatrix(Graph)); // Создаем минимальное остравное дерево

    document.getElementById("Length").innerText = "Average length: " + Math.round(SubGraph.reduce((sum, elem) => sum + elem.length, 0) / 10);
    document.getElementById("edge_count").innerText = "Amount of edge: " + SubGraph.length;

    SubGraph.forEach(element => { // Отрисовываем минимальное островное дерево
        AddEdge(element);
    });

    for (let line of document.querySelectorAll('.line')) { // Удаляем отрисованные линии  
        let result = SubGraph.find(function (item) {
            if (item.name == line.getAttribute("name"))
                return true;
        });
        if (!result) line.remove();
    }

    ChangeTable(SubGraph, Graph); // Изменяем таблицу
}

export function CreateMatrix(arr) { // Создаем связный список
    let adj = new Map;

    for (let i = 0; i < arr.length; i++) {
        adj.set(arr[i].name, []); // Добавляем точку
        for (let j = 0; j < arr.length; j++) {
            if (i != j)
                adj.get(arr[i].name).push(arr[j]); // Добавляем связанныей с ней точки
        }
    }

    return adj;
}

export function ChangeTable(Arr, Graph) {

    document.getElementById("Table")?.remove(); // Удаляем старую таблицу

    let table = document.createElement("table"); // Создаем таблицу
    table.id = "Table";
    let n = Graph.length + 1;

    for (let i = 0; i < n; i++) {
        let tr = document.createElement("tr"); // Создаем строку
        for (let j = 0; j < n; j++) {
            let td = document.createElement("td"); // Создаем ячейку
            td.style.position = "sticky";
            if (i == 0 && j != 0) { // Фиксируем первую строку и именуем ее
                td.style.top = 0 + "px";
                td.style.backgroundColor = 'rgb(170, 170, 170)';
                td.style.zIndex = 9;
                td.innerHTML = Graph[j - 1].name;
            } else if (j == 0 && i != 0) { // Фиксируем первый столбец и именуем его
                td.style.backgroundColor = 'rgb(170, 170, 170)';
                td.style.left = 0 + "px";
                td.style.zIndex = 9;
                td.innerHTML = Graph[i - 1].name;
            } else if (i > 0 && j > 0) { // Заполняем таблицу значениями
                Arr.forEach(element => {
                    if (i != j && element.name.includes(Graph[i - 1].name) && element.name.includes(Graph[j - 1].name)) {
                        td.innerHTML = Math.round(element.length / 10);
                    }
                });
            }

            if (td.innerHTML == "") { // Отсутствует прямая дорога
                td.innerHTML = "-";
            }
            if (j == 0 && i == 0) { // Первая ячейка
                td.style.top = 0 + "px";
                td.style.left = 0 + "px";
                td.style.backgroundColor = 'rgb(104,104,104)';
                td.style.zIndex = 10;
                td.innerHTML = "";
            }
            tr.append(td); // Добовляем ячейку к строке
        }
        table.append(tr); // Добавляем строку к таблице
    }

    document.getElementById("box").appendChild(table); // Отрисовываем таблицу
}