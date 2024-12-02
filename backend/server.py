from flask import Flask
from flask import render_template, url_for, jsonify
from database_controller import client
import os
from dotenv import load_dotenv
app = Flask(__name__, template_folder = '../frontend', static_folder = '../frontend/css')
@app.route('/')
@app.route('/home')
def home_page():
    ##Render template handles requests to direct them to a html file
    print(client.query("Select * from users"))
    return render_template('index.html')
if __name__=='__main__':
    app.run(host='0.0.0.0', debug=True)
