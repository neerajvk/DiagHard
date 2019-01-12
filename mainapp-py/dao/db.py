import logging
import pendulum

import models.user as user
import models.skill as skill
import app


def load_user_by_id(user_id):
    logging.debug("Loading user for user_id=%s", user_id)
    matched_users = user.User.objects(email_address=user_id)
    if matched_users and len(matched_users) > 0: #and matched_users[0].is_active():
        return matched_users[0]
    else:
        return None


def save_latest_profile(access_params, profile_map):
    logging.debug("Saving latest profile for email=%s", profile_map['email'])
    matched_users = user.User.objects(email_address=profile_map['email'])
    logging.debug("Found %d matched users", len(matched_users))

    new_user = False
    user_instance = None

    if len(matched_users) > 1:
        logging.error("ERROR! We found more than one matching user for email=%s", profile_map['email'])
        raise Exception('More than one user found for email' + profile_map['email'])

    if len(matched_users) == 0:
        logging.info("NEW USER!")
        new_user = True
        user_instance = user.User()
        user_instance.external_account_type = user.ACCOUNT_TYPE['AWS']
        user_instance.external_account_id = profile_map['user_id']
    else:
        user_instance = matched_users[0]

    user_instance.access_token = access_params['access_token']
    user_instance.email_address = profile_map['email']
    user_instance.refresh_token = access_params['refresh_token']
    user_instance.profile_name = profile_map['name']

    current_epoch = pendulum.now().int_timestamp
    expiry_epoch = current_epoch + app.app.config['SESSION_EXPIRES_IN']#int(access_params['expires_in'])
    user_instance.token_expires_epoch = expiry_epoch

    logging.debug("current_epoch=%d, expiry_epoch=%d", current_epoch, expiry_epoch)

    user_instance.save()

    return new_user, user_instance


def save_skill(user, skill_name, skill_json, skill_id):
    logging.debug('Saving skill for id=%sq', skill_id)

    current_epoch = pendulum.now().int_timestamp

    skill_obj = None
    if not skill_id:
        logging.info("Creating new skill")
        skill_obj = skill.Skill()
        skill_obj.user = user.id
        skill_obj.created_on = current_epoch
    else:
        matched_skills = skill.Skill.objects(id=skill_id)
        logging.debug("Found %d matched skills", len(matched_skills))
        if len(matched_skills) != 1:
            raise Exception("More than one skill entries found for id=" + skill_id)

        skill_obj = matched_skills[0]

    skill_obj.name = skill_name
    skill_obj.skill_json = skill_json
    skill_obj.last_updated = current_epoch
    skill_obj.save()
    return skill_obj


def load_local_skills(user):
    matched_skills = skill.Skill.objects(user=user.id)
    logging.debug('Loaded %d local skills', len(matched_skills))
    return matched_skills


def load_skill_by_id(user, id):
    matched_skills = skill.Skill.objects(user=user.id, id=id)
    if len(matched_skills) > 1 :
        logging.error('Inconsistent DB results. Found more than one skill for user=%s, skill id=%s', user.id, id)
        return None
    if len(matched_skills) == 0:
        logging.info('Did not find any skills for user=%s, skill id=%s', user.id, id)
        return None

    return matched_skills[0]

