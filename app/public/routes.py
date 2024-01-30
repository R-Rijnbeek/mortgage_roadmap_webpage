# =============== IMPORTS ==============

from flask import render_template, jsonify, abort, request

from basic_decorators import argument_check
from mortgage_roadmap import Mortgage_Constant_ChargeOff, Mortgage_Constant_Pay

from app.shared import LOG

from . import web

# =============== DEFINE ENTRYPOINTS ==============

def mortgage_CalculationProcess(DEPT, CUOTAS, APR, MORTGAGE_TYPE):

    if MORTGAGE_TYPE == "contant Pay Mortgage" : 
        mortgage_instance = Mortgage_Constant_Pay(DEPT, CUOTAS, APR)
    elif MORTGAGE_TYPE == "constant Chargoff Mortgage" :
        mortgage_instance = Mortgage_Constant_ChargeOff(DEPT, CUOTAS, APR)
    else:
        raise Exception("Wrong Mortgage type")
    
    return mortgage_instance.inform


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

# =============== EXECUTE TEST CODE ===============

if __name__ == "__main__":
    pass