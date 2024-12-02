from flask import Flask
from flask import render_template, url_for, jsonify, request
from flask_cors import CORS
from database_controller import client
from controllers.UserController import UserController
app = Flask(__name__, template_folder = '../frontend', static_folder = '../frontend/css')
@app.route('/')
@app.route('/home')

def home_page():
    ##Render template handles requests to direct them to a html file
    print(client.query("SELECT * FROM users"))
    return render_template('index.html')

@app.route('/api/users', methods = ['POST'])
def create_user():
    user_controller = UserController()
    data = request.get_json()
    if not all(key in data for key in ['email', 'password', 'name', 'LastName', 'PhoneNumber', 'Address']):
        return jsonify({"error": "Faltan parámetros en la solicitud"}), 400
    user_controller.createUser(data['email'], data['password'], data['name'], data['LastName'], data['PhoneNumber'], data['Address'])

@app.route('/api/users/<email>', methods = ['GET'])
def login():
    user_controller = UserController()
    user=user_controller.getUser_byemail(email)
    return jsonify(user)
    
def user_handler():
if __name__=='__main__':
    app.run(host='0.0.0.0', debug=True)