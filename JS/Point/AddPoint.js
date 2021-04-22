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