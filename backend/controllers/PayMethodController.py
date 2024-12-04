from modules.pay_method import PayMethod
from database_controller import client

class PayMethodController():
    _instance = None

    def __new__(cls, *args, **kwargs):
        # Si no existe la instancia, se crea una nueva
        if cls._instance is None:
            cls._instance = super(PayMethodController, cls).__new__(cls)
        return cls._instance

    def createPayMethod(self, FullName:str, ID:str, CardNumber:int, Bank:str, CVC:int, ExpirationDate:str, IdUser:int):
            self._contador_id = client.query("Select max(idpaym) from paymethods")[0]['max'] + 1
            client.query(f"INSERT into paymethods (idpaym, fullname, id, cardnumber, bank, cvc, expirationdate, iduser) VALUES ({self._contador_id}, '{FullName}', '{ID}', '{CardNumber}', '{Bank}', '{CVC}', '{ExpirationDate}', {IdUser})")
    def deletePayMethod(self, id): 
        client.query(f"Delete from paymethods where idpaym = {id}")
    
    def getPayMethod_byuser(self, id):
        result = client.query(f"Select * from paymethods where iduser = {id}")
        return result

    def getPayMethod_byid(self, id):
        result = client.query(f"Select * from paymethods where idpaym = {id}")
        return result
    
    def check_id(self, id):
        query=client.query(f"Select * from paymethods where idpaym = {id}")
        if len(query) > 0:
            return True
        else: 
            return False
    
    def getPayMethods_byemail(self, email):
        result = client.query(f"Select * from paymethods p join users u on p.iduser = u.iduser where u.email = '{email}'")
        return result
    