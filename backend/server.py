from flask import Flask
from flask import render_template, url_for, jsonify, request
from flask_cors import CORS
from database_controller import client
from controllers.UserController import UserController
app = Flask(__name__, template_folder = '../frontend', static_folder = '../frontend/css')
CORS(app)

@app.route('/')
@app.route('/home')
def home_page():
    ##Render template handles requests to direct them to a html file
    print(client.query("SELECT * FROM users"))
    return render_template('index.html')
@app.route('/api/users', methods = ['POST'])
def register_user():
    try:
        user_controller = UserController()
        data = request.get_json()
        if not all(key in data for key in ['email', 'password', 'name', 'LastName', 'PhoneNumber', 'Address']):
            return jsonify({"error": "Faltan parámetros en la solicitud"}), 400
        user_controller.createUser(data['email'], data['password'], data['name'], data['LastName'], data['PhoneNumber'], data['Address'])

        return jsonify({"message": "Usuario creado exitosamente", 
                   "email": data['email']}), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400  
    
    except Exception as e:
        return jsonify({"error": "Error interno del servidor"}), 500
@app.route('/api/users/<email>', methods = ['GET', 'DELETE'])
def login(email):
    user_controller = UserController()
    if request.method == 'GET':   
        user=user_controller.getUser_byemail(email)
        if(user):
            return jsonify(user)
        else:
            return ({"message": "Usuario no encontrado"}), 404
    elif request.method == 'DELETE':
        try:
            user_controller.deleteUser(email)
            return jsonify({"message": "Usuario eliminado exitosamente"}), 200
        except ValueError as e:
            return jsonify({"error": str(e)}), 400




if __name__=='__main__':
    app.run(host='0.0.0.0', debug=True)