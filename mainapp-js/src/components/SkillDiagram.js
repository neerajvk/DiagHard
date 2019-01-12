import React from 'react';
import { connect } from 'react-redux';

import { cancelAddNode } from "../store/actions";

import YesNo from './tool/YesNo';
import GraphContainer from '../thirdparty/GraphContainer';
import ToolDetails from './ToolDetails'

const canvasStyle = {
    width: '100%',
    height: '400px',
    border: '1pt #000000',
    backgroundColor: '#ccccff',
};

const toolDetailsStyle = {
    width: '100%',
    backgroundColor: '#ccffcc',
    position: 'relative',
};

const cancelToolStyle = {
    position: 'absolute',
    top: '5px',
    right: '5px',
    color: '#ff0000',
};

const mapStateToProps = state => {
    return {
        currentEditNode: state.nodeToAdd,
        skillGraph: state.skillGraph,
        edgeToSplit: state.edgeToSplit
    };
};

const mapDispatchToProps = dispatch => {
    return {
        cancelAddNode: node => dispatch(cancelAddNode(node)),
    };
};

class ConnectedSkillDiagram extends React.Component {

    constructor(props){
        super(props);
        this.state = { cyRef: {}};
        this.cancelToolDetails = this.cancelToolDetails.bind(this);
    }

    cancelToolDetails(){
        console.log('Cancel tool details');
        this.props.cancelAddNode();
    }

    renderToolDetails(){

        if (this.props.currentEditNode){
            var id = this.props.currentEditNode.id();
            if (id === 'yesNo'){
                return <YesNo />
            }
        }
        return undefined;
    }

    renderToolOptions(){

        return (<div id='toolDetails'
                     className='toolDetails'
                     style={toolDetailsStyle}>
            {this.renderToolDetails()}
            <a onClick={this.cancelToolDetails}
               alt="Cancel"
               style={cancelToolStyle}>
                <i className="fas fa-times"></i>
            </a>
        </div>);
    }

    render() {
        console.log('skilldiagram render');
        console.log(this.props.skillGraph);

        return (
            <div id='container'>
                { this.props.currentEditNode ? <ToolDetails />: undefined}
                <GraphContainer skillGraph={this.props.skillGraph}/>
            </div>
        )
    }

}
const SkillDiagram = connect(mapStateToProps, mapDispatchToProps) (ConnectedSkillDiagram);
export default SkillDiagram;
