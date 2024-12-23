from flask import Blueprint, request, jsonify, send_file
from controllers.itemController import itemController
from io import BytesIO

items_bp = Blueprint("items", __name__, url_prefix="/api/items")

@items_bp.route("/", methods = ["POST"])
def create_item():
    item_controller = itemController()
    try:
        if 'image' not in request.files:
            return jsonify({"error": "No se encontró el archivo de imagen"}), 400
        imagefile = request.files['image']
        if imagefile.filename == '':
            return jsonify({"error": "No se seleccionó ninguna imagen"}), 400
        image = item_controller.save_image(imagefile)
        item_data = request.form.to_dict()
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
            return jsonify({"message": "Usuario no encontrado"}), 404
    elif request.method == 'DELETE':
        try:
            item_controller.deleteUser(id)
            return jsonify({"message": "Item eliminado exitosamente"}), 200
        except ValueError as e:
            return jsonify({"error": str(e)}), 400
@items_bp.route("/get-items-category/<int:categoryid>")
def show_items_category(categoryid):
    item_controller = itemController()
    items = item_controller.getItems_per_category(categoryid)
    if(items):
        return jsonify(items)
    else:
        return jsonify({"message": "No se encontraron items en esa categoría"}), 404

@items_bp.route("/get-item-image/<int:id>")
def get_image(id):
    item_controller = itemController()
    ## Get image with get_image_with_id method
    image = item_controller.get_image_with_id(id)
    if image:
        ## if there is an image, get the bytes of the image 
        image = bytes(image[0]['image'])
        ### Convert the bytes to an image and then send them as a response
        return send_file(BytesIO(image), as_attachment=False, mimetype='image/png')
    else:
        return jsonify({"message": f"Couldn't find image"}), 404

@items_bp.route("/dateinfo/<int:id>")
def get_dateInfo(id):
    item_controller = itemController()
    info = item_controller.getDateInfo(id)
    if(info):
        return jsonify(info) 
    if(info):
        return jsonify(info)
    else:
        return jsonify({"message":f"Couldn't find price information for item with id: {id}"}), 404
    
