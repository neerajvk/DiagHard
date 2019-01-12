import requests
import json
import logging

import app
from constants import aws


def get_access_code(auth_code):

    auth_code_params = {
        'grant_type': 'authorization_code',
        'code': auth_code,
        'client_id': aws.CLIENT_ID,
        'client_secret': aws.CLIENT_SECRET,
        'redirect_uri': app.app.config['BASE_URL'] + aws.REDIRECT_SUFFIX
    }

    headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }

    response = requests.post(aws.ACCESS_TOKEN_URL, data=auth_code_params, headers=headers)
    logging.debug("response status code=%d", response.status_code)

    if response.status_code != 200:
        logging.error("Invalid response code while getting access token. %d", response.status_code)
        logging.error("Response text=%s", response.text)
        return None

    ret = json.loads(response.text)
    return ret


def get_profile(access_token):
    response = requests.get(aws.PROFILE_URL, headers={'Authorization': 'Bearer ' + access_token})
    if response.status_code != 200:
        logging.error("Invalid response code while getting profile. %d", response.status_code)
        logging.error("Response text=%s", response.text)
        return None

    ret = json.loads(response.text)
    return ret

def get_vendors(access_token):
    response = requests.get(aws.VENDORS_URL, headers={'Authorization': access_token})
    if response.status_code != 200:
        logging.error("Invalid response code while getting vendors. %d", response.status_code)
        logging.error("Response text=%s", response.text)
        return None

    ret = json.loads(response.text)
    return ret


def get_vendor_skills(access_token, vendor_id):
    response = requests.get(aws.SKILLS_URL_PREFIX + vendor_id, headers={'Authorization': access_token})
    if response.status_code != 200:
        logging.error("Invalid response code while getting skills. %d", response.status_code)
        logging.error("Response text=%s", response.text)
        return None

    ret = json.loads(response.text)
    return ret

