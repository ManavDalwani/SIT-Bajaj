function validateEdge(edge) {
    const trimmed = edge.trim();

    const regex = /^[A-Z]->[A-Z]$/;

    if (!regex.test(trimmed)) {
        return { valid: false };
    }

    const [parent, child] = trimmed.split("->");

    if (parent === child) {
        return { valid: false };
    }

    return {
        valid: true,
        parent,
        child,
        edge: trimmed
    };
}

module.exports = validateEdge;