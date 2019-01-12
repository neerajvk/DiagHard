import SkillNode from './SkillNode';
import SkillEdge from './SkillEdge';

class SkillGraph {

    constructor(json_string){
        this.nodes = {};
        this.edges = {};
        if (json_string){
            var obj = JSON.parse(json_string);
            this.nodes = obj.nodes;
            this.edges = obj.edges;
        }
    }

    getUiNodes(){
        var ret = [];
        for (var id in this.nodes){
            ret.push({ data: SkillNode.getUiData(this.nodes[id]) })
        }
        console.log('getUiNodes=');
        console.log(ret);
        return ret;
    }

    getUiEdges(){
        var ret = [];
        for (var id in this.edges){
            ret.push({ data: SkillEdge.getUiData(this.edges[id]) });
        }
        return ret;
    }

    addNode(skillNode){
        this.nodes[skillNode.id] = skillNode;
    }

    deleteNode(skillNode){
        delete this.nodes[skillNode.id];
    }

    addEdge(skillEdge){
        this.edges[skillEdge.id] = skillEdge;
    }

    deleteEdge(skillEdge){
        delete this.edges[skillEdge.id];
    }

    serialize(){
        return JSON.stringify(this);
    }

}
export default SkillGraph;