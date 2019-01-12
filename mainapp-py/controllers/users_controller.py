from flask import Blueprint, render_template, abort, request, redirect
from flask_login import current_user, login_user, logout_user, login_required
import logging
import pendulum
from urllib import parse

from dao.aws import get_access_code, get_profile, get_vendors, get_vendor_skills
from dao.db import save_latest_profile, load_local_skills
import constants.aws as aws
import app

blueprint = Blueprint('users_controller', __name__, url_prefix='/users')


@blueprint.route('/')
def users_index():
    abort(404)


@blueprint.route('/login')
def users_login():
    login_url_params = {
        'client_id': aws.CLIENT_ID,
        'scope': aws.SCOPE,
        'response_type': 'code',
        'redirect_uri': app.app.config['BASE_URL'] + aws.REDIRECT_SUFFIX
    }
    aws_login_url = aws.OAUTH_URL + '?' + parse.urlencode(login_url_params)
    return redirect(aws_login_url)

@blueprint.route('/logout')
@login_required
def users_logout():
    logout_user()
    return redirect('/')


@blueprint.route('/processlogin')
def users_process_login():
    logging.debug("Users login called")
    logging.debug("Current user=%s", str(current_user))

    logging.debug("url=%s", request.url)

    #todo what to do in case of error?

    parseResult = parse.urlparse(request.url)
    logging.debug("parseResult=%s", parseResult)

    qs_map = parse.parse_qs(parseResult.query)
    logging.debug("querystring=%s", qs_map)

    code = qs_map['code']
    logging.debug("code=%s", code)

    access_params = get_access_code(code)
    if access_params:
        logging.debug("Access params=%s", access_params)

        profile_map = get_profile(access_params['access_token'])
        logging.debug("profile=%s", profile_map)

        new_user, user = save_latest_profile(access_params, profile_map)
        login_user(user)

        return redirect('/users/vendor')

    else:
        logging.info("Invalid access parameters.. ")
        logout_user()
        return redirect('/')


@blueprint.route('/vendor', methods=['GET'])
@login_required
def users_vendor():

    active_id = request.args.get('id', None)
    vendors_json = get_vendors(current_user.access_token)
    vendors = vendors_json['vendors']

    logging.debug("Vendors=%s", vendors)

    # if no vendor was selected, make the first one the default to be rendered
    if not active_id:
        if len(vendors) > 0:
            active_id = vendors[0]['id']

    tz_local = pendulum.timezone('America/New_York')

    skills = []
    if active_id:
        vendor_skills = get_vendor_skills(current_user.access_token, active_id)
        logging.debug("Skills=%s", vendor_skills)
        if vendor_skills:
            for s in vendor_skills['skills']:
                last_updated = pendulum.parse(s['lastUpdated'])
                last_updated = tz_local.convert(last_updated)
                last_updated = last_updated.to_datetime_string()
                skill_ui = {
                    'id': s['skillId'],
                    'name': s['nameByLocale']['en-US'],
                    'last_updated': last_updated,
                }
                skills.append(skill_ui)

    # load up skills from our database
    local_db_skills = load_local_skills(current_user)
    local_skills = []
    for s in local_db_skills:
        last_updated = pendulum.from_timestamp(s.last_updated)
        last_updated = tz_local.convert(last_updated)
        last_updated = last_updated.to_datetime_string()
        local_skills.append({
            'name': s.name,
            'last_updated': last_updated,
            'id': str(s.id)
        })

    model = {
        'vendors': vendors,
        'active': active_id,
        'skills': skills,
        'local_skills': local_skills
    }

    return render_template('users/vendor.html', model=model)
