import React from 'react';
import {connect} from "react-redux";
var axios = require('axios');

import {updateSkillName, skillSaveSuccess} from "../store/actions";

const divStyle = {
    width: '100%',
    backgroundColor: '#aaaaaa',
    position: 'relative',
    // height: '50px',
    textAlign: 'right',
    padding: 10
};


const mapStateToProps = state => {
    return {
        skillGraph: state.skillGraph,
        currentSkillName: state.currentSkillName,
        currentSkillDirty: state.currentSkillDirty,
        currentSkillId: state.currentSkillId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateSkillName: newName => dispatch(updateSkillName(newName)),
        skillSaveSuccess: skillId => dispatch(skillSaveSuccess(skillId))
    };
};


class ConnectedSkillActions extends React.Component {

    constructor(props){
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.handleSkillNameChange = this.handleSkillNameChange.bind(this);
        this.handlePublish = this.handlePublish.bind(this);
    }

    handleSkillNameChange(evt){
        console.log(evt.target.value);
        this.props.updateSkillName(evt.target.value);

    }

    handlePublish(evt){
        console.log('Publishing skill ' + this.props.currentSkillId);
    }

    handleSave(evt){
        console.log('handlesave evt=');
        console.log(evt);

        if (!this.props.currentSkillName || 0 === this.props.currentSkillName.length ){
            console.log('No skill name provided');
            window.alert('Please provide skill name');
            return;
        }

        console.log('Handle save skillid=' + this.props.skillId);
        console.log(this.props.skillGraph.serialize());

        var current = this;

        // Send a POST request
        axios({
            method: 'post',
            url: '/skills/save',
            data: {
                skillId: this.props.currentSkillId,
                // vendorId: this.props.vendorId,
                skillString: this.props.skillGraph.serialize(),
                skillName: this.props.currentSkillName
            }
        }).then(function(response) {
            console.log('response');
            console.log(response);

            //todo validate response

            console.log(response.data.params.skillId);

            current.props.skillSaveSuccess(response.data.params.skillId);

        }).catch(function(err){
            console.log('caught error');
            console.log(err);
        });

    }

    render() {

        // console.log('skillId=' + this.props.currentSkillId);
        // console.log('vendorId=' + this.props.vendorId);

        var saveLabel = 'Save' + ((this.props.currentSkillId)?'':'...');
        console.log('dirty? ' + this.props.currentSkillDirty);

        return (<div style={divStyle}>
            <p>Skill ID: {this.props.currentSkillId}</p>
            <div>
                <input type="text"
                       value={this.props.currentSkillName}
                       onChange={this.handleSkillNameChange} />
                <button type="button"
                        className="btn btn-primary"
                        disabled={!this.props.currentSkillDirty}
                        onClick={this.handleSave}>{saveLabel}</button>
                <button type="button"
                        className="btn btn-success"
                        disabled={this.props.currentSkillDirty}
                        onClick={this.handlePublish}>Publish Skill</button>
            </div>

        </div>)};

}


const SkillActions = connect(mapStateToProps, mapDispatchToProps) (ConnectedSkillActions);
export default SkillActions;
