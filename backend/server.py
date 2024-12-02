from flask import Flask
from flask import render_template, url_for, jsonify, request
from flask_cors import CORS
from database_controller import client
from controllers.UserController import UserController
from blueprints.user_info import users_bp
app = Flask(__name__, template_folder = '../frontend', static_folder = '../frontend/css')
@app.route('/')
@app.route('/home')

def home_page():
    ##Render template handles requests to direct them to a html file
    print(client.query("SELECT * FROM users"))
    return render_template('index.html')
app.register_blueprint(users_bp)



@app.route('/api/users/<email>', methods = ['GET'])
def login():
    user_controller = UserController()
    user=user_controller.getUser_byemail(email)
    return jsonify(user)
    
def user_handler():
if __name__=='__main__':
    app.run(host='0.0.0.0', debug=True)