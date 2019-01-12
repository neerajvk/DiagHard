import os
import logging
from logging.config import fileConfig


class Config(object):
    DEBUG = False
    CSRF_ENABLED = True
    BASE_URL = 'http://localhost:8080/'
    DBNAME = 'dhdb'
    DBHOST = 'localhost'
    DBPORT = 27017
    SESSION_EXPIRES_IN = (3600 - 60)# seconds


class LocalhostConfig(Config):
    DEBUG = True
    SESSION_EXPIRES_IN = 60*45

#
# class DevelopmentConfig(Config):
#     DEBUG = True
#
#
class BetaConfig(Config):
    DEBUG = False


class ProductionConfig(Config):
    DEBUG = False


def configure_app(app):

    fileConfig('logging_config.ini')

    logging.debug("---- Configuring app variables ----")
    logging.debug("System variables:", os.environ)
    for k, v in os.environ.items():
        logging.debug("%s : %s ", k, str(v))

    app.config.from_object('config.LocalhostConfig')

    # if os.getenv('SERVER_SOFTWARE', '').startswith('Google App Engine/'):
    #     # we are on google app engine server.
    #     if 'overlap-beta-' in os.getenv('DEFAULT_VERSION_HOSTNAME', ''):
    #         logging.debug("############### GAE BETA INSTANCE ####################")
    #         app.config.from_object('config.BetaConfig')  # for now
    #     elif 'overlap-prod-' in os.getenv('SERVER_NAME', ''):
    #         logging.debug("############### GAE PROD INSTANCE ####################")
    #         app.config.from_object('config.ProductionConfig')
    #     else:
    #         logging.debug("############### GAE DEV INSTANCE ####################")
    #         app.config.from_object('config.DevelopmentConfig')
    # else:
    #     # probably localhost, lets configure as dev config
    #     logging.debug("############### LOCALHOST INSTANCE ####################")
    #     app.config.from_object('config.LocalhostConfig')

    if app.config['DEBUG']:
        app.debug = True
