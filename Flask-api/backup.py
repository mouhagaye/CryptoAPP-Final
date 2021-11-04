from flask import Flask, request, jsonify, render_template
from requests.api import get
import requests

from flask_pymongo import PyMongo
from bson import ObjectId
import json
# Basic blask server to catch events
from flask_socketio import SocketIO



class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/todo_db"
mongodb_client = PyMongo(app)
db = mongodb_client.db
socketio = SocketIO(app)



class Depot:   
    def __init__(self, depot = False):   
         self._depot = depot   
      # using the getter method   
    def get_depot(self):   
        return self._depot   
      # using the setter method   
    def set_depot(self, a):   
        self._depot = a   
    
Deposit = Depot()   
    
#using the setter function  
    
# # using the getter function  
    
# print(Deposit.get_depot())  


@app.route("/")
def index():
    # db.todos.insert_one({'amount': "todo title", 'body': "todo body"})
    # return jsonify(messdepot="success")
    return render_template("index.html")

@app.route("/valider", methods = ['POST'])
def valider():
    if request.method == 'POST': 
        # print(request.form["depot"])
        Deposit.set_depot(True)
        return jsonify(depot="success")
    else :
        return jsonify(depot="fail")


@app.route("/depot", methods = ['GET','POST'])
def depot():
    # deposit = "pending"
    # if request.method == 'POST':     
    #     deposit = "success"
    #     print(request.form["depot"])

    print(Deposit.get_depot())    
    
    if request.method == 'GET': 
        deposit = Deposit.get_depot()   

        if deposit == True:
            Deposit.set_depot(False)
            requests.get("http://localhost:6000")
            return jsonify(message="complete")
        else:
            return jsonify(message="pending")
            
@socketio.on('message')
def handle_message(data):
      emit('message', json_data, broadcast=True, include_self=False)

@app.route("/")
def home():
    todos = db.todos.find()
    return json.dumps([todo for todo in todos], cls=JSONEncoder)

if __name__ == '__main__':
    socketio.run(app)


# <!-- <!DOCTYPE html>>
# <html>
#     <header>

#     </header>
#     <body>
#         <form action="{{ url_for('valider') }}" method="post">
#             <input type="submit" name="depot" value="success">
#         </form>
#         <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/3.1.0/socket.io.js"></script>

#             <script type="text/javascript" charset="utf-8">
#             var socket = io();
#             socket.on('connect', function() {
#                 socket.emit('my event', {data: 'I\'m connected!'});
#             });
#         </script>
#     </body>
    
# </html> -->