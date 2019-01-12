import React from 'react';
import {connect} from "react-redux";
import {updateNewNodeLabel, updateSkillGraph} from "../../store/actions";
import SkillNode from "../../store/SkillNode";
import SkillEdge from "../../store/SkillEdge";

const mapStateToProps = state => {
    return {
        nodeToAdd: state.nodeToAdd,
        edgeToSplit: state.edgeToSplit,
        skillGraph: state.skillGraph,
        newNodeDetails : state.newNodeDetails
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateNewNodeLabel: value => dispatch(updateNewNodeLabel(value)),
        updateSkillGraph: (addNodes, deleteNodes, addEdges, deleteEdges) => dispatch(updateSkillGraph(addNodes, deleteNodes, addEdges, deleteEdges))
    };
};



class ConnectedYesNo extends React.Component {

    constructor(props){
        super(props);
        this.renderEdgeToSplit = this.renderEdgeToSplit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        console.log("submit!");
        console.log(e);
        console.log(this.props.newNodeDetails.label);

        var edgeDef = this.props.skillGraph.edges[this.props.edgeToSplit.id()];
        console.log("edgeDef=");
        console.log(edgeDef);
        if (edgeDef) {
            var fromID = edgeDef.from.id;
            var toID = edgeDef.to.id;

            var fromNode = this.props.skillGraph.nodes[fromID];
            var toNode = this.props.skillGraph.nodes[toID];

            var newNode = new SkillNode(this.props.nodeToAdd.id(), this.props.newNodeDetails.label);
            var newEdge1 = new SkillEdge(fromNode, newNode);
            var newEdge2 = new SkillEdge(newNode, toNode);

            this.props.updateSkillGraph([newNode], [], [newEdge1, newEdge2], [edgeDef]);

            console.log("new graph");
            console.log(this.props.skillGraph);

        }


    }

    handleChange(e){
        this.props.updateNewNodeLabel(e.target.value)
    }

    renderEdgeToSplit(){
        console.log("edges are ");
        console.log(this.props.skillGraph.edges);
        console.log("edge id=" + this.props.edgeToSplit.id());
        var edgeDef = this.props.skillGraph.edges[this.props.edgeToSplit.id()];
        console.log("edgeDef=");
        console.log(edgeDef);
        if (edgeDef){
            //we have a valid edge to split
            var fromLabel = edgeDef.from.label;
            var toLabel = edgeDef.to.label;

            var fromID = edgeDef.from.id;
            var toID = edgeDef.to.id;

            return (<div>
                        <label htmlFor="edgeToSplit">Select Edge to split: &nbsp;</label>
                        <label id="edgeToSplit">{fromLabel} to {toLabel}</label>
                            <form onSubmit={this.handleSubmit}>
                                <input type="text" value={this.props.newNodeDetails.label} onChange={this.handleChange} />
                                <input type="submit" value="Submit" />
                            </form>
                    </div>
            );
        }
        else{
            return undefined;
        }
    }

    render() {
        console.log('YesNo form');
        return (<div id='yesNoForm'>
            { this.props.edgeToSplit ? this.renderEdgeToSplit() : <label id="edgeToSplit"> &lt;&lt; No edge selected yet! &gt;&gt; </label> }
        </div>)
    }

}

const YesNo = connect(mapStateToProps, mapDispatchToProps) (ConnectedYesNo);
export default YesNo;
