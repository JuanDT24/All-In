from database_controller import client
from controllers.itemController import itemController
from controllers.BidController import BidController


class AdminController():
    _instance = None

    def __new__(cls, *args, **kwargs):
        # Si no existe la instancia, se crea una nueva
        if cls._instance is None:
            cls._instance = super(AdminController, cls).__new__(cls)
        return cls._instance

    def getCategories(self):
        result = client.query("Select * from categories")
        if result:
            return result
        return None
    
    def updateItemPrice(self, idItem):
        bid_controller = BidController()
        item_controller = itemController()
        item_controller.changePrice(idItem, bid_controller.getMaxBidbyItem(idItem))

