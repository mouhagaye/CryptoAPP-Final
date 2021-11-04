from flask import Flask, request, jsonify, render_template, url_for, redirect, session
from requests.api import get
import requests
import bcrypt
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
app.secret_key = "super secret key"
app.config["MONGO_URI"] = "mongodb://localhost:27017/todo_db"
mongodb_client = PyMongo(app)
db = mongodb_client.db
socketio = SocketIO(app)
records = db.register



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



@app.route("/", methods=['post', 'get'])
def index():
    message = ''
    if "numero" in session:
        return redirect(url_for("logged_in"))
    if request.method == "POST":
        user = request.form.get("fullname")
        numero = request.form.get("numero")
        
        password1 = request.form.get("password1")
        password2 = request.form.get("password2")
        
        user_found = records.find_one({"name": user})
        numero_found = records.find_one({"numero": numero})
        if user_found:
            message = 'There already is a user by that name'
            return render_template('index.html', message=message)
        if numero_found:
            message = 'This numero already exists in database'
            return render_template('index.html', message=message)
        if password1 != password2:
            message = 'Passwords should match!'
            return render_template('index.html', message=message)
        else:
            hashed = bcrypt.hashpw(password2.encode('utf-8'), bcrypt.gensalt())
            user_input = {'name': user, 'numero': numero, 'password': hashed, 'solde': 0, 'deposit': []}
            records.insert_one(user_input)
            
            user_data = records.find_one({"numero": numero})
            new_numero = user_data['numero']
   
            return render_template('logged_in.html', numero=new_numero)
    return render_template('index.html')


@app.route('/logged_in')
def logged_in():
    if "numero" in session:
        numero = session["numero"]
        compte = records.find_one({"numero": str(numero)})
        deposits = compte["deposit"]
        solde = compte["solde"]
        # deposits = session["deposit"]
        # print(deposits)
        return render_template('logged_in.html', numero=numero, deposits= deposits, solde=solde)
    else:
        return redirect(url_for("login"))

@app.route("/login", methods=["POST", "GET"])
def login():
    message = 'Please login to your account'
    if "numero" in session:
        return redirect(url_for("logged_in"))

    if request.method == "POST":
        numero = request.form.get("numero")
        password = request.form.get("password")

       
        numero_found = records.find_one({"numero": numero})
        if numero_found:
            numero_val = numero_found['numero']
            passwordcheck = numero_found['password']
            
            if bcrypt.checkpw(password.encode('utf-8'), passwordcheck):
                session["numero"] = numero_val
                return redirect(url_for('logged_in'))
            else:
                if "numero" in session:
                    return redirect(url_for("logged_in"))
                message = 'Wrong password'
                return render_template('login.html', message=message)
        else:
            message = 'numero not found'
            return render_template('login.html', message=message)
    return render_template('login.html', message=message)

@app.route("/logout", methods=["POST", "GET"])
def logout():
    if "numero" in session:
        session.pop("numero", None)
        return render_template("signout.html")
    else:
        return render_template('index.html')

@app.route("/confirmer")
def confirmer():
    # db.todos.insert_one({'amount': "todo title", 'body': "todo body"})
    # return jsonify(messdepot="success")
    return render_template("confirmer.html")

@app.route("/valider", methods = ['GET'])
def valider():
    if request.method == 'GET': 
        # print(request.form["depot"])
    

        numero = session["numero"]
        compte = records.find_one({"numero": str(numero)})
        deposits = compte["deposit"]
        depot = deposits[0]
        solde = float(compte["solde"])
        solde = solde - float(depot["montant"])
        deposits = []
        records.find_one_and_update({"numero": str(numero)}, { '$set': { "solde" : str(solde) } })
        records.find_one_and_update({"numero": str(numero)}, { '$set': { "deposit" : deposits } })


        Deposit.set_depot(True)
        return jsonify(depot="success")

    else :

        return jsonify(depot="fail")



@app.route("/getdepot", methods = ['POST'])
def get_depot(): 
    if request.method == 'POST':
        Deposit.set_depot(False)

        data = request.get_json(force=True)
        
        transaction_id = data["transaction_id"]
        numero = data['numero']
        montant = data['montant']
        status = data['status']
        print("----------------:",numero)
        #{"numero": 781298712,"montant": 5000, "status": "pending"}
        # if numero == session["numero"]:
        compte = records.find_one({"numero": str(numero)})
        print("----------------:",compte)

        deposits = compte["deposit"]

        already = False
        for depot in deposits:
            if depot["transaction_id"] != transaction_id :
                continue
            else:
                already = True
        if not already:

            deposits.append({"transaction_id" : transaction_id ,"montant": montant, "status":status})
            records.find_one_and_update({"numero": str(numero)}, { '$set': { "deposit" : deposits } })
        # deposit = {"montant": montant, "status":status}
        # compte.deposit.append(deposit)
        # compte.save()
        # print(compte)
        return jsonify(message="success")


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
            return "complete"
        else:
            return "pending"


# @app.route("/")
# def home():
#     todos = db.todos.find()
#     return json.dumps([todo for todo in todos], cls=JSONEncoder)

if __name__ == '__main__':
    socketio.run(app)


