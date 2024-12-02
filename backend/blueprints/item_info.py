from flask import Blueprint, request, jsonify
from controllers.itemController import itemController

items_bp = Blueprint("users", __name__, url_prefix="/api/items")


@items_bp.route("/", methods = ["POST"])
def create_item():
    item_controller = itemController()
    try:
        item_data = request.get_json()
        item_controller.createItem()