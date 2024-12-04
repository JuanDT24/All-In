from flask import Blueprint, request, jsonify
from controllers.UserController import UserController

users_bp = Blueprint('users', __name__, url_prefix = "/api/users")

@users_bp.route("/", methods = ["POST"])
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

@users_bp.route("/<email>", methods = ["GET", "DELETE"])
def search_user(email):
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
        except Exception as e:
            return jsonify({"error": "Error interno del servidor"}), 500


@users_bp.route("/<email>", methods = ["PUT"])
def edit_user(email):
    user_controller = UserController()
    try:
        data = request.get_json()
        user_controller.editUser(email, data)
        return jsonify({"message": "Usuario editado exitosamente"}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Error interno del servidor"}), 500
@users_bp.route("/get_auctions_user/<string:email>")
def get_auctions(email):
    user_controller = UserController()
    auctions = user_controller.get_auctions_user(email)
    if auctions:
        return jsonify(auctions)
    else:
        return jsonify({"message":f"Couldn't find auctions for this user"})
@users_bp.route("/get_purchases_user/<string:email>")
def get_purchases(email):
    user_controller = UserController()
    purchases = user_controller.get_purchases_user(email)
    if purchases:
        return jsonify(purchases)
    else:
        return jsonify({"message":f"Couldn't find purchases for this user"})

