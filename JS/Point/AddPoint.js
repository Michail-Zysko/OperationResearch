import { CreatePoint } from './CreatePoint.js'
import { CreateEdge } from '../Edge/CreateEdge.js'
import { CreateSubGraph } from '../SubGraph/CreateSubGraph.js'

'use strict';

export let Graph = new Array; // Создаем множество вершин
export let Edges = new Array; // Создаем множество ребер

let currentName = 'A'; // Задаем имя первой вершины

export function AddPoint(event) {
    if (currentName != "[") { // Ограничиваем символами англиского алфавита
        currentName = CreatePoint(Graph, event, currentName); // Создаем точку
        CreateEdge(Graph, Edges); // Создаем ребра графа
        CreateSubGraph(Graph, Edges); // Создание минимального островного дерева
    }
}