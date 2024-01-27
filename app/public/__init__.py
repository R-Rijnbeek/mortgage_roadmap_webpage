# =============== IMPORTS ==============

from flask import Blueprint

# =============== DEFINE BLUEPRINTS ==============

web = Blueprint('web', __name__, template_folder = 'templates')

from . import routes