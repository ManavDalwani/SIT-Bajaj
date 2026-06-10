function buildTree(node, adjacency) {
    const children = adjacency[node] || [];

    const result = {};

    for (const child of children) {
        result[child] = buildTree(child, adjacency);
    }

    return result;
}

module.exports = buildTree;