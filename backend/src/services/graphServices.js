const validateEdge = require("../utils/validateEdge");

function processGraph(edges) {

    const invalidEntries = [];
    const validEdges = [];

    for (const edge of edges) {

        const result = validateEdge(edge);

        if (!result.valid) {
            invalidEntries.push(edge);
            continue;
        }

        validEdges.push(result);
    }

    return {
        invalidEntries,
        validEdges
    };
}

module.exports = processGraph;