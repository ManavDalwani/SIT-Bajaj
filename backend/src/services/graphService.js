const validateEdge = require("../utils/validateEdge");
const buildTree = require("../utils/buildTree");
const calculateDepth = require("../utils/calculateDepth");
const hasCycle = require("../utils/cycleDetection");

function processGraph(edges) {
    const invalid_entries = [];
    const duplicate_edges = [];

    const seenEdges = new Set();
    const duplicateTracker = new Set();

    const childParentMap = new Map();

    const adjacency = {};

    const allNodes = new Set();
    const childNodes = new Set();

    for (const edge of edges) {
        const result = validateEdge(edge);

        if (!result.valid) {
            invalid_entries.push(edge);
            continue;
        }

        const edgeString = result.edge;

        if (seenEdges.has(edgeString)) {
            if (!duplicateTracker.has(edgeString)) {
                duplicate_edges.push(edgeString);
                duplicateTracker.add(edgeString);
            }
            continue;
        }

        seenEdges.add(edgeString);

        const parent = result.parent;
        const child = result.child;

        if (childParentMap.has(child)) {
            continue;
        }

        childParentMap.set(child, parent);

        if (!adjacency[parent]) {
            adjacency[parent] = [];
        }

        adjacency[parent].push(child);

        allNodes.add(parent);
        allNodes.add(child);

        childNodes.add(child);
    }

    let roots = [];

    for (const node of allNodes) {
        if (!childNodes.has(node)) {
            roots.push(node);
        }
    }

    if (roots.length === 0 && allNodes.size > 0) {
        roots.push([...allNodes].sort()[0]);
    }

    const hierarchies = [];

    let total_trees = 0;
    let total_cycles = 0;

    let largest_tree_root = "";
    let maxDepth = 0;

    for (const root of roots) {
        const cycleExists = hasCycle(root, adjacency);

        if (cycleExists) {
            hierarchies.push({
                root,
                tree: {},
                has_cycle: true
            });

            total_cycles++;
        } else {
            const tree = {};
            tree[root] = buildTree(root, adjacency);

            const depth = calculateDepth(root, adjacency);

            hierarchies.push({
                root,
                tree,
                depth
            });

            total_trees++;

            if (
                depth > maxDepth ||
                (
                    depth === maxDepth &&
                    (
                        largest_tree_root === "" ||
                        root < largest_tree_root
                    )
                )
            ) {
                maxDepth = depth;
                largest_tree_root = root;
            }
        }
    }

    return {
        user_id: "manavdalwani_21122005",
        email_id: "mana.dalwani.btech2023@sitpune.edu.in",
        enrollment_number: "23070122132",
        hierarchies,
        invalid_entries,
        duplicate_edges,
        summary: {
            total_trees,
            total_cycles,
            largest_tree_root
        }
    };
}

module.exports = processGraph;