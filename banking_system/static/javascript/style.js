$(document).ready(function () {
    $('#dtBasicExample').DataTable();
    $('.dataTables_length').addClass('bs-select');
  });


// Change City Dropdown on a particular state
function change_city(element){
    var state_id = $(element).val();        
    $.ajax({
        url: '/ajax/change_state',
        data: {
        'state_id': state_id
        },
        type: 'POST',    
        success: function (data) {
            if(data.status){
                $('#city_id').html(data.data);
            }
        },
        error: function(error){
            console.log(error);
        }
    });
}

// Change delete customer record from ajax
function delete_customer(element){
    var customer_id = $('#customer_delete_id').val();        
    $.ajax({
        url: '/ajax/delete_customer',
        data: {
        'customer_id': customer_id
        },
        type: 'POST',    
        success: function (data) {
            if(data.status){
                window.location.href = data.url;
            }
        },
        error: function(error){
            console.log(error);
        }
    });
}

// Change delete account record from ajax
function delete_account(element){
    var account_id = $('#account_delete_id').val();        
    $.ajax({
        url: '/ajax/delete_account',
        data: {
        'account_id': account_id
        },
        type: 'POST',    
        success: function (data) {
            if(data.status){
                window.location.href = data.url;
            }
        },
        error: function(error){
            console.log(error);
        }
    });
}

//Check validation
function validate_cash_transaction(){
    var operation = $('#cash_action').val();    
    var enter_amount = $('#'+operation).val();
    var account_amount = $('#balance').val();    
    var error_status = false;    
    $('#amount_error').css('display','none');      
    if(enter_amount == ""){
        error_status = false;          
    }
    else if(!/^\d+$/.test(enter_amount)){
        error_status = false;
    }
    else if ((operation == 'withdraw_amount' || operation == 'transfer_amount') && (parseInt(enter_amount) <= 0 || parseInt(enter_amount) > parseInt(account_amount))) {                
        error_status = false;        
    } 
    else {
        error_status = true;
    }    
    if(error_status){
        $('#amount_error').css('display','none');
    }else{
        $('#amount_error').css('display','inline-block');
    }    
    return error_status;
}

function executeOperation(type,amount){
    /*  1 : withdraw
        2 : deposit
        3 : transfer - account_id manadatory 
        */
    var source_account_id = $('#source_account_id').val(); 
    var transfer_account_id = 0;
    if(parseInt(type) == 3){
        transfer_account_id = $('#transfer_account_id').val();
    }    
    loaderShow()
    $.ajax({
        url: '/ajax/transaction_control',
        data: {        
        'source_account_id' : source_account_id,
        'transaction_type' : type,
        'amount' : amount,
        'transfer_account_id' : transfer_account_id,
        },
        type: 'POST',    
        success: function (data) {
            hideLoader();
            if(data.status){
                window.location.href = data.url;
            }
        },
        error: function(error){
            hideLoader();
            console.log(error);
        }
    });
}

function loaderShow(){
    $('.content').css('filter','blur(4px)');
    $('#loader').show();
}
function hideLoader(){
    $('.content').css('filter','blur(0px)');
    $('#loader').hide();
}