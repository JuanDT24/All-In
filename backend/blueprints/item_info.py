from flask import Blueprint, request, jsonify
from controllers.itemController import itemController
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
@items_bp.route("/<int:id>", methods = ["GET", "DELETE"])
def item_handler(id):
    item_controller = itemController()
    if request.method == 'GET':   
        item=item_controller.getItem(id)
        if(item):
            print(item)
            del item[0]['image']
            return jsonify(item)
        else:
            return ({"message": "Usuario no encontrado"}), 404
    elif request.method == 'DELETE':
        try:
            item_controller.deleteUser(id)
            return jsonify({"message": "Item eliminado exitosamente"}), 200
        except ValueError as e:
            return jsonify({"error": str(e)}), 400
@items_bp.route("/dateinfo/<int:id>")
def get_dateInfo(id):
    item_controller = itemController()
    info = item_controller.getDateInfo(id)
    if(info):
        return jsonify(info)
    else:
        return ({"message": f"Couldn't find date information for item with id: {id}"}), 404
@items_bp.route("/priceinfo/<int:id>")
def get_priceInfo(id):
    item_controller = itemController()
    info = item_controller.getPriceInfo(id)
    if(info):
        return jsonify(info)
    else:
        return jsonify({"message":f"Couldn't find price information for item with id: {id}"}), 404
    
    