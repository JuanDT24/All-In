from flask import Blueprint, request, jsonify
from controllers.PayMethodController import PayMethodController

pay_method_bp = Blueprint('pay_methods', __name__, url_prefix = "/api/pay_methods")

@pay_method_bp.route("/", methods = ["POST"])
def create_pay_method():
    pay_method_controller = PayMethodController()
    try:
        data = request.get_json()
        if not all(key in data for key in ['FullName', 'ID', 'CardNumber', 'CVC', 'ExpirationDate', 'IdUser']):
            return jsonify({"error": "Faltan parámetros en la solicitud"}), 400
        pay_method_controller.createPayMethod(data['FullName'], data['ID'], data['CardNumber'], data['Bank'], data['CVC'], data['ExpirationDate'], data['IdUser'])
        return jsonify({"message": "Método de pago añadido correctamente"}), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Error interno del servidor"}, {"message": str(e)}), 500

@pay_method_bp.route("/<id>", methods = ["GET", "DELETE"])
def search_pay_method(id):
    pay_method_controller = PayMethodController()
    if request.method == 'GET':
        pay_method = pay_method_controller.getPayMethod_byid(id)
        if(pay_method):
            return jsonify(pay_method.__dict__)
        else:
            return jsonify({"message": "Método de pago no encontrado"}), 404
    elif request.method == 'DELETE':
        try:
            pay_method_controller.deletePayMethod(id)
            return jsonify({"message": "Método de pago eliminado exitosamente"}), 200
        except ValueError as e:
            return jsonify({"error": str(e)}), 400
        except Exception as e:
            return jsonify({"error": "Error interno del servidor"}), 500
    
@pay_method_bp.route("/user/<email>", methods = ["GET"])
def search_pay_methods_byemail(email):
    pay_method_controller = PayMethodController()
    pay_methods = pay_method_controller.getPayMethods_byemail(email)
    if(pay_methods):
        return jsonify(pay_methods)
    else:
        return jsonify({"message": "Métodos de pago no encontrados"}), 404