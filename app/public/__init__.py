# =============== IMPORTS ==============

from flask import Blueprint
from mortgage_roadmap import Mortgage_Constant_ChargeOff, Mortgage_Constant_Pay

# =============== DEFINE BLUEPRINTS ==============

web = Blueprint('web', __name__, template_folder = 'templates')

def mortgage_CalculationProcess(DEPT, CUOTAS, APR, MORTGAGE_TYPE):

    if MORTGAGE_TYPE == "contant Pay Mortgage" : 
        mortgage_instance = Mortgage_Constant_Pay(DEPT, CUOTAS, APR)
    elif MORTGAGE_TYPE == "constant Chargoff Mortgage" :
        mortgage_instance = Mortgage_Constant_ChargeOff(DEPT, CUOTAS, APR)
    else:
        raise Exception("Wrong Mortgage type")
    
    return mortgage_instance.inform

from . import routes