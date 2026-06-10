function hasCycle(startNode, adjacency) {
    const visited = new Set();
    const recursionStack = new Set();

    function dfs(node) {
        visited.add(node);
        recursionStack.add(node);

        const children = adjacency[node] || [];

        for (const child of children) {
            if (!visited.has(child)) {
                if (dfs(child)) {
                    return true;
                }
            } else if (recursionStack.has(child)) {
                return true;
            }
        }

        recursionStack.delete(node);

        return false;
    }

    return dfs(startNode);
}

module.exports = hasCycle;