from flask import Flask
from flask import render_template, url_for, jsonify
from database_controller import DatabaseController

app = Flask(__name__, template_folder = '../frontend', static_folder = '../frontend/css')
@app.route('/')
@app.route('/home')
def home_page():
    ##Render template handles requests to direct them to a html file
    client = DatabaseController()
    client.connect()
    print(client.query("SELECT * FROM users"))
    return render_template('index.html')
if __name__=='__main__':
    app.run(host='0.0.0.0', debug=True)