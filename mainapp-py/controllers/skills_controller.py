from flask import Blueprint, render_template, abort, request, redirect, jsonify
from flask_login import current_user, login_required
import logging
import pendulum

from dao.aws import get_vendors
from dao.db import save_skill, load_skill_by_id

blueprint = Blueprint('skills_controller', __name__, url_prefix='/skills')


@blueprint.route('/create')
@login_required
def skills_create():

    vendor_id = request.args.get('vendorId', None)
    if not vendor_id:
        return abort(500)

    valid_vendor_id = False
    selected_vendor = None

    vendors = get_vendors(current_user.access_token)
    if vendors and vendors['vendors']:
        for vendor in vendors['vendors']:
            logging.debug("Checking vendor id=%s", vendor['id'])
            if vendor['id'] == vendor_id:
                valid_vendor_id = True
                selected_vendor = vendor

    if not valid_vendor_id:
        logging.error("Vendor ID does not belong to logged in user...")
        return abort(404)

    logging.debug("Create skill for user=%s vendorId=%s", current_user.email_address, vendor_id)

    model = { 'vendor': selected_vendor}
    return render_template('skills/create.html', model=model)


@blueprint.route('/edit')
@login_required
def skills_edit():

    local_skill_id = request.args.get('skillId', None)
    if not local_skill_id:
        return abort(404)
    model = {}
    return render_template('skills/edit.html', model=model)


@blueprint.route('/load/<local_skill_id>', methods=['GET'])
@login_required
def skills_load(local_skill_id=None):
    if not local_skill_id:
        return abort(404)

    local_skill = load_skill_by_id(current_user, local_skill_id)

    ret = None
    if local_skill:
        ret = {
            'id': local_skill_id,
            'skill_json': local_skill.skill_json,
            'name': local_skill.name
        }

    return jsonify(params=ret)


@blueprint.route('/save', methods=['POST'])
@login_required
def skills_save():
    logging.debug('saving skill')
    content = request.get_json()
    logging.debug("content=%s", content)

    if not 'skillString' in content:
        return abort(500)
    if not 'skillName' in content:
        return abort(500)

    skill_id = None
    skill_json = content['skillString']
    skill_name = content['skillName']
    if 'skillId' in content:
        skill_id = content['skillId']

    logging.debug("skillId=%s", skill_id)
    logging.debug("skillJSON=%s", skill_json)
    logging.debug("skillName=%s", skill_name)

    saved_skill = save_skill(current_user, skill_name, skill_json, skill_id)

    return jsonify(params={'skillId': str(saved_skill.id)})

