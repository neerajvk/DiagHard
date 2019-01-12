const uuidv4 = require('uuid/v4');

import NodeType from './NodeType'

class SkillNode {

    constructor(type, label){
        this.id = uuidv4();
        this.label = label;
        this.type = type;
    }

    static getUiData(node){
        return {
            id: node.id,
            name: node.label,
            weight: NodeType.t.properties[node.type].weight,
            faveColor: NodeType.t.properties[node.type].faveColor,
            faveShape: NodeType.t.properties[node.type].faveShape
        }
    }

}

export default SkillNode;