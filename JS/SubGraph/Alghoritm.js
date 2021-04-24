import { Graph } from '../Point/AddPoint.js'

'use strict';

export function MinTreeSearch(Edges, Arr) {

    let NewEdge = Edges.slice();
    NewEdge.sort((a, b) => b.length - a.length); // Сортируем ребра по убыванию

    let result = NewEdge.slice();

    let n = NewEdge.length;
    let m = Graph.length;
    let k = 0;

    while (n > m - 1) {
        let Change = ChangeMatrix(Arr, NewEdge[k], true);

        if (!isGraphConnected(Change, Graph)) { // Если удаление ребра приведет к поторе связности графа
            Change = ChangeMatrix(Arr, NewEdge[k], false);
        }
        else { // Если удаление ребра не приведет к поторе связности графа
            result.splice(result.indexOf(NewEdge[k]), 1); // Удаляем ненужно ребро
            n--;
        }
        k++;
    }

    return result; // Получаем минимальное островное дерево
}

function ChangeMatrix(Arr, obj, del) { // Изменяем связный список после удаления и в случае неправильного удаления

    for (let point of Arr.keys()) {
        if (point == obj.name[0]) {
            let mas = Arr.get(point);
            if (!del) {
                for (let j = 0; j < Graph.length; j++)
                    if (Graph[j].name == obj.name[1]) mas.push(Graph[j]);
            }
            else {
                for (let i = 0; i < mas.length; i++)
                    if (mas[i].name == obj.name[1]) mas.splice(i, 1);
            }
        }
    }

    for (let point of Arr.keys()) {
        if (point == obj.name[1]) {
            let mas = Arr.get(point);
            if (!del) {
                for (let j = 0; j < Graph.length; j++)
                    if (Graph[j].name == obj.name[0]) mas.push(Graph[j]);
            }
            else {
                for (let i = 0; i < mas.length; i++)
                    if (mas[i].name == obj.name[0]) mas.splice(i, 1);
            }
        }
    }

    return Arr;
}

function isGraphConnected(Arr, Graph) { // проверяем граф на связность

    for (let i = 0; i < Arr.size; i++)
        for (let j = 0; j < Arr.size; j++)
            if (i != j && !bfs(Arr, Graph[i], Graph[j]))
                return false;

    return true;
}

function bfs(adj, s, t) { // Алгоритм обхода графа в ширину
    // adj - смежный список
    // s - начальная вершина
    // t - пункт назначения

    Graph.forEach(element => { // Все точки не были посещены
        element.visited = false;
    });

    // инициализируем очередь
    let queue = []
    // добавляем s в очередь
    queue.push(s)
    // помечаем s как посещенную вершину во избежание повторного добавления в очередь
    s.visited = true
    while (queue.length > 0) {
        // удаляем первый (верхний) элемент из очереди
        let v = queue.shift();
        // abj[v] - соседи v
        for (let neighbor of adj.get(v.name)) {
            // если сосед не посещался
            if (!neighbor.visited) {
                // добавляем его в очередь
                queue.push(neighbor)
                // помечаем вершину как посещенную
                neighbor.visited = true
                // если сосед является пунктом назначения, мы победили
                if (neighbor === t) return true
            }
        }
    }
    // если t не обнаружено, значит пункта назначения достичь невозможно
    return false
}