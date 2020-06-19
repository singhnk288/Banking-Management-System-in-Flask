from banking_system import db
from datetime import datetime
from sqlalchemy.dialects.mysql import TIMESTAMP
from sqlalchemy import func, text,DDL,event
import hashlib
from banking_system import app
from uuid import uuid4

# Customer Model
class Customer(db.Model):
    __tablename__ = 'customers'
    def __str__(self):
        return self.name
        
    # define attributes of customer table
    id = db.Column(db.Integer,primary_key=True)
    ssn_id = db.Column(db.Integer)    
    name = db.Column(db.String(255))
    age = db.Column(db.Integer)
    address = db.Column(db.String(255))
    state = db.Column(db.Integer)
    city = db.Column(db.Integer)
    created_at = db.Column(TIMESTAMP(), nullable=False)
    updated_at = db.Column(TIMESTAMP(), nullable=False,
                        server_default=text('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
                        )

    def __init__(self,ssn_id,name,age,address,state,city,created_at):        
        self.ssn_id = ssn_id
        self.name = name
        self.age = age
        self.address = address
        self.state = state
        self.city = city
        self.created_at = created_at        

# Country Model
class Country(db.Model):
    __tablename__ = 'countries'
    def __str__(self):
        return self.name
    
    # Columns
    id = db.Column(db.Integer,primary_key=True)
    sortname = db.Column(db.String(3))    
    name = db.Column(db.String(150))
    phonecode = db.Column(db.Integer)

# State Model
class State(db.Model):
    __tablename__ = 'states'
    def __str__(self):
        return self.name
    
    # Columns
    id = db.Column(db.Integer,primary_key=True)     
    name = db.Column(db.String(30))
    country_id = db.Column(db.Integer,db.ForeignKey('countries.id'))

# City Model
class City(db.Model):
    __tablename__ = 'cities'
    def __str__(self):
        return self.name
    
    # Columns
    id = db.Column(db.Integer,primary_key=True)     
    name = db.Column(db.String(30))
    state_id = db.Column(db.Integer,db.ForeignKey('states.id'))


# Customer Status
class CustomerStatus(db.Model):
    __tablename__ = 'customer_status'
    def __str__(self):
        return "<Customer Id: "+self.name+">"
    id = db.Column(db.Integer,primary_key=True)
    customer_id = db.Column(db.Integer,db.ForeignKey('customers.id'))
    ssn_id = db.Column(db.Integer)
    status = db.Column(db.Boolean,default=True)
    message = db.Column(db.String(255))
    updated_at = db.Column(TIMESTAMP(), nullable=False,
                        server_default=text('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
                        )
    def __init__(self,customer_id,ssn_id,message):
        self.customer_id = customer_id
        self.ssn_id = ssn_id
        self.message = message

# Account Management Model
class Account(db.Model):
    __tablename__ = 'accounts'
    def __str__(self):
        return self.name
    
    id = db.Column(db.Integer,primary_key=True) 
    customer_id = db.Column(db.Integer,db.ForeignKey('customers.id'))
    account_type = db.Column(db.Integer)
    amount = db.Column(db.Integer)
    is_locked = db.Column(db.Boolean,default=False)
    created_at = db.Column(TIMESTAMP(), nullable=False)
    updated_at = db.Column(TIMESTAMP(), nullable=False,
                        server_default=text('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
                        )
    def __init__(self,customer_id,account_type,amount,created_at):
        self.customer_id = customer_id
        self.account_type = account_type
        self.amount = amount        
        self.created_at = created_at

# Account Status
class AccountStatus(db.Model):
    __tablename__ = 'account_status'
    def __str__(self):
        return "<Account Id: "+self.name+">"
    id = db.Column(db.Integer,primary_key=True)
    account_id = db.Column(db.Integer,db.ForeignKey('accounts.id'))
    customer_id = db.Column(db.Integer,db.ForeignKey('customers.id'))
    account_type = db.Column(db.Integer)
    status = db.Column(db.Boolean,default=True)
    message = db.Column(db.String(255))
    updated_at = db.Column(TIMESTAMP(), nullable=False,
                        server_default=text('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
                        )
    def __init__(self,account_id,customer_id,account_type,message):
        self.customer_id = customer_id
        self.account_id = account_id
        self.account_type = account_type
        self.message = message


# Transaction Management
class TransactionControl(db.Model):
    __tablename__ = 'transactions_control'
    def __str__(self):
        return "<Transaction Id: "+str(self.id)+">"
    id = db.Column(db.Integer,primary_key=True)
    transaction_id = db.Column(db.String(100))
    account_id = db.Column(db.Integer)
    description = db.Column(db.String(100))
    amount = db.Column(db.Integer)
    created_at = db.Column(TIMESTAMP(), nullable=False)  

    def __init__(self,account_id,description,amount,created_at):
        self.account_id = account_id
        self.transaction_id = self.get_transaction_id()
        self.description = description        
        self.amount = amount        
        self.created_at = created_at          

    def get_transaction_id(self):
        transaction_id = datetime.now().strftime('%Y%m-%d%H-%M%S-')+str(uuid4())
        return transaction_id

# User Registration
class UserRegistration(db.Model):    
    __tablename__ = 'user_registrations' 
    # columns define
    id = db.Column(db.Integer,primary_key=True)
    username = db.Column(db.String(20))
    password = db.Column(db.String(255))
    status = db.Column(db.Boolean,default=True)
    created_at = db.Column(TIMESTAMP(), nullable=False)
    updated_at = db.Column(TIMESTAMP(), nullable=False,server_default=text('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),)
    def __init__(self,username,password,created_at):
        self.username = username
        self.password = password
        self.created_at = created_at            

    def __str__(self):
        return self.username

    def hashing(password):
        salt = app.config.get('SALT','')    
        db_password = password+salt
        hash = hashlib.md5(db_password.encode())
        hashing_password = hash.hexdigest()             
        return hashing_password



event.listen(
            Customer.__table__,
            "after_create",
            DDL("ALTER TABLE `%(table)s` auto_increment = 900000000;")
        )     
event.listen(
            Account.__table__,
            "after_create",
            DDL("ALTER TABLE `%(table)s` auto_increment = 900000000;")
        )    