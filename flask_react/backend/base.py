from flask import Flask, jsonify, request

api = Flask(__name__)

@api.route('/profile')
def my_profile():
    response_body = {
        "name": "Atn Jqt",
        "about" :"Hello! I'm a sysadmin that loves python and wants to learn more javascript for compassion app!"
    }

    return response_body

@api.route('/username', methods=['GET','POST'])
def my_username():
    username_value = request.args.get('username_value')
    #console.log(username_value)
    #return jsonify({ 'un': '{}'.format(username_value) })
    return username_value
@api.route('/test')
def test_api():
    response_body = {
        "value" : 'testing...'
     }
    return response_body