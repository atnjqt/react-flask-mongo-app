from flask import Flask, jsonify, request
from pymongo import MongoClient
import socket
socket.gethostbyname('localhost')
 
#client = MongoClient('mongo', 27017)
client = MongoClient('mongodb://localhost:27017/db')
db = client.db

app = Flask(__name__)

@app.route('/profile')
def my_profile():
    response_body = {
        "name": "Atn Jqt",
        "about" :"Hello! I'm a sysadmin that loves python and wants to learn more React!"
    }

    return response_body

@app.route('/username', methods=['GET','POST'])
def my_username():
    # GET a username from database
    if request.method == 'GET':
        un_val = request.args.get('username_value')
        #console.log(username_value)
        #return jsonify({ 'un': '{}'.format(username_value) })
        return un_val

    # POST a data to database
    if request.method == 'POST':
        body = request.json
        app.logger.info(body)    
        #un_val = request.args.get('username_value')
        # db.users.insert_one({
        db['users'].insert_one(body)
        app.logger.info(db.list_collection_names())
        return jsonify({'result':'post was successful!'})

@app.route('/database')
def getDatabaseUsers():
    if request.method == 'GET':
        items = []
        for item in db.users.find():
            # This does not give a very readable output
            items.append(item['username_value'])

        return jsonify({'output':items})
        #return response_body

@app.route('/database_drop')
def dropDatabase():
    if request.method == 'GET':
        db.users.drop()
        return 'dropped!'

@app.route('/test')
def test_app():
    response_body = {
        "value" : 'testing...'
     }
    return response_body

if __name__ == '__main__':
    app.debug = True
    app.run()