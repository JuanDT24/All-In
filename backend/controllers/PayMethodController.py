from modules.pay_method import PayMethod
from database_controller import client

class PayMethodController():
    _instance = None

    def __new__(cls, *args, **kwargs):
        # Si no existe la instancia, se crea una nueva
        if cls._instance is None:
            cls._instance = super(PayMethodController, cls).__new__(cls)
        return cls._instance

    def createPayMethod(self, FullName:str, ID:str, CardNumber:str, Bank:str, CVC:str, ExpirationDate:str, IdUser:int):
        self._contador_id = client.query("Select max(idpaym) from paymethods")[0]['max'] + 1
        client.query(f"INSERT into paymethods (idpaym, fullname, id, cardnumber, bank, cvc, expirationdate, iduser)
        VALUES ({self._contador_id}, '{FullName}', '{ID}', '{CardNumber}', '{Bank}', '{CVC}', '{ExpirationDate}', {IdUser})")

    def deletePayMethod(self, id): 
        client.query(f"Delete from paymethods where idpaym = {id}")
    
    def getPayMethod_byuser(self, id):
        result = client.query(f"Select * from paymethods where iduser = {id}")
        pay_methods = []
        for pay_method_data in result:
            pay_method = PayMethod(
                pay_method_data['idpaym'],
                pay_method_data['fullname'],
                pay_method_data['id'],
                pay_method_data['cardnumber'],
                pay_method_data['bank'],
                pay_method_data['cvc'],
                pay_method_data['expirationdate'],
                pay_method_data['iduser']
            )
            pay_methods.append(pay_method)
        return pay_methods

    def getPayMethod_byid(self, id):
        result = client.query(f"Select * from paymethods where idpaym = {id}")
        if result:
            pay_method_data = result[0]
            pay_method = PayMethod(
                pay_method_data['idpaym'],
                pay_method_data['fullname'],
                pay_method_data['id'],
                pay_method_data['cardnumber'],
                pay_method_data['bank'],
                pay_method_data['cvc'],
                pay_method_data['expirationdate'],
                pay_method_data['iduser']
            )

            return pay_method
        return None
    
    def check_id(self, id):
        query=client.query(f"Select * from paymethods where idpaym = {id}")
        if len(query) > 0:
            return True
        else: 
            return False