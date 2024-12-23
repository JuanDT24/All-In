from modules.item import Item
from database_controller import client, client2, client3, clients
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
        self.updateAllBuyedItems()
        result = client.query(f"Select i.iditem, i.name, i.description, i.idcategory, ip.price, ip.immediatepurchaseprice, ip.minimumincrease, itd.duedate from items i  join itempricesettings ip on i.iditem = ip.iditem  join itemdate itd on i.iditem = itd.iditem where idcategory = {idcategory} and idbuyer is null")
        client.close()
        if result:
            return result
        else:
            return [{"message":f"No se encontraron items con esta categoria"}]
        
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
        i = 0
        while (i < len(clients)):
            try:
                image = clients[i].query(f"Select image from items where iditem = {id}")
                if image:
                    return image
                else: 
                    return None
            except:
                if i == len(clients):
                    i = 0
                i = i + 1
    
    def changePrice(self, id, newPrice):
        client.query(f"Update itempricesettings set price = {newPrice} where iditem = {id}")

    def changeIdBuyer(self, id, idBuyer):
        client.query(f"Update items set idbuyer = {idBuyer} where iditem = {id}")

    def AllBuyedItemsWithnoBuyer(self):
    # Ejecutar la consulta para obtener los resultados
            result = client2.query(
                "SELECT * FROM items i "
                "JOIN itemdate id ON i.iditem = id.iditem "
                "WHERE idbuyer IS NULL AND duedate < NOW()"
            )
            return result  # Devuelve los resultados obtenidos

    def updateAllBuyedItems(self):
        items = self.AllBuyedItemsWithnoBuyer()
        # Validar si hay elementos en la lista
        if items:
            for item in items:
                result = self.getMaxBidbyItem(item['iditem'], 1)
                if result != []:
                    self.changeIdBuyer(item['iditem'], result[0]['idbidder'])

    def getMaxBidbyItem(self, id, option = 0):
        result = client2.query(f"Select * from bids where iditem = {id} and price = (Select max(price) from bids where iditem = {id}) order by biddate desc limit 1")
        if result and option == 0:
            return result[0]['price']
        else:
            return result