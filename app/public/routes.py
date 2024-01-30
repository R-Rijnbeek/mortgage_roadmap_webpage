# =============== IMPORTS ==============

from flask import render_template, jsonify, abort, current_app, request
import json

from basic_decorators import argument_check

from app.shared import LOG

from app.utils import returnsJS

from . import web, mortgage_CalculationProcess

# =============== DEFINE ENTRYPOINTS ==============

@web.route("/", methods=["GET"])
@argument_check()
def get_webpage():
    try:
        return render_template("html/webpage.html"), 200
    except Exception as exc:
        LOG.error(f"ERROR: {exc}")
        abort(500)

@web.route("/mortgage_calculation", methods=["POST"])
@argument_check()
def process():
    try:
        form = request.form

        dept = float(form.get("dept",type=float))
        cuotas = int(form.get("cuotas", type=int))
        apr = float(form.get("APR", type=float))
        mortgage_type = str(form.get("mortgage_type", type=str))

        results = mortgage_CalculationProcess(dept, cuotas, apr, mortgage_type)

        return jsonify(results), 200
    except Exception as exc:
        LOG.error(f"ERROR: {exc}")
        abort(400)

@web.route("/js/main.js", methods=["GET"])
@returnsJS
def get_js():
    FRONT_MIN_CUOTAS = current_app.config["FRONT_MIN_CUOTAS"]
    FRONT_MAX_CUOTAS = current_app.config["FRONT_MAX_CUOTAS"]
    CUOTA_OPTIONS = json.dumps({str(i): i for i in  range(FRONT_MIN_CUOTAS,FRONT_MAX_CUOTAS)})
    FRONT_SELECTED_CUOTA = current_app.config["FRONT_SELECTED_CUOTA"]
    FRONT_MORTGAGE_TYPES = current_app.config["FRONT_MORTGATE_TYPES"]
    MORTGAGE_OPTIONS = json.dumps({str(i):FRONT_MORTGAGE_TYPES[i] for i in range(0, len(FRONT_MORTGAGE_TYPES))})
    FRONT_SELECTED_MORTGAGE = json.dumps(current_app.config["FRONT_SELECTED_MORTGAGE"])

    return render_template("/js/main.js", 
                           CUOTA_OPTIONS=CUOTA_OPTIONS, 
                           FRONT_SELECTED_CUOTA=FRONT_SELECTED_CUOTA, 
                           MORTGAGE_OPTIONS=MORTGAGE_OPTIONS, 
                           FRONT_SELECTED_MORTGAGE=FRONT_SELECTED_MORTGAGE
                           )


# =============== EXECUTE TEST CODE ===============

if __name__ == "__main__":
    pass