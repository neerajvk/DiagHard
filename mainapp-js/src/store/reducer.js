var _ = require('lodash');

export const TOOLBOX_ADD_NODE = 'TOOLBOX_ADD_NODE';
export const CANCEL_ADD_NODE = 'CANCEL_ADD_NODE';
export const INITIALIZE_CANVAS = 'INITIALIZE_CANVAS';
export const SPLIT_EDGE = 'SPLIT_EDGE';
export const UPDATE_NEW_NODE_LABEL = 'UPDATE_NEW_NODE_LABEL';
export const UPDATE_SKILL_GRAPH = 'UPDATE_SKILL_GRAPH';
export const UPDATE_SKILL_NAME = 'UPDATE_SKILL_NAME';
export const SKILL_SAVE_SUCCESS = 'SKILL_SAVE_SUCCESS';

const rootReducer = (state, action) => {
    console.log('action=' + action.type);
    console.log('payload=');
    console.log(action.payload);
    var clonedState = _.cloneDeep(state);
    switch (action.type) {
        case TOOLBOX_ADD_NODE:
            clonedState.nodeToAdd = action.payload;
            clonedState.edgeToSplit = undefined;
            clonedState.newNodeDetails = undefined;
            return clonedState;
        case CANCEL_ADD_NODE:
            clonedState.nodeToAdd = undefined;
            clonedState.edgeToSplit = undefined;
            clonedState.newNodeDetails = undefined;
            return clonedState;
        case INITIALIZE_CANVAS:
            return clonedState;
        case SPLIT_EDGE:
            clonedState.edgeToSplit = action.payload;
            clonedState.newNodeDetails = {};
            clonedState.newNodeDetails.label = undefined;
            return clonedState;
        case UPDATE_NEW_NODE_LABEL:
            clonedState.newNodeDetails.label = action.payload;
            return clonedState;
        case UPDATE_SKILL_GRAPH:
            for(var i=0; i < action.payload.addNodes.length; i++){
                var n = action.payload.addNodes[i];
                clonedState.skillGraph.addNode(n);
            }
            for(var i=0; i < action.payload.deleteNodes.length; i++){
                var n = action.payload.deleteNodes[i];
                clonedState.skillGraph.deleteNode(n);
            }

            for(var i=0; i < action.payload.addEdges.length; i++){
                var e = action.payload.addEdges[i];
                clonedState.skillGraph.addEdge(e);
            }
            for(var i=0; i < action.payload.deleteEdges.length; i++){
                var e = action.payload.deleteEdges[i];
                clonedState.skillGraph.deleteEdge(e);
            }
            clonedState.currentSkillDirty = true;
            return clonedState;
        case UPDATE_SKILL_NAME:
            clonedState.currentSkillName = action.payload;
            clonedState.currentSkillDirty = true;
            return clonedState;
        case SKILL_SAVE_SUCCESS:
            clonedState.currentSkillId = action.payload;
            clonedState.currentSkillDirty = false;
            return clonedState;
        default:
            return state;
    }
};

export default rootReducer;