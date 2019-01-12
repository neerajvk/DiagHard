const uuidv4 = require('uuid/v4');

class SkillEdge {
    constructor(fromNode, toNode){
        this.id = uuidv4();
        this.from = fromNode;
        this.to = toNode;
    }

    static getUiData(edge){
        return {
            id: edge.id,
            source: edge.from.id,
            target: edge.to.id,
            faveColor: '#000066',
            strength: 50
        }
    }
}

export default SkillEdge;