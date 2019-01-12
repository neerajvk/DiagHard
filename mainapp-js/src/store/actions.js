import { TOOLBOX_ADD_NODE, CANCEL_ADD_NODE, INITIALIZE_CANVAS, SPLIT_EDGE} from './reducer'
import { UPDATE_NEW_NODE_LABEL, UPDATE_SKILL_GRAPH, UPDATE_SKILL_NAME, SKILL_SAVE_SUCCESS } from './reducer';

export const addNode = node => ({
    type: TOOLBOX_ADD_NODE,
    payload: node
});

export const cancelAddNode = () =>({
     type: CANCEL_ADD_NODE
});

export const initializeCanvas = el => ({
    type: INITIALIZE_CANVAS,
    payload: el
});

export const splitEdge = el => ({
    type: SPLIT_EDGE,
    payload: el
});

export const updateNewNodeLabel = val =>({
    type: UPDATE_NEW_NODE_LABEL,
    payload: val
});

export const updateSkillGraph = (addNodes, deleteNodes, addEdges, deleteEdges) =>({
    type: UPDATE_SKILL_GRAPH,
    payload: {
        addNodes: addNodes,
        deleteNodes: deleteNodes,
        addEdges: addEdges,
        deleteEdges: deleteEdges
    }

});

export const updateSkillName = (newName) =>({
    type: UPDATE_SKILL_NAME,
    payload: newName

});

export const skillSaveSuccess = (skillId) => ({
    type: SKILL_SAVE_SUCCESS,
    payload: skillId
});