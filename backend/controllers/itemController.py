from modules.item import Item
from database_controller import client
import psycopg2
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
        image = psycopg2.Binary(image)
        client.query(f"Insert into items(iditem, name, description, idseller, idcategory, image) VALUES ({_contador_id}, '{name}', '{description}', {idSeller}, {idcategory}, %s)", [image])
        client.query(f"Insert into itempricesettings(iditem, price, startingprice, immediatepurchaseprice, minimumincrease) VALUES ({_contador_id}, {currentPrice}, {startingPrice}, {inmediate_Purchase_Price}, {minimum_Increase})")
        client.query(f"Insert into itemdate(iditem, postingdate, startingdate, duedate) VALUES ({_contador_id}, '{post_Date}', '{start_Date}', '{due_Date}')")

    def deleteItem(self, id):
        client.query(f"Delete from items where iditem = {id} ")
        
    def getItem(self, id):
        result = client.query(f"Select * from items where iditem = {id}")
        if result:
            return result
        else: 
            return {"message":f"Couldn't find item with id: {id}"}
    def getItems_per_category(self, idcategory):
        result = client.query(f"Select i.iditem, i.name, i.idcategory, ip.price, ip.immediatepurchaseprice, ip.minimumincrease, itd.duedate from items i  join itempricesettings ip on i.iditem = ip.iditem  join itemdate itd on i.iditem = itd.iditem where idcategory = {idcategory} and idbuyer is null")
        if result:
            return result
        else:
            return None
    def getDateInfo(self, id):
        result = client.query(f"Select * from itemdate where iditem = {id}")
        return result

    def getPriceInfo(self, id):
        result = client.query(f"Select * from itempricesettings where iditem = %s", (id,))
        return result

    def save_image(self, file):
        upload_folder = os.path.join(os.path.dirname(__file__), '..', 'uploads')
        os.makedirs(upload_folder, exist_ok=True)

        filepath = os.path.join(upload_folder, file.filename)

        file.save(filepath)

        with open(filepath, 'rb') as imagefile:
            image_array = imagefile.read()
        return image_array
    
    def get_image_with_id(self, id):
        image = client.query(f"Select image from items where iditem = {id}")
        if image:
            return image
        else: 
            return None
    
    def changePrice(self, id, newPrice):
        client.query(f"Update itempricesettings set price = {newPrice} where iditem = {id}")

    def changeIdBuyer(self, id, idBuyer):
        client.query(f"Update items set idbuyer = {idBuyer} where iditem = {id}")