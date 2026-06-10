const validateEdge = require("../utils/validateEdge");

function processGraph(edges) {

    const invalidEntries = [];
    const duplicateEdges = [];

    const seenEdges = new Set();
    const duplicateTracker = new Set();

    const childParentMap = new Map();

    const adjacency = {};
    const allNodes = new Set();
    const childNodes = new Set();

    for (const edge of edges) {

        const result = validateEdge(edge);

        if (!result.valid) {
            invalidEntries.push(edge);
            continue;
        }

        const edgeString = result.edge;

        // Duplicate detection
        if (seenEdges.has(edgeString)) {

            if (!duplicateTracker.has(edgeString)) {
                duplicateEdges.push(edgeString);
                duplicateTracker.add(edgeString);
            }

            continue;
        }

        seenEdges.add(edgeString);

        const parent = result.parent;
        const child = result.child;

        // Multi-parent rule
        if (childParentMap.has(child)) {
            continue;
        }

        childParentMap.set(child, parent);

        // Graph construction
        if (!adjacency[parent]) {
            adjacency[parent] = [];
        }

        adjacency[parent].push(child);

        allNodes.add(parent);
        allNodes.add(child);

        childNodes.add(child);
    }

    return {
        invalidEntries,
        duplicateEdges,
        adjacency,
        allNodes: [...allNodes],
        childNodes: [...childNodes]
    };
}

module.exports = processGraph;