function calculateDepth(node, adjacency) {
    const children = adjacency[node] || [];

    if (children.length === 0) {
        return 1;
    }

    let maxDepth = 0;

    for (const child of children) {
        maxDepth = Math.max(
            maxDepth,
            calculateDepth(child, adjacency)
        );
    }

    return maxDepth + 1;
}

module.exports = calculateDepth;