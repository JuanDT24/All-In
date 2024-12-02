class User:
    def __init__ (self, Email, Password, Name, Lastname, PhoneNumber, Address, StarsSeller, StarsCustomer):
        self.Email = Email
        self.Password = Password
        self.Name = Name
        self.Lastname = Lastname
        self.PhoneNumber = PhoneNumber
        self.Address = Address
        self.StarsSeller = StarsSeller
        self.StarsCustomer = StarsCustomer
        
    def __str__(self):
        return f"User({self.iduser}, {self.email}, {self.name}, {self.lastname})"