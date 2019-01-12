from flask import Blueprint, render_template, abort, request, redirect, jsonify
from flask_login import current_user, login_required
import logging
import json
import pprint

from dao.aws import get_vendors
from dao.db import save_skill, load_skill_by_id

blueprint = Blueprint('execute_controller', __name__, url_prefix='/execute')


@blueprint.route('/myid', methods=['POST'])
def myid():
    logging.debug('return myid response')

    content = request.get_json()
    logging.debug("content=%s", json.dumps(content, indent=4, sort_keys=True))

    response = {
        "version": "1.0",
        "sessionAttributes": {
            "supportedHoriscopePeriods": {
                "daily": True,
                "weekly": False,
                "monthly": False
            }
        },
        "response": {
            "outputSpeech": {
                "type": "PlainText",
                "text": "Today will provide you a new learning opportunity.  Stick with it and the possibilities will be endless. Can I help you with anything else?"
            },
            "card": {
                "type": "Simple",
                "title": "Horoscope",
                "content": "Today will provide you a new learning opportunity.  Stick with it and the possibilities will be endless."
            },
            "reprompt": {
                "outputSpeech": {
                    "type": "PlainText",
                    "text": "Can I help you with anything else?"
                }
            },
            "shouldEndSession": False
        }
    }



    return jsonify(response)

