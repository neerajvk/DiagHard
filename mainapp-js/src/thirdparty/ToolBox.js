import React from 'react';
const cytoscape = require('cytoscape');
import styles from './CytoscapeStyles'
import { connect } from 'react-redux';
const _ = require('lodash');

import {addNode} from "../store/actions";
import NodeType from '../store/NodeType';

const divStyle = {
    width: '100%',
    height: '100px',
    backgroundColor: '#eeeeee',
};

const mapDispatchToProps = dispatch => {
    return {
        addNode: node => dispatch(addNode(node))
    };
};

class ConnectedToolBox extends React.Component {
    constructor(props){
        super(props);
        this.state = { cy: {} };
        this.nodeClicked = this.nodeClicked.bind(this);
    }

    nodeClicked(evt){
        console.log('node clicked');
        this.props.addNode(evt.target);
    }

    componentDidMount(){

        const cy = cytoscape({
            container: this.cyRef,
            elements: {
                nodes: [
                    { data: _.assign({}, { id: 'yesNo', name: 'Yes/No'}, NodeType.t.properties[ NodeType.t.YES_NO ])},
                    { data: _.assign({}, { id: 'simpleRest', name: 'Simple REST call'}, NodeType.t.properties[ NodeType.t.SIMPLE_REST_CALL ]) }
                ]
            },
            style: styles.styles
        });
        cy.autolock(true);
        this.state = { cy };
        cy.on('click', 'node', this.nodeClicked);
    }

    render() {
        return <div style={divStyle} ref={(cyRef) => { this.cyRef = cyRef; }} />
    }

}
const ToolBox = connect(null, mapDispatchToProps)(ConnectedToolBox);
export default ToolBox;
