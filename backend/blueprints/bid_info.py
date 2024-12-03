from flask import Blueprint, request, jsonify
from controllers.BidController import BidController

bids_bp = Blueprint('bids', __name__, url_prefix = "/api/bids")

#{self._contador_id}, {IdItem}, {IdBidder}, {Price}, '{BidDate}', {ImmediatePurchase})

@bids_bp.route("/", methods = ["POST"])
def create_bid():
    bid_controller = BidController()
    try:
        data = request.get_json()
        if not all(key in data for key in ['IdItem', 'IdBidder', 'Price', 'BidDate', 'ImmediatePurchase']):
            return jsonify({"error": "Faltan parámetros en la solicitud"}), 400
        bid_controller.createBid(data['IdItem'], data['IdBidder'], data['Price'], data['BidDate'], data['ImmediatePurchase'])
        return jsonify({"message": "Oferta añadida correctamente"}), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Error interno del servidor"}, {"message": str(e)}), 500

@bids_bp.route("/<id>", methods = ["GET", "DELETE"])
def search_bid(id):
    bid_controller = BidController()
    if request.method == 'GET':
        bid = bid_controller.getBid_byid(id)
        if(bid):
            return jsonify(bid.__dict__)
        else:
            return jsonify({"message": "Oferta no encontrada"}), 404
    elif request.method == 'DELETE':
        try:
            bid_controller.deleteBid(id)
            return jsonify({"message": "Oferta eliminada exitosamente"}), 200
        except ValueError as e:
            return jsonify({"error": str(e)}), 400
        except Exception as e:
            return jsonify({"error": "Error interno del servidor"}), 500
        
@bids_bp.route("/item/<id>", methods = ["GET"])
def search_bids_byitem(id):
    bid_controller = BidController()
    bids = bid_controller.getBids_byitem(id)
    if(bids):
        return jsonify([bid.__dict__ for bid in bids])
    else:
        return jsonify({"message": "Ofertas no encontradas"}), 404
    
@bids_bp.route("/bidder/<id>", methods = ["GET"])
def search_bids_bybidder(id):
    bid_controller = BidController()
    bids = bid_controller.getBids_bybidder(id)
    if(bids):
        return jsonify([bid.__dict__ for bid in bids])
    else:
        return jsonify({"message": "Ofertas no encontradas"}), 404