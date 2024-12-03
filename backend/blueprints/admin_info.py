from flask import Blueprint, request, jsonify
from controllers.AdminController import adminController

admin_bp = Blueprint("admin", __name__, url_prefix="/api/admin")

@admin_bp.route("/<id>", methods = ["POST"])
def update_price(id):
    admin_controller = adminController()
    try:
        admin_controller.updateItemPrice(id)
        return jsonify({"message" : "Precio actualizado correctamente"}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Error interno del servidor"}, {"message": str(e)}), 500