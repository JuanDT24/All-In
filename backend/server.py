from flask import Flask
from flask import render_template, url_for, jsonify, request
from flask_cors import CORS
from database_controller import client
from controllers.UserController import UserController
from blueprints.user_info import users_bp
from blueprints.item_info import items_bp
app = Flask(__name__, template_folder = '../frontend', static_folder = '../frontend/css')
CORS(app)
UPLOAD_FOLDER = '.backend/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
@app.route('/')
@app.route('/home')
def home_page():
    ##Render template handles requests to direct them to a html file
    print(client.query("SELECT * FROM users"))
    return render_template('index.html')
app.register_blueprint(users_bp)
app.register_blueprint(items_bp)



if __name__=='__main__':
    app.run(host='0.0.0.0', debug=True)