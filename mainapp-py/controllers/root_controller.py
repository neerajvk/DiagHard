from flask import Blueprint, render_template

blueprint = Blueprint('root_controller', __name__, url_prefix='/')


@blueprint.route('/')
def root_index():
    return render_template('root/index.html')
