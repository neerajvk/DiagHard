from flask import Flask, render_template, request, session
from flask_login import LoginManager
import mongoengine
import logging
import config
from controllers.root_controller import blueprint as root_controller
from controllers.users_controller import blueprint as users_controller
from controllers.skills_controller import blueprint as skills_controller
from controllers.execute_controller import blueprint as execute_controller

from dao.db import load_user_by_id

app = Flask(__name__)

app.secret_key = 'cbs2015'
config.configure_app(app)

mongoengine.connect(app.config['DBNAME'], host=app.config['DBHOST'], port=app.config['DBPORT'])

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "root_controller.root_index"


@login_manager.user_loader
def load_user(user_id):
    return load_user_by_id(user_id)


@app.before_request
def log_request():

    if app.config["DEBUG"]:
        logging.debug("----------- headers ------------")
        logging.debug("\n%s", str(request.headers))
        logging.debug("----------- session ------------")
        logging.debug("\n%s", str(session))
        for k in session:
            logging.debug("%s: %s", k , str(session[k]))
        logging.debug("--------------------------------")


@app.errorhandler(404)
def not_found(error):
    logging.error("404 error=%s", str(error))
    return render_template('404.html'), 404


@app.errorhandler(500)
def internal_server_error(error):
    logging.error('Server Error: %s', str(error))
    return render_template('500.html'), 500


app.register_blueprint(root_controller)
app.register_blueprint(users_controller)
app.register_blueprint(skills_controller)
app.register_blueprint(execute_controller)

