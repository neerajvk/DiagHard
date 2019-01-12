import React from 'react';
const cytoscape = require('cytoscape');
let dagre = require('cytoscape-dagre');

import styles from "./CytoscapeStyles";
import { connect } from 'react-redux';
import {cancelAddNode, splitEdge } from "../store/actions";

const canvasStyle = {
    width: '100%',
    height: '400px',
    border: '1pt #000000',
    backgroundColor: '#ccccff',
};

const mapStateToProps = state => {
    return {
        nodeToAdd: state.nodeToAdd,
        skillGraph: state.skillGraph,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        splitEdge: edge => dispatch(splitEdge(edge)),
    };
};

class ConnectedGraphContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = { cyRef: {}};
        this.paintGraph = this.paintGraph.bind(this);
        this.edgeClicked = this.edgeClicked.bind(this);
    }

    componentDidMount(){

        console.log("componentDidMount");
        this.paintGraph();
    }

    componentDidUpdate(){
        console.log("componentDidUpdate");
        this.paintGraph();
    }

    edgeClicked(evt){
        console.log('edge clicked');
        console.log(evt.target);
        this.props.splitEdge(evt.target);

    }

    paintGraph(){
        console.log('paintGraph');
        console.log(this.props);

        var nodes = this.props.skillGraph.getUiNodes();
        var edges = this.props.skillGraph.getUiEdges();

        cytoscape.use(dagre);
        const cy = cytoscape({
            container: this.state.cyRef,
            elements: {
                nodes: nodes,
                edges: edges
            },
            style: styles.styles
        });
        cy.layout({name: 'dagre'}).run();
        // cy.autolock(true);
        this.state = { cy };
        if (this.props.nodeToAdd) {
            cy.on('click', 'edge', this.edgeClicked);
        }
    }

    render() {
        console.log('graphcontainer render');
        console.log(this.props);
        return (<div id='graphContainer'
                     style={canvasStyle}
                     ref={(cyRef) => { this.state.cyRef = cyRef; }}>
        </div>);
    }

}

const GraphContainer = connect(mapStateToProps, mapDispatchToProps) (ConnectedGraphContainer);
export default GraphContainer;
