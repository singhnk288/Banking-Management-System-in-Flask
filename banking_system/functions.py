from datetime import datetime
from banking_system import app,db
from banking_system.model import *
from time import sleep
from flask import flash,session

def get_formatted_date():
    now = datetime.now()
    formatted_date = now.strftime('%Y-%m-%d %H:%M:%S')
    return formatted_date

def account_type_list():
    # hardcoded set Account type if any account need to add then add here
    account_type = {
        '1' : 'Current',
        '2' : 'Saving'
    }
    return account_type

# universal function for added transaction into Transaction Control
def add_transaction(transaction_type, amount,source_account_id,destination_account_id = None):
    # 1 : withdraw
    # 2 : deposit
    # 3 : transfer - account_id manadatory        
    if not transaction_type or (transaction_type == 3 and not destination_account_id):
        return False
    # default status set as True
    loop_status = True
    transaction_success = False   
          
    while loop_status:
        # account locked or not if account locked then wait for unlocked
        if destination_account_id:
            accounts_list = [int(source_account_id),int(destination_account_id)]            
        else:
            accounts_list = [int(source_account_id)]
        # if status is true wait few milisecond and try again
        status = check_locked(accounts_list)
        
        if status:            
            sleep(0.5)
        else:
            loop_status = False            
            locked_account(accounts_list)            
            # Initiate Transaction
            account_obj = Account.query.get(source_account_id)
            account_amount = account_obj.amount                  
            if transaction_type and transaction_type == 1:
                # Withdraw Money                
                account_amount = account_obj.amount
                if account_amount < amount:                    
                    flash('Withdraw not allowed, please choose smaller amount')
                    transaction_success = False                    
                    break
                else:                    
                    account_amount = account_amount-amount  
                    account_obj.amount  = account_amount
                    db.session.add(account_obj)
                    db.session.commit()
                    save_transaction_entry(source_account_id,"Withdraw",amount)
                    transaction_success = True
            elif transaction_type and transaction_type == 2:
                # Deposit Money                
                account_amount = account_obj.amount
                account_amount = account_amount+amount  
                account_obj.amount = account_amount
                db.session.add(account_obj)
                db.session.commit()
                save_transaction_entry(source_account_id,"Deposit",amount)
                transaction_success = True
            elif transaction_type and transaction_type == 3:                
                if account_amount < amount:
                    flash('Withdraw not allowed, please choose smaller amount')
                    transaction_success = False                    
                    break
                else:                    
                    # Transfer Money                
                    # First Debit account then credit amount
                    account_amount = account_obj.amount
                    account_amount = account_amount-amount 
                    destination_account_obj = Account.query.get(destination_account_id) 
                    destination_amount = destination_account_obj.amount
                    destination_amount = destination_amount + amount
                    # set new account
                    account_obj.amount = account_amount
                    destination_account_obj.amount = destination_amount
                    db.session.add(account_obj)
                    db.session.add(destination_account_obj)
                    db.session.commit()
                    save_transaction_entry(source_account_id,"Withdraw",amount)
                    save_transaction_entry(destination_account_id,"Deposit",amount)
                    transaction_success = True
        # unlocked account
    unlocked_account(accounts_list)
    if transaction_success:
        flash("Transaction completed successfully")
    return transaction_success

def locked_account(accounts = []):
    # Locked Account given in this parameter
    for account in accounts:
        account_obj = Account.query.get(account)
        account_obj.is_locked = True
        db.session.add(account_obj)
        db.session.commit()
    return True

def unlocked_account(accounts = []):
    # UnLocked Account given in this parameter
    for account in accounts:
        account_obj = Account.query.get(account)
        account_obj.is_locked = False
        db.session.add(account_obj)
        db.session.commit()
    return True

# if pass account any one is set as true then its return false
def check_locked(accounts = []):
    # default account locked status set as false
    status = False
    for account in accounts:
        account_obj = Account.query.get(account)
        if account_obj.is_locked:
            status = True
    return status

def save_transaction_entry(account_id,description,amount):        
    transaction_obj = TransactionControl(account_id,description,amount,get_formatted_date())
    db.session.add(transaction_obj)
    db.session.commit()


# Flash message for ajax request
def flash_set(message):
    if session['flash']:
        message = session['flash']
        message = list(message)
        message.append(message)
    else:
        message = list()
        message.append(message)
        session['flash'] = message

def flash_retrieve():
    if session['flash']:
        messages = session['flash']
        for message in messages:
            flash(message)
