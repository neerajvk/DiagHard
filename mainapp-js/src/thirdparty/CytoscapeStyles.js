var cytoscape = require('cytoscape');

var styles = cytoscape.stylesheet()
    .selector('node')
    .css({
        'shape': 'data(faveShape)',
        'width': 'mapData(weight, 40, 80, 20, 60)',
        'content': 'data(name)',
        'text-valign': 'center',
        'text-outline-width': 1,
        // 'text-outline-color': 'data(faveColor)',
        'background-color': 'data(faveColor)',
        'color': '#fff',
        'font-size': 20,
    })
    .selector(':selected')
    .css({
        'border-width': 1,
        'border-color': '#333'
    })
    .selector('edge')
    .css({
        'curve-style': 'bezier',
        'opacity': 0.666,
        'width': 'mapData(strength, 70, 100, 2, 6)',
        'target-arrow-shape': 'triangle',
        'source-arrow-shape': 'circle',
        'line-color': 'data(faveColor)',
        'source-arrow-color': 'data(faveColor)',
        'target-arrow-color': 'data(faveColor)'
    })
    .selector('edge.questionable')
    .css({
        'line-style': 'dotted',
        'target-arrow-shape': 'diamond'
    })
    .selector('.faded')
    .css({
        'opacity': 0.25,
        'text-opacity': 0
    });

var options = {
    name: 'grid',
    fit: true,
    condense: false,
    rows: 10,
    cols: 15,
};

var options1 = {
    name: 'cose',
    // Called on `layoutready`
    ready: function() {},
    // Called on `layoutstop`
    stop: function() {},
    // Whether to animate while running the layout
    animate: true,
    // The layout animates only after this many milliseconds
    // (prevents flashing on fast runs)
    animationThreshold: 250,
    // Number of iterations between consecutive screen positions update
    // (0 -> only updated on the end)
    refresh: 20,
    // Whether to fit the network view after when done
    fit: true,
    // Padding on fit
    padding: 30,
    // Constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    boundingBox: undefined,
    // Extra spacing between components in non-compound graphs
    componentSpacing: 100,
    // Node repulsion (non overlapping) multiplier
    nodeRepulsion: function(node) {
        return 400000;
    },
    // Node repulsion (overlapping) multiplier
    nodeOverlap: 10,
    // Ideal edge (non nested) length
    idealEdgeLength: function(edge) {
        return 10;
    },
    // Divisor to compute edge forces
    edgeElasticity: function(edge) {
        return 100;
    },
    // Nesting factor (multiplier) to compute ideal edge length for nested edges
    nestingFactor: 5,
    // Gravity force (constant)
    gravity: 80,
    // Maximum number of iterations to perform
    numIter: 1000,
    // Initial temperature (maximum node displacement)
    initialTemp: 200,
    // Cooling factor (how the temperature is reduced between consecutive iterations
    coolingFactor: 0.95,
    // Lower temperature threshold (below this point the layout will end)
    minTemp: 1.0,
    // Whether to use threading to speed up the layout
    useMultitasking: true
};


module.exports.styles = styles;
module.exports.options = options;