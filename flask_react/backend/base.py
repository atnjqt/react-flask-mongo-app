from flask import Flask

api = Flask(__name__)

@api.route('/profile')
def my_profile():
    response_body = {
        "name": "Atn Jqt",
        "about" :"Hello! I'm a sysadmin that loves python and wants to learn more javascript for compassion app!"
    }

    return response_body