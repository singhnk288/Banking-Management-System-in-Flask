# from banking_system import app,mysql
from flask import render_template, request, json, Response,flash,redirect,session
from flask import url_for
import os
from banking_system import app,db
from banking_system.model import *
import datetime
from banking_system.functions import *

@app.route('/',methods=['GET','POST'])
def home():
    # Allow Login Functionality
    formData = dict()
    # If user already login then redirect to customer search page
    if session.get('username'):    
        return redirect(url_for('customer_search'))
    if request.method == "POST":          
        username = request.form.get('username',None) 
        password = request.form.get('password',None)         
        formData['username'] = username
        formData['password'] = password
        if username and password:
            hashpassword = UserRegistration.hashing(password)
            # Check username exist or not
            user_obj = UserRegistration.query.filter_by(username=username,password=hashpassword).first()            
            if user_obj:
                session['username'] = user_obj.username
                flash("User login successfully")
                return redirect(url_for('customer_search'))
            else:
                flash("Username or password invalid")
        else:
            flash("Something wents wrong, please contact developer")
    return render_template('index.html',formData = formData)

@app.route('/customer',methods=['GET','POST'],defaults={'update_id': None})
@app.route('/customer/<update_id>',methods=['GET','POST'])
def customer(update_id):     
    formData = dict()
    # If user not login then redirect to login page
    if not session.get('username'):    
        return redirect(url_for('home'))
    # Form list state
    # Set Default Country 1 - India
    states = State.query.filter_by(country_id=1).all()   
    formData['states'] = states
    # pass update id 
    formData['update_id'] = update_id
    # Form Persistence
    if update_id:
        customer_obj = Customer.query.get(update_id)
        postData = dict()
        postData['customer_name'] = customer_obj.name
        postData['customer_ssn_id'] = customer_obj.ssn_id
        postData['age'] = customer_obj.age
        postData['address'] = customer_obj.address
        postData['state_id'] = customer_obj.state
        postData['city_id'] = customer_obj.city
        cities = City.query.filter_by(state_id=postData['state_id']).all()
        formData['cities'] = cities
        formData['postForm'] = postData
        del postData
    # Post Request Handle
    if request.method == "POST":
        postData = request.form     
        if update_id:
            customerName = postData['customer_name']
            age = postData['age']
            address = postData['address']
            customer_obj = Customer.query.get(update_id)
            customer_obj.age = age
            customer_obj.address = address
            customer_obj.name = customerName
            db.session.add(customer_obj)  # Adds new Customer record to database            
            db.session.commit()  # Commits all changes
            flash("Customer updates successfully")
            # Saved in Customer Status Model
            if update_id:
                customer_status_obj = CustomerStatus(update_id,customer_obj.ssn_id,"Customer update complete")
                db.session.add(customer_status_obj)  # Adds new Customer record to database            
                db.session.commit()  # Commits all changes
                return redirect(url_for('customer_status'))

        else:            
            customerSsnId = postData['customer_ssn_id']
            customer_exists = Customer.query.filter_by(ssn_id=customerSsnId).count()
            customerSsnId = postData['customer_ssn_id']
            if not customer_exists:
                customerName = postData['customer_name']
                age = postData['age']
                address = postData['address']            
                stateId = postData['state_id']
                cityId = postData['city_id']        
                formatted_date = get_formatted_date()
                customer_obj = Customer(customerSsnId,customerName,age,address,stateId,cityId,formatted_date)
                db.session.add(customer_obj)  # Adds new Customer record to database            
                db.session.commit()  # Commits all changes
                # Saved in Customer Status Model
                if customer_obj.id:
                    customer_status_obj = CustomerStatus(customer_obj.id,customerSsnId,"Customer created successfully")
                    db.session.add(customer_status_obj)  # Adds new Customer record to database            
                    db.session.commit()  # Commits all changes
                flash("Customer creation initiated successfully")
                return redirect(url_for('customer_status'))
            else:
                formData['postForm'] = postData
                if postData['state_id']:
                    cities = City.query.filter_by(state_id=postData['state_id']).all()
                    formData['cities'] = cities
                flash("Customer SSN Id already exists")

    return render_template('customer_register.html',formData = formData)

@app.route('/customer-status',methods=['GET','POST'])
def customer_status():
    formData = dict() 
    # If user not login then redirect to login page
    if not session.get('username'):    
        return redirect(url_for('home'))

    customer_status = Customer.query.outerjoin(CustomerStatus).add_columns(Customer.id,Customer.name,Customer.ssn_id,CustomerStatus.message,CustomerStatus.status,CustomerStatus.updated_at).order_by(Customer.id.asc(),CustomerStatus.updated_at.asc()).all()
    # for t in test:
    #     print(t)
    # return json.dumps({'status' : True})
    # customer_status = CustomerStatus.query.order_by(CustomerStatus.customer_id).all()
    formData['customer_status'] = customer_status
    return render_template('customer_status.html',formData = formData)

@app.route('/viewprofile',methods=['GET','POST'],defaults={'id': None})
@app.route('/viewprofile/<id>',methods=['GET','POST'])
def view_profile(id):
    formData = dict()
    # If user not login then redirect to login page
    if not session.get('username'):    
        return redirect(url_for('home'))
    customer_obj = Customer.query.get(id)    
    if customer_obj:
        formData['customer'] = customer_obj
        formData['update_id'] = id
    else:
        flash("Customer is either delete or customer id not valid")
        return redirect(url_for('customer_status'))
    return render_template('customer_view_profile.html',formData = formData)

@app.route('/customer-search',methods=['GET','POST'])
# Customer Search 
def customer_search():
    # variable pass into template if any need
    formData = dict()
    # If user not login then redirect to login page
    if not session.get('username'):
        return redirect(url_for('home'))
    # If user not login then redirect to login page
    if not session.get('username'):
        return redirect(url_for('home'))
    formData['post_url'] = url_for('customer_search')    
    if request.method == "POST":        
        customer_id = request.form.get('customer_id')
        ssn_id = request.form.get('customer_ssn_id')        
        if customer_id:
            customer_obj = Customer.query.filter_by(id=customer_id).first()
            if customer_obj:
                return redirect(url_for('view_profile')+'/'+str(customer_obj.id))
            else:
                flash("Customer not found for corresponding customer id")
        elif ssn_id:
            customer_obj = Customer.query.filter_by(ssn_id=ssn_id).first()
            if customer_obj:
                return redirect(url_for('view_profile')+'/'+str(customer_obj.id))
            else:
                flash("Customer not found for corresponding ssn id")
        else:
            flash("Something went wrong, please contact developer")
    return render_template('customer_search.html',formData = formData)            

# Delete Customer details
@app.route('/ajax/delete_customer',methods=['POST'])
def ajax_delete_customer():
    if not session.get('username'):    
        data = {'url' : url_for('home'),'status' : True}        
        return data
    if request.method == "POST":  
        customer_id = request.form.get('customer_id',0)
        if customer_id:
            customer_obj = Customer.query.get(customer_id)
            db.session.delete(customer_obj)
            db.session.commit()
            flash("Customer Details successfully deleted")
        else:
            flash("Something wents wrong, Please try again")
    data = {'status' : True,'url' : url_for('customer_status')}
    return data

@app.route('/ajax/change_state',methods=['POST'])
def ajax_change_state():
    # Handle Post Request   
    html = ''    
    if request.method == "POST":
        state_id = request.form.get('state_id',0)    
        html = '<option value="">Select city..</option>'    
        if state_id:                        
            cities = City.query.filter_by(state_id=state_id).all()
            for city in cities:                
                html += '<option value="{}">{}</option>'.format(city.id,city.name)
    if html == '':
        data = {'status' : False}
    else:
        data = {'status' : True,'data' : html}
    return data



# Acount Profile
@app.route('/account',methods=['GET','POST'])
def account():     
    formData = dict()
    # If user not login then redirect to login page
    if not session.get('username'):    
        return redirect(url_for('home'))
    # Form list state
    # Set Default Country 1 - India
    customers = Customer.query.add_columns(Customer.id,Customer.ssn_id).all()   
    formData['customers'] = customers    
    account_type = account_type_list()        
    formData['account_type'] = account_type
    # Post Request Handle
    if request.method == "POST":
        postData = request.form  
        account_type_id = postData['account_type_id']
        customer_id = postData['customer_id']                                 
        account_exists = Account.query.filter_by(customer_id=customer_id,account_type=account_type_id).first()        
        if not account_exists:            
            amount = postData['amount']
            account_obj = Account(customer_id,account_type_id,amount,get_formatted_date())
            db.session.add(account_obj)  # Adds new Customer record to database            
            db.session.commit()  # Commits all changes            
            # Saved in Customer Status Model
            if account_obj.id:
                account_status_obj = AccountStatus(account_obj.id,customer_id,account_type_id,"Account creation complete")
                db.session.add(account_status_obj)  # Adds new Account record to database            
                db.session.commit()  # Commits all changes
                # Add Deposit Entry into transaction control table
                transaction_control_obj = TransactionControl(account_obj.id,"Deposit",amount,get_formatted_date())
                db.session.add(transaction_control_obj)  # Adds new Transaction record to database            
                db.session.commit()  # Commits all changes
            flash("Account creation initiated successfully")
            return redirect(url_for('account_status'))
        else:
            account_status_obj = AccountStatus(account_exists.id,customer_id,account_type_id,"Customer already has account of specified type")
            db.session.add(account_status_obj)  # Adds new Account record to database            
            db.session.commit()  # Commits all changes
            flash("Customer already has account of specified type")
            formData['postData'] = postData
            print(postData.get('account_type_id'))
    return render_template('account_register.html',formData = formData)

@app.route('/account-status',methods=['GET','POST'])
def account_status():
    formData = dict() 
    # If user not login then redirect to login page
    if not session.get('username'):    
        return redirect(url_for('home'))
    account_status = Customer.query.outerjoin(AccountStatus).add_columns(AccountStatus.account_id,
    Customer.id,AccountStatus.account_type,AccountStatus.message,
    AccountStatus.status,AccountStatus.updated_at).order_by(Customer.id.asc(),AccountStatus.updated_at.asc()).all()    
    formData['account_status'] = account_status
    return render_template('account_status.html',formData = formData)

@app.route('/account-profile',methods=['GET','POST'],defaults={'id': None})
@app.route('/account-profile/<id>',methods=['GET','POST'])
def account_view_profile(id):
    formData = dict()
    # If user not login then redirect to login page
    if not session.get('username'):
        return redirect(url_for('home'))
    # id represent account_id- customer first check corresponding customer , account is available or not
    # if not then return back with error - account create first
    if id:
        account_obj = Account.query.get(id)
    if account_obj:
        formData['account_obj'] = account_obj
        formData['account_id'] = id
        account_type_lists = account_type_list()
        formData['account_type_list'] = account_type_lists        
    else:
        flash("Account is either delete or account not created yet")
        return redirect(url_for('account_search'))
    return render_template('account_view_profile.html',formData = formData)

@app.route('/account-search',methods=['GET','POST'])
# Account Search 
def account_search():
    # variable pass into template if any need
    formData = dict()
    # If user not login then redirect to login page
    if not session.get('username'):
        return redirect(url_for('home'))
    formData['post_url'] = url_for('account_search')
    formData['account_type'] = account_type_list()
    if request.method == "POST":        
        customer_id = request.form.get('customer_id')
        account_id = request.form.get('account_id')
        account_type_id = request.form.get('account_type',1)
        if customer_id:
            account_obj = Account.query.filter_by(customer_id=customer_id,account_type=account_type_id).first()
            if account_obj:
                return redirect(url_for('account_view_profile')+'/'+str(account_obj.id))
            else:
                flash("Account not found for corresponding customer id")
        elif account_id:
            account_obj = Account.query.filter_by(id=account_id).first()
            if account_obj:
                return redirect(url_for('account_view_profile')+'/'+str(account_obj.id))
            else:
                flash("Account not found for corresponding account id")
        else:
            flash("Something went wrong, please contact developer")
    return render_template('account_search.html',formData = formData)
            
# Delete Account details
@app.route('/ajax/delete_account',methods=['POST'])
def ajax_account_delete():
    # If user not login then redirect to login page
    if not session.get('username'):
        data = {'url' : url_for('home'),'status' : True}        
        return data
    if request.method == "POST":  
        account_id = request.form.get('account_id',0)
        if account_id:
            account_obj = Account.query.get(account_id)
            db.session.delete(account_obj)
            db.session.commit()
            flash("Account Detail successfully deleted")
        else:
            flash("Something wents wrong, Please try again")
    data = {'status' : True,'url' : url_for('account_search')}
    return data

# Deposit Cash
@app.route('/cash-deposit',methods=['GET','POST'],defaults={'id': None})
@app.route('/cash-deposit/<id>',methods=['GET','POST'])
def cash_deposit(id):
    formData = dict()
    # If user not login then redirect to login page
    if not session.get('username'):
        return redirect(url_for('home'))
    # id represent account_id- customer first check corresponding customer , account is available or not
    # if not then return back with error - account create first
    if id:
        account_obj = Account.query.get(id)
    if account_obj:
        formData['account_obj'] = account_obj
        formData['account_id'] = id
        account_type_lists = account_type_list()
        formData['account_type_list'] = account_type_lists        
    else:
        flash("Account is either delete or account not created yet")
        return redirect(url_for('account_search'))
    return render_template('case_deposit.html',formData = formData)

# Withdraw Cash
@app.route('/cash-withdraw',methods=['GET','POST'],defaults={'id': None})
@app.route('/cash-withdraw/<id>',methods=['GET','POST'])
def cash_withdraw(id):
    formData = dict()
    # If user not login then redirect to login page
    if not session.get('username'):
        return redirect(url_for('home'))
    # id represent account_id- customer first check corresponding customer , account is available or not
    # if not then return back with error - account create first
    if id:
        account_obj = Account.query.get(id)
    if account_obj:
        formData['account_obj'] = account_obj
        formData['account_id'] = id
        account_type_lists = account_type_list()
        formData['account_type_list'] = account_type_lists        
    else:
        flash("Account is either delete or account not created yet")
        return redirect(url_for('account_search'))
    return render_template('cash_withdraw.html',formData = formData)

# Transfer Cash
@app.route('/cash-tranfer',methods=['GET','POST'],defaults={'id': None})
@app.route('/cash-tranfer/<id>',methods=['GET','POST'])
def cash_transfer(id):
    formData = dict()
    # If user not login then redirect to login page
    if not session.get('username'):
        return redirect(url_for('home'))
    # id represent account_id- customer first check corresponding customer , account is available or not
    # if not then return back with error - account create first
    if id:
        account_obj = Account.query.get(id)
    if account_obj:
        formData['account_obj'] = account_obj
        formData['account_id'] = id
        account_type_lists = account_type_list()
        accounts = Account.query.add_columns(Account.id,Account.customer_id).all() 
        formData['accounts'] = accounts
        formData['account_type_list'] = account_type_lists        
    else:
        flash("Account is either delete or account not created yet")
        return redirect(url_for('account_search'))
    return render_template('cash_transfer.html',formData = formData)

@app.route('/ajax/transaction_control',methods=['POST'])
def transaction_control():
    # If user not login then redirect to login page
    if not session.get('username'):
        data = {'url' : url_for('home'),'status' : True}        
        return data
    if request.method == "POST":          
        amount = request.form.get('amount',0)
        source_account_id = request.form.get('source_account_id',0)
        transaction_type = request.form.get('transaction_type',0)
        transfer_account_id = request.form.get('transfer_account_id',0)
        if amount or source_account_id or transaction_type:
            status = add_transaction(int(transaction_type),int(amount),int(source_account_id),int(transfer_account_id))
        else:
            flash('Somethings wents wrong')    
    data = {'url' : url_for('account_view_profile')+'/'+str(source_account_id),'status' : status}        
    return data


@app.route('/create-account',methods=['GET','POST'])
def create_account():
    formData = dict()    
    if request.method == "POST":
        username = request.form.get('username',None) 
        password = request.form.get('password',None)         
        formData['username'] = username
        formData['password'] = password
        if username and password:
            # Check username exist or not
            user_exists = UserRegistration.query.filter_by(username=username).count()            
            if not user_exists:
                # perform operation
                encrypt_password = UserRegistration.hashing(password)
                user_obj = UserRegistration(username,encrypt_password,get_formatted_date())
                # saved object into db
                db.session.add(user_obj)  # Adds new User record to database            
                db.session.commit()  # Commits all changes
                flash("User created successfully")
                return redirect(url_for('home'))
            else:
                flash("Username is already present please choose another")
        else:
            flash("Something wents wrong, please contact developer")
    return render_template('registration.html',formData = formData)

@app.route('/logout',methods=['GET','POST'])
def logout():
    if session.get('username'):
        session['username'] = None
    return redirect(url_for('home'))

@app.route('/account-statement',methods=['GET','POST'])
def account_statement():
    formData = dict()
    # If user not login then redirect to login page
    if not session.get('username'):
        return redirect(url_for('home'))
    accounts = Account.query.add_columns(Account.id,Account.customer_id).all()
    formData['accounts'] = accounts
    formData['search_by'] = 1
    if request.method == "POST":
        # Search Account statement by search id
        last_transaction_number = request.form.get('last_transaction_number',None) 
        startdate = request.form.get('startdate',None)
        enddate = request.form.get('enddate',None)
        search_by = request.form.get('search_by',None)
        account_id = request.form.get('account_id',None)
        formData['search_by'] = search_by
        formData['account_id'] = account_id
        if search_by and int(search_by) == 1:            
            formData['last_transaction_number'] = last_transaction_number
            # search by last transaction number
            transaction_control = TransactionControl.query.filter_by(account_id=account_id).order_by(TransactionControl.created_at.desc()).limit(int(last_transaction_number))
            if transaction_control:                
                formData['account_transactions'] = transaction_control        
            else:
                flash("No transaction detail found in applied filter")
        elif search_by and int(search_by) == 2:            
            formData['startdate'] = startdate
            formData['enddate'] = enddate
            # search by last transaction number
            startdate_format = datetime.strptime(startdate+" 00:00:00",'%m/%d/%Y %H:%M:%S')            
            enddate_format = datetime.strptime(enddate+" 23:59:59",'%m/%d/%Y %H:%M:%S')
            print(enddate_format)
            if startdate_format <= enddate_format:
                transaction_control = TransactionControl.query.filter_by(account_id=account_id).filter(TransactionControl.created_at.between(startdate_format, enddate_format)).order_by(TransactionControl.created_at.desc()).all()
                if transaction_control:                
                    formData['account_transactions'] = transaction_control        
                else:
                    flash("No transaction detail found in applied filter")                
            else:
                flash("Statement not found if start date greater then end date")            
        else:
            flash("Something wents wrong, please contact devloper")            

        
    return render_template('account_statement.html',formData=formData)

@app.route('/excel-write-statement',methods=['GET','POST'])
def write_statement_into_excel():
    import numpy as np
    import pandas as pd
    from io import BytesIO
    from flask import send_file
    if not session.get('username'):
        return redirect(url_for('home'))   
    formData = dict()         
    if request.method == "POST":
        # Search Account statement by search id
        last_transaction_number = request.form.get('last_transaction_number',None) 
        startdate = request.form.get('startdate',None)
        enddate = request.form.get('enddate',None)
        search_by = request.form.get('search_by',None)
        account_id = request.form.get('account_id',None)
        formData['search_by'] = search_by
        formData['account_id'] = account_id
        if search_by and int(search_by) == 1:            
            formData['last_transaction_number'] = last_transaction_number
            # search by last transaction number
            transaction_controls = TransactionControl.query.filter_by(account_id=account_id).order_by(TransactionControl.created_at.desc()).limit(int(last_transaction_number))
            if transaction_controls:                
                formData['account_transactions'] = transaction_controls        
            else:
                flash("No transaction detail found in applied filter")
        elif search_by and int(search_by) == 2:            
            formData['startdate'] = startdate
            formData['enddate'] = enddate
            # search by last transaction number
            startdate_format = datetime.strptime(startdate+" 00:00:00",'%m/%d/%Y %H:%M:%S')            
            enddate_format = datetime.strptime(enddate+" 23:59:59",'%m/%d/%Y %H:%M:%S')            
            if startdate_format <= enddate_format:
                transaction_controls = TransactionControl.query.filter_by(account_id=account_id).filter(TransactionControl.created_at.between(startdate_format, enddate_format)).order_by(TransactionControl.created_at.desc()).all()
                if transaction_controls:                
                    formData['account_transactions'] = transaction_controls        
                else:
                    flash("No transaction detail found in applied filter") 
                    return redirect(url_for('account_statement'))               
            else:
                flash("Statement not found if start date greater then end date")   
                return redirect(url_for('account_statement'))         
        else:
            flash("Something wents wrong, please contact devloper")
            return redirect(url_for('account_statement'))
    else:
        return redirect(url_for('account_statement'))
    #create a random Pandas dataframe
    dataframe = pd.DataFrame()        
    iterate = 0
    for transaction_control in transaction_controls:
        dataframe.at[iterate,"Transaction Id"] = transaction_control.transaction_id
        dataframe.at[iterate,"Description"] = transaction_control.description
        dataframe.at[iterate,"Date(YYYY-MM-DD)"] = transaction_control.created_at
        dataframe.at[iterate,"Amount"] = transaction_control.amount
        iterate+=1
    #create an output stream
    output = BytesIO()
    writer = pd.ExcelWriter(output, engine='xlsxwriter')

    #taken from the original question
    dataframe.to_excel(writer, startrow = 0, merge_cells = False, sheet_name = "AccountSheet")
    workbook = writer.book
    worksheet = writer.sheets["AccountSheet"]
    format = workbook.add_format({'border':1,'align':'left','font_size':10})
    format.set_bg_color('#eeeeee')    
    #the writer has done its job
    writer.close()

    #go back to the beginning of the stream
    output.seek(0)

    #finally return the file
    return send_file(output, attachment_filename="account_statement.xlsx", as_attachment=True)