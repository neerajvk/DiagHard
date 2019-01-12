var t = {
    YES_NO: "yesNo",
    START_NODE: "startNode",
    END_NODE: "endNode",
    SIMPLE_REST_CALL: "simpleRestCall",

    properties: {
        "yesNo" : { typeLabel: "Yes/No", weight: 60, faveColor: '#000066', faveShape: 'cutrectangle'   },
        "simpleRestCall" : { typeLabel: "Yes/No", weight: 60, faveColor: '#ff3300', faveShape: 'roundrectangle'   },
        "startNode" : { typeLabel: "Start", weight: 1000, faveColor: '#009900', faveShape: 'roundrectangle'   },
        "endNode" : { typeLabel: "Stop", weight: 1, faveColor: '#666666', faveShape: 'roundrectangle'   }
    }
};

module.exports.t = t;