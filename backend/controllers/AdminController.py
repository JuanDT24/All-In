from database_controller import client
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

    def callmaxbid(self, idItem):
        bid_controller = BidController()
        bid_controller.getMaxBidbyItem(idItem, 1)
