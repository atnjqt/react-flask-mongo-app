from flask import Flask, jsonify, request
from pymongo import MongoClient
import socket
socket.gethostbyname('localhost')
 
#client = MongoClient('mongo', 27017)
client = MongoClient('mongodb://localhost:27017/db')
db = client.db # mongo database name is db

app = Flask(__name__)

@app.route('/profile')
def my_profile():
    response_body = {
        "name":"Atn Jqt",
        "about":"Hello! I'm a sysadmin that loves python and wants to learn more React!"
    }
    return response_body

@app.route('/username', methods=['GET','POST'])
def username_func():
    # GET a username from database - this was original example to demonstrate back and forth
    if request.method == 'GET':
        username_value = request.args.get('username_value')
        #return jsonify({'db_value':db.users.find("username_value" : username_value )})
        #console.log(username_value)
        #return jsonify({ 'un': '{}'.format(username_value) })
        #return username_value

    # POST a username to database
    if request.method == 'POST':
        body = request.json
        #app.logger.info(body['response']['name'])
        #db['users'].insert_one(body)
        # trying to just update based on name if already in collection
        key = {'name':body['response']['name']}
        db['users'].replace_one(key, body, upsert=True); 
        return jsonify({'result':'HTTP POST was successful!'})

@app.route('/database')
def getDatabaseUsers():
    if request.method == 'GET':
        items = []
        cursor = db.users.find({})
        for document in cursor: 
            items.append(document['response'])
            
        return jsonify(items)
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