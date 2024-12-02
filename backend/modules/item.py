class Item:
    def __init__(name, description, idSeller, startingPrice, inmediate_Purchase_Price, minimum_Increase, post_Date, start_Date, due_Date, categories):
        self.name = name 
        self.description = description
        self.idSeller = idSeller
        self.startingprice = startingPrice
        self.inmediate_purchase_price = inmediate_Purchase_Price
        self.minimum_Increase = minimum_Increase 
        self.images = {}
        self.post_Date = post_Date
        self.start_Date = start_Date
        self.due_Date = due_Date
        self.categories = []
        

        
