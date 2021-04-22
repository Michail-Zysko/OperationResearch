export function AddEdge(from, to, Edges) {
    Edges.push({
        toX: to.X,
        toY: to.Y,
        fromX: from.X,
        fromY: from.Y,
        name: from.name + to.name,
        length: Math.trunc(Math.sqrt((to.X - from.X) ** 2 + (to.Y - from.Y) ** 2)),
    });
}