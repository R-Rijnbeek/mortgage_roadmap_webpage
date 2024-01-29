# =============== IMPORTS ==============

from flask import render_template, jsonify, abort, request

from basic_decorators import argument_check
"""
from app.utils import ( 
                        process_basic_PostRequest, 
                        process_variacional_PostRequest,
                        process_graphicUpdate_PostRequest,
                        process_datatable_PostRequest
                    )
"""

from app.shared import LOG

from . import web

# =============== DEFINE ENTRYPOINTS ==============

@web.route("/", methods=["GET"])
@argument_check()
def get_webpage():
    try:
        return render_template("html/webpage.html"), 200
    except Exception as exc:
        LOG.error(f"ERROR: {exc}")
        abort(500)

# =============== EXECUTE TEST CODE ===============

if __name__ == "__main__":
    pass