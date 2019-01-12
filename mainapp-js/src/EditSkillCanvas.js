import React from 'react';
import Toolbox from './thirdparty/ToolBox'
import SkillDiagram from './components/SkillDiagram'
import SkillActions from './components/SkillActions'

class EditSkillCanvas extends React.Component {

    constructor(props){
        super(props);
        console.log('edit skills props=');
        console.log(props);

        this.state = {
            vendorId: props.vendorId
        };
    }

    render() {
        return (<div>
            <SkillActions skillId={this.props.skillId} vendorId={this.props.vendorId} />
            <Toolbox />
            <SkillDiagram />
        </div>)};

}

export default EditSkillCanvas;
