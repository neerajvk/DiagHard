import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import initializeStore from './store/index';
import SkillNode from './store/SkillNode';
import SkillEdge from './store/SkillEdge';

var axios = require('axios');
var url_parse = require('url-parse');
var query_string = require('query-string');

import EditSkillCanvas from './EditSkillCanvas';
import SkillGraph from "./store/SkillGraph";

var parsed_url = url_parse(window.location.href);
var parsed_query = query_string.parse(parsed_url.query);

console.log('parsed_url=' + parsed_url);
console.log('pathname=' + parsed_url.pathname);

var skillId = undefined;

if (parsed_url.pathname === '/skills/create'
    && parsed_url.query
    && parsed_query.vendorId){

    var initialSkillGraph = new SkillGraph(undefined);
    var startNode = new SkillNode('startNode', 'Start!');
    var endNode = new SkillNode('endNode', 'Done!');
    var initialEdge = new SkillEdge(startNode, endNode);

    initialSkillGraph.addNode(startNode);
    initialSkillGraph.addNode(endNode);
    initialSkillGraph.addEdge(initialEdge);

    var store = initializeStore(undefined, initialSkillGraph, undefined, undefined, undefined, false, undefined);

    ReactDOM.render(
        <Provider store={store}>
            <EditSkillCanvas vendorId={parsed_query.vendorId} skillId={skillId} />
        </Provider>,
        document.getElementById('clientside')
    );
}
else if (parsed_url.pathname === '/skills/edit'
        && parsed_url.query
        && parsed_query.skillId){
    ReactDOM.render(
        <h3>to load skill</h3>,
        document.getElementById('clientside')
    );

    axios.get('/skills/load/' + parsed_query.skillId)
        .then(function (response) {
            console.log(response);

            var skill_json = response.data.params.skill_json;
            var skill_name = response.data.params.name;
            console.log(skill_json);
            var initialSkillGraph = new SkillGraph(skill_json);
            var store = initializeStore(undefined, initialSkillGraph, undefined, undefined, skill_name, false, parsed_query.skillId);

            ReactDOM.render(
                <Provider store={store}>
                    <EditSkillCanvas vendorId={undefined} skillId={parsed_query.skillId} />
                </Provider>,
                document.getElementById('clientside')
            );
        })
        .catch(function (error) {
            console.log(error);
        });
}
else{
    ReactDOM.render(
        <h3 className="error">Invalid parameters for this page!!!</h3>,
        document.getElementById('clientside')
    );
}

// const renderPartials = function () {
//     // console.log('parsed_query=' + parsed_query);
//
//     // else if (parsed_url.pathname.)
//     else{
//         return(
//         )
//     }
// };
//
