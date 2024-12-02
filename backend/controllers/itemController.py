from modules.item import Item
from database_controller import client
import os
class itemController():
    _instance = None

    def __new__(cls, *args, **kwargs):
        # Si no existe la instancia, se crea una nueva
        if cls._instance is None:
            cls._instance = super(itemController, cls).__new__(cls)
        return cls._instance
    def createItem(self, name, description, idSeller, currentPrice, startingPrice, inmediate_Purchase_Price, minimum_Increase, post_Date, start_Date, due_Date, idcategory, image):
        _contador_id = client.query("Select max(iditem) from items")[0]['max'] + 1
        client.query(f"Insert into items(iditem, name, description, idseller, idcategory, image) VALUES ({_contador_id}, '{name}', '{description}', {idSeller}, {idcategory}, '{image}')")
        client.query(f"Insert into itempricesettings(iditem, price, startingprice, inmediatepurchaseprice, minimumincrease) VALUES ({_contador_id}, {currentPrice}, {startingPrice}, {inmediate_Purchase_Price}, {minimum_Increase})")
        client.query(f"Insert into itemdate(iditem, postingdate, startingdate, duedate) VALUES ({_contador_id}, '{post_Date}', '{start_Date}', '{due_Date}')")
    def deleteItem(self, id):
        client.query(f"Delete from items where id = {id} ")
    def getItem(self, id):
        result = (f"Select from items where id = {id}")
        if result:
            item_data = result[0]
            
        else: 
            return f"Couldn't find item with id: {id}"
    def save_image(self, file):
        upload_folder = os.path.join(os.path.dirname(__file__), '..', 'uploads')
        os.makedirs(upload_folder, exist_ok=True)

        filepath = os.path.join(upload_folder, file.filename)

        file.save(filepath)

        with open(filepath, 'rb') as imagefile:
            image_array = imagefile.read()

        return image_array
    
