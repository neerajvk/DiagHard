import {createStore} from "redux";
import rootReducer from "./reducer";
import SkillGraph from './SkillGraph';

var store = undefined;

var initialState = {
    nodeToAdd: undefined,
    skillGraph: new SkillGraph(),
    edgeToSplit: undefined,
    newNodeDetails: undefined,
    currentSkillName: undefined,
    currentSkillDirty: false,
    currentSkillId: undefined
};


function initializeStore( nodeToAdd, skillGraph, edgeToSplit, newNodeDetails, currentSkillName, currentSkillDirty, currentSkillId ){

    initialState.nodeToAdd = nodeToAdd;
    initialState.skillGraph = skillGraph;
    initialState.edgeToSplit = edgeToSplit;
    initialState.newNodeDetails = newNodeDetails;
    initialState.currentSkillName = currentSkillName;
    initialState.currentSkillDirty = currentSkillDirty;
    initialState.currentSkillId = currentSkillId;


    if (! store) {
        store = createStore(rootReducer, initialState);
    }
    return store;
}

export default initializeStore;