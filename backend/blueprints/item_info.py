from flask import Blueprint, request, jsonify
from controllers.itemController import itemController
from werkzeug.utils import secure_filename
items_bp = Blueprint("items", __name__, url_prefix="/api/items")

@items_bp.route("/", methods = ["POST"])
def create_item():
    item_controller = itemController()
    try:
        if 'image' not in request.files:
            return jsonify({"error": "No image file provided"}), 400
        imagefile = request.files['image']
        if imagefile.filename == '':
            return jsonify({"error": "No se seleccionó ninguna imagen"}), 400
        image = item_controller.save_image(imagefile)
        item_data = request.form.to_dict()
        for key, value in item_data.items():
            print(f"{key}: {value}")
        item_controller.createItem(item_data["name"], item_data["description"], item_data["idseller"], item_data["current_price"], item_data["starting_price"], item_data["inmediate_purchase_price"], item_data["minimum_increase"], item_data["post_date"],item_data["start_date"],item_data["due_date"],item_data["idcategory"], image)
        return jsonify({"message" : "Item añadido correctamente"}), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400  
    except Exception as e:
        return jsonify({"error": "Error interno del servidor"}, {"message": str(e)}), 500
    