export function CreateEdge(Graph, Edges) {
    for (let i = 0; i < Graph.length; i++)
        for (let j = i + 1; j < Graph.length; j++)
            if (!Edges.find(item => item.name == Graph[i].name + Graph[j].name) || Edges.length == 0) {

                Edges.push({
                    toX: Graph[j].X,
                    toY: Graph[j].Y,
                    fromX: Graph[i].X,
                    fromY: Graph[i].Y,
                    name: Graph[i].name + Graph[j].name,
                    length: Math.round(Math.sqrt((Graph[j].X - Graph[i].X) ** 2 + (Graph[j].Y - Graph[i].Y) ** 2)),
                });
            }
}