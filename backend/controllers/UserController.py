from modules.user import User
from database_controller import client
class UserController():
    _instance = None

    def __new__(cls, *args, **kwargs):
        # Si no existe la instancia, se crea una nueva
        if cls._instance is None:
            cls._instance = super(UserController, cls).__new__(cls)
        return cls._instance

    def createUser(self, email:str, password:str, name:str, LastName:str, PhoneNumber:int, Address:str):
        if not(self.check_email(email)):
            self._contador_id = client.query("Select max(iduser) from users")[0]['max'] + 1
            client.query(f"INSERT into users (iduser, email, name, lastname, phonenumber, address, starsseller, starscustomer, password) VALUES ({self._contador_id}, '{email}', '{name}', '{LastName}', {PhoneNumber}, '{Address}', 0, 0, '{password}')")
        else: 
            raise ValueError ("El correo electrónico ya está en uso")
    def deleteUser(self, id): 
        client.query(f"Delete from users where iduser = {id}")
    
    def getUser_byemail(self, email):
        result = client.query(f"Select * from users where email = '{email}'")
        if result:           
            return result
        else:
            raise ValueError("No hay un cliente con ese email")
    
    def check_email(self, email):
        query=client.query(f"Select * from users where email ='{email}'")
        if len(query) > 0:
            return True
        else: 
            return False