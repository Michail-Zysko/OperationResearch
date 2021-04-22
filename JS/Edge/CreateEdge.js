import { AddEdge } from './AddEdge.js'

export function CreateEdge(Graph, Edges) {
    for (let i = 0; i < Graph.length; i++)
        for (let j = i + 1; j < Graph.length; j++)
            if (!Edges.find(item => item.name == Graph[i].name + Graph[j].name) || Edges.length == 0) {
                AddEdge(Graph[i], Graph[j], Edges);
            }
}