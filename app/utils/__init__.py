from functools import wraps

from flask import make_response

def returnsJS(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        resp = make_response(f(*args, **kwargs),200)
        resp.headers['Content-Type'] = 'application/javascript'
        return resp
    return decorated_function