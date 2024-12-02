from modules.bid import Bid
from database_controller import client

class BidController():
    _instance = None

    def __new__(cls, *args, **kwargs):
        # Si no existe la instancia, se crea una nueva
        if cls._instance is None:
            cls._instance = super(BidController, cls).__new__(cls)
        return cls._instance

    def createBid(self, IdItem:int, IdBidder:int, Price:float, BidDate:str, ImmediatePurchase:bool):
        self._contador_id = client.query("Select max(idbid) from bids")[0]['max'] + 1
        client.query(f"INSERT into bids (idbid, iditem, idbidder, price, biddate, immediatepurchase)
        VALUES ({self._contador_id}, {IdItem}, {IdBidder}, {Price}, '{BidDate}', {ImmediatePurchase})")
    
    def deleteBid(self, id): 
        client.query(f"Delete from bids where idbid = {id}")
    
    def getBid_byid(self, id):
        result = client.query(f"Select * from bids where idbid = {id}")
        if result:
            bid_data = result[0]
            bid = Bid(
                bid_data['idbid'],
                bid_data['iditem'],
                bid_data['idbidder'],
                bid_data['price'],
                bid_data['biddate'],
                bid_data['immediatepurchase']
            )
            return bid
        return None
    
    def getBids_byitem(self, id):
        result = client.query(f"Select * from bids where iditem = {id}")
        if result:
            bids = []
            for bid_data in result:
                bid = Bid(
                    bid_data['idbid'],
                    bid_data['iditem'],
                    bid_data['idbidder'],
                    bid_data['price'],
                    bid_data['biddate'],
                    bid_data['immediatepurchase']
                )
                bids.append(bid)
            return bids
        return None
    
    def getBids_bybidder(self, id):
        result = client.query(f"Select * from bids where idbidder = {id}")
        if result:
            bids = []
            for bid_data in result:
                bid = Bid(
                    bid_data['idbid'],
                    bid_data['iditem'],
                    bid_data['idbidder'],
                    bid_data['price'],
                    bid_data['biddate'],
                    bid_data['immediatepurchase']
                )
                bids.append(bid)
            return bids
        return None
    
    def getBids_byBidderandItem(self, idbidder, iditem):
        result = client.query(f"Select * from bids where idbidder = {idbidder} and iditem = {iditem}")
        if result:
            bid_data = result[0]
            bid = Bid(
                bid_data['idbid'],
                bid_data['iditem'],
                bid_data['idbidder'],
                bid_data['price'],
                bid_data['biddate'],
                bid_data['immediatepurchase']
            )
            return bid
        return None