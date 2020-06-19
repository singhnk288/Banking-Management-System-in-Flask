$(function() {

    "use strict";

    var messages = {
        'mandatory': 'This field is required.',
        'price': 'This field is required. Maximum length allowed - 16 digits. Expected format: 350.74.',
        'email': 'This field is required & must be a valid email address.',
        'passwd': 'This field is required. Minimum 5 characters with at least one Capital letter, one Special character and one Number.',
        'notRequiredPasswd': 'Minimum 5 characters with at least one Capital letter, one Special character and one Number.',
        'mobile': 'This field is required & must be having 10 digits only.',
        'numberssn' : 'This field is required & must be having 9 digits only.',
        'addressLine1': 'This field is required. Maximum length allowed - 255 characters.',
        'addressLine2': 'Maximum length allowed - 255 characters.',
        'digit': 'This field is required. Only Numeric values allowed.',
        'notRequiredDigit': 'Only Numeric values allowed.',
        'firstname': 'This field is required. Maximum length allowed - 60 characters.',
        'lastname': 'This field is required. Maximum length allowed - 60 characters.',
        'middlename': 'Maximum length allowed - 60 characters.',
        'requiredMin2Max60NoSpecial': 'This field is required & length should be between 2 to 60 with no special character.',
        'requiredip': 'Required field with expected IP format: XXX.XXX.XXX.XXX.',
        'optionalip': 'Invalid IP Format. Expected format: XXX.XXX.XXX.XXX.',
        'requiredimage': 'Required Field with allowed image types - gif, png, jpeg, jpg. Maximum size 2 MB.',
        'optionalimage': 'Allowed image types gif, png, jpeg, jpg. Maximum size 2 MB.',
        'requiredcharonly': 'This fields is required. Only alphabets allowed.',
        'optionalcharonly': 'Only alphabets allowed.',
        'barcode': 'Maximum length allowed - 255 characters. Special characters not allowed.',
        'ean': 'Maximum length allowed - 14 characters. Special characters not allowed.',
        'upc': 'Maximum length allowed - 12 characters. Special characters not allowed.',
        'size': 'Maximum length allowed - 10 characters. Special characters not allowed.',
        'requiredurl': 'This fields is required. Maximum length allowed - 255 characters. Expected format: http://www.example.com',
        'optionalurl': 'Maximum length allowed - 255 characters. Expected format: http://www.example.com',
        'carrier': 'Length should be between 3 to 255.',
        'brand': 'Length should be between 3 to 64.',
        'optionalcompany': 'Length should be between 3 to 32.',
        'requiredcompany': 'This field is required & length should be between 3 to 32.',
        'sku': 'Length should be between 3 to 64 and should not contain any special character.',
        'requiredmmddyy': 'This field is required. Expected format: mm/dd/yyyy or mm-dd-yyyy.',
        'optionalmmddyy': 'Expected format: mm/dd/yyyy or mm-dd-yyyy.',
        'requiredddmmyy': 'This field is required. Expected format: dd/mm/yyyy or dd-mm-yyyy.',
        'optionalddmmyy': 'Expected format: dd/mm/yyyy or dd-mm-yyyy.',
        'optionalpercentage': 'Allowed numbers between 0 and 100.',
        'requiredpercentage': 'This field is required. Allowed numbers between 0 and 100.',
        'checktags': 'This field must not have any script, iframe and style tag.',
        'checkhtmltags': 'This field must not have any HTML tags.',
        'requireddocs': 'This field is required. Maximum size 2MB.',
        'optionaldocs': 'Maximum size 2MB.',
        'requiredcolor': 'This field is required. Color Code in Hexadecimal format required. Example: #FFFFFF',
        'optionalcolor': 'Color Code in Hexadecimal format required. Example: #FFFFFF',
        'requiredMin1Max2': 'This field is required & length should be between 1 to 2.',
        'requiredMin10Max500': 'This field is required & length should be between 10 to 500.',
        'notRequiredMin10Max500': 'Length should be between 10 to 500.',
        'requiredMin2Max100': 'This field is required & length should be between 2 to 100.',
        'requiredMin1Max255': 'This field is required & length should be between 1 to 255.',
        'requiredMin2Max255': 'This field is required & length should be between 2 to 255.',
        'notRequiredMin1Max255': 'Length should be between 1 to 255.',
        'notRequiredMin2Max255': 'Length should be between 2 to 255.',
        'requiredMin2Max500': 'This field is required & length should be between 2 to 500.',
        'requiredMin2Max20': 'This field is required & length should be between 2 to 20.',
        'notRequiredMin2Max20': 'Length should be between 2 to 20.',
        'requiredMin2Max40': 'This field is required & length should be between 2 to 40.',
        'notRequiredMin2Max40': 'Length should be between 2 to 40.',
        'requiredMin2Max50': 'This field is required & length should be between 2 to 50.',
        'requiredMin3Max50': 'This field is required & length should be between 3 to 50.',
        'requiredMin1Max50': 'This field is required & length should be between 1 to 50.',
        'notRequiredMin1Max50': 'Length should be between 1 to 50.',
        'requiredMin5Max50NoSpecial': 'This field is required & length should be between 5 to 50 with no special character.',
        'requiredMin1Max10': 'This field is required & length should be between 1 to 10.',
        'requiredMin1Max7Decimal2': 'This field is required with max length of 7 & must be in format e.g. 350.74.',
        'notRequiredMin1Max7Decimal2': 'Maximum length of 7 & must be in format e.g. 350.74.',
        'notRequiredPrice': 'Maximum length of 16 & must be in price format e.g. 350.74.',
        'requiredMinValue0MaxValue100Decimal2': 'Required input between 0 to 100 & must be in format e.g. 45.74.',
        'notRequiredMinValue0MaxValue100Decimal2': 'Value should be between 0 to 99 & must be in format e.g. 45.74.',
        'pincode': 'This field is required & must be having 6 digits only.',
        'notRequiredPincode': 'This field must be having 6 digits only.',
        'requiredGSTIN': 'This field is required & must contain 15 alphanumeric characters.',
        'notRequiredGSTIN': 'This field should contain 15 alphanumeric characters.',
        'panNo': 'This field is required & must contain 10 alphanumeric characters.',
        'confirmPasswd': 'Password and Confirm Password do not match.',
        'notRequiredMobile': 'This field is required & must be having 10 digits only.',
        'multipleContact': 'This field is required and allow comma separated contact numbers with only +, -.',
        'notRequiredMultipleContact': 'This field allows comma separated contact numbers with only +, -.',
        'singleContact': 'This field is required and allow single contact number with only - and +.',
        'notRequiredSingleContact': 'This field allows single contact number with only - and +.',
        'optionaldocsMax5MB': 'Document type should be docx, pdf, xlsx, png, jpeg or jpg & should not exceed 5 MB in size.',
        'requiredExcel': 'This field is required and document type should be xls or xlsx.',
        'requiredMin1Max3': 'This field is required & length should be between 1 to 3.',
        'notRequiredEmail': 'Input must be a valid email address.',
        'multipleEmail': 'This field is required & must be comma-separated email address(es).',
        'notRequiredMultipleEmail': 'Input must be comma-separated email address(es).',
        'requiredMin2Max555': 'This field is required & length should be between 2 to 555.',
        'notRequiredMin2Max555': 'Length should be between 2 to 555.',
        'requiredMin2Max255AlphaNumeric': 'This field is required & length should be between 2 to 255 and Alphanumeric',
        'notRequiredMin2Max255AlphaNumeric': 'Input must be between 2 to 255 and Alphanumeric.',
        'multipleSacNumber': 'This field is required and allow comma separated numbers with only comma (,) .',
        'requiredMin1Max3AlphaNumeric': 'This field is required & length should be between 1 to 3 characters.Only alphabets allowed.',
        'requiredMin2Max50AlphaNumeric': 'This field is required & length should be between 2 to 50 and Alphanumeric',
        'notRequiredMin2Max50AlphaNumeric': 'Input must be between 2 to 50 and Alphanumeric.',
        'requiredMin1Max150': 'This field is required & length should be between 1 to 150.',
        'notRequiredMin1Max150': 'Length should be between 1 to 150.',
        'requiredMin10Max1500': 'This field is required & length should be between 10 to 1500.',
        'notRequiredMin10Max1500': 'Length should be between 10 to 1500.',
        'notRequiredConfirmPasswd': 'Password and Confirm Password do not match.',
        'requiredMin2Max3': 'This field is required and only character allowed, length should be between 2 to 3.',        
        'requiredMinName2Max50': 'This field is required & only character allowed, length should be between 2 to 50.',
        'requiredAge' : 'This field is required, only digit and number should be between 1 to 150.',
        'requiredSearch' : 'Please fill either customer id or account id first and only digit allowed',
        'requiredCustomerSearch' : 'Please fill either customer id or ssn id, only digit allowed',        
    };

    //Add New Method for - Digits + Only Number
    jQuery.validator.addMethod("requiredCustomerSearch", function(value, element) {        
        var customer_id = $('#customer_id').val();
        var ssn_id = $('#ssn_id').val();
        if (ssn_id == "" && customer_id == "") {
            return false;
        } else if ((ssn_id != "" && !/^\d+$/.test(ssn_id)) || 
                (customer_id != "" && !/^\d+$/.test(customer_id))) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredCustomerSearch);
    
    //Add New Method for - Digits + Only Number
    jQuery.validator.addMethod("requiredSearch", function(value, element) {
        var account_id = $('#account_id').val();
        var customer_id = $('#customer_id').val();
        if (account_id == "" && customer_id == "") {
            return false;
        } else if ((account_id != "" && !/^\d+$/.test(account_id)) || 
                (customer_id != "" && !/^\d+$/.test(customer_id))) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredSearch);
    
    //Add New Method for - Mandatory + Minimum Length 3 + Maximum Length 3 + Only alphabets allowed
    jQuery.validator.addMethod("requiredMin1Max3AlphaNumeric", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 1 || $.trim(value).length > 3 || !/^[a-z]+$/i.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin1Max3AlphaNumeric);

    //Add New Method for Multiple Contact Nos. - Mandatory + Minimum Length 2 + Maximum Length 255 + Comma Separated Nos (Only contains numbers , and space)
    jQuery.validator.addMethod("multipleSacNumber", function(value, element) {
        if ($.trim(value) == "" || !/^([0-9]{1,15})(, [0-9]{1,15})*$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.multipleSacNumber);

    //Add New Method for -  - Mandatory + Minimum Length 2 characters + Maximum Length 255 Characters + Alphanumeric + No Special Character
    jQuery.validator.addMethod("requiredMin2Max255AlphaNumeric", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 255 || !/^[a-zA-Z0-9]+$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin2Max255AlphaNumeric);
    //Add New Method for -  - Mandatory + Minimum Length 2 characters + Maximum Length 255 Characters + Alphanumeric + No Special Character
    jQuery.validator.addMethod("notRequiredMin2Max255AlphaNumeric", function(value, element) {
        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && ($.trim(value).length < 2 || $.trim(value).length > 255 || !/^[a-zA-Z0-9]+$/.test(value))) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredMin2Max255AlphaNumeric);

    //Add New Method for -  - Mandatory + Minimum Length 2 characters + Maximum Length 50 Characters + Alphanumeric + No Special Character
    jQuery.validator.addMethod("requiredMin2Max50AlphaNumeric", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 50 || !/^[a-zA-Z0-9]+$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin2Max50AlphaNumeric);
    //Add New Method for -  - Not Mandatory + Minimum Length 2 characters + Maximum Length 50 Characters + Alphanumeric + No Special Character
    jQuery.validator.addMethod("notRequiredMin2Max50AlphaNumeric", function(value, element) {
        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && ($.trim(value).length < 2 || $.trim(value).length > 50 || !/^[a-zA-Z0-9]+$/.test(value))) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredMin2Max50AlphaNumeric);

    //Add New Method for - Price - Mandatory + Minimum Length 1 + Maximum Length 16 (Including Decimal Dot & 2 decimal values)
    jQuery.validator.addMethod("price", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 1 || $.trim(value).length > 16 || !/^\d{0,16}(\.\d{0,2})?$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.price);


    //Add New Method for - Email - Mandatory + Email Validation
    jQuery.validator.addMethod("email", function(value, element) {
        if ($.trim(value) == "" || !/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.email);

    //Add New Method for - Password - Mandatory + Minimum Length 5 + Maximum Length 50 + At least one Capital Letter + At least one Special Character + At least one Number
    jQuery.validator.addMethod("passwd", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 5 || $.trim(value).length > 50 || !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{5,50}/.test(value)) {
            return false;
        } else {
            if (/[A-Z]/.test(value) == true) {
                return true;
            } else {
                return false;
            }
        }
    }, messages.passwd);            

    //Add New Method for - Password Edit - Optional + Minimum Length 5 + Maximum Length 50 + At least one Capital Letter + At least one Special Character + At least one Number
    jQuery.validator.addMethod("notRequiredPasswd", function(value, element) {
        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && ($.trim(value).length < 5 || $.trim(value).length > 50 || !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{5,50}/.test(value))) {
            return false;
        } else {
            if (/[A-Z]/.test(value) == true) {
                return true;
            } else {
                return false;
            }
        }
    }, messages.notRequiredPasswd);

    //Add New Method for - Mobile No. - Mandatory + Number + Total Length 10
    jQuery.validator.addMethod("mobile", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length != 10 || !/^\d{10}?$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.mobile);

    //Add New Method for - Mobile No. - Mandatory + Number + Total Length 10
    jQuery.validator.addMethod("numberssn", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length != 9 || !/^\d{9}?$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.numberssn);


    //Add New Method for - Address Line 1 - Mandatory + Minimum Length 2 + Maximum Length 255
    jQuery.validator.addMethod("addressLine1", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 255) {
            return false;
        } else {
            return true;
        }
    }, messages.addressLine1);

    //Add New Method for - Address Line 2 - Optional + Minimum Length 2 + Maximum Length 255
    jQuery.validator.addMethod("addressLine2", function(value, element) {
        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && ($.trim(value).length < 2 || $.trim(value).length > 255)) {
            return false;
        } else {
            return true;
        }
    }, messages.addressLine2);

    //Add New Method for - Digits - Mandatory + Only Number
    jQuery.validator.addMethod("digit", function(value, element) {
        if ($.trim(value) == "" || !/^\d+$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.digit);

    //Add New Method for - Digits - Optional + Only Number
    jQuery.validator.addMethod("notRequiredDigit", function(value, element) {
        if ($.trim(value) == "") {
            return true;
        } else if (!/^\d+$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredDigit);


    //Add New Method for - Mandatory
    jQuery.validator.addMethod("mandatory", function(value, element) {
        if ($.trim(value) == "") {
            return false;
        } else {
            return true;
        }
    }, messages.mandatory);

    //Add New Method for - Mandatory + Minimum Length 1 + Maximum Length 60
    jQuery.validator.addMethod("firstname", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 1 || $.trim(value).length > 60) {
            return false;
        } else {
            return true;
        }
    }, messages.firstname);

    //Add New Method for - Mandatory + Minimum Length 1 + Maximum Length 60
    jQuery.validator.addMethod("lastname", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 1 || $.trim(value).length > 60) {
            return false;
        } else {
            return true;
        }
    }, messages.lastname);

    //Add New Method for - Optional + Minimum Length 1 + Maximum Length 60
    jQuery.validator.addMethod("middlename", function(value, element) {
        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && ($.trim(value).length < 1 || $.trim(value).length > 60)) {
            return false;
        } else {
            return true;
        }
    }, messages.middlename);

    //Add New Method for - Mandatory + Minimum Length 2 + Maximum Length 60 + No Special Character
    jQuery.validator.addMethod("requiredMin2Max60NoSpecial", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 60 || !/^[a-zA-Z0-9]+$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin2Max60NoSpecial);

    //Add New Method for - Mandatory + IP
    jQuery.validator.addMethod("requiredip", function(value, element) {
        //var testip = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
        var testip4 = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        //		var testip6 = ^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$;

        if ($.trim(value) == "" || !value.match(testip4)) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredip);

    //Add New Method for - Optional + IP
    jQuery.validator.addMethod("optionalip", function(value, element) {

        var testip = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if ($.trim(value) == "" || !value.match(testip)) {
            return false;
        } else {
            return true;
        }
    }, messages.optionalip);

    //Add New Method for - Mandatory + Image(gif, png,jpeg,jpg) + Maximum size 2 MB
    jQuery.validator.addMethod("requiredimage", function(value, element) {
        if ($.trim(value) != "") {
            var Extension = value.substring(value.lastIndexOf('.') + 1).toLowerCase();
            var jquery_object = jQuery(element);
            if (Extension == "jpeg" || Extension == "JPEG" || Extension == "png" || Extension == "jpg" || Extension == "gif") {
                if (jquery_object.prop("files")[0].size > 2097152) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }, messages.requiredimage);

    //Add New Method for - Optional + Image(gif, png,jpeg,jpg) + Maximum size 2 MB
    jQuery.validator.addMethod("optionalimage", function(value, element) {
        if ($.trim(value) != "") {
            var Extension = value.substring(value.lastIndexOf('.') + 1).toLowerCase();
            var jquery_object = jQuery(element);
            if (Extension == "jpeg" || Extension == "JPEG" || Extension == "png" || Extension == "jpg" || Extension == "gif") {
                if (jquery_object.prop("files")[0].size > 2097152) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else {
            return true;
        }
    }, messages.optionalimage);

    //Add New Method for - Madatory + Albhabets only
    jQuery.validator.addMethod("requiredcharonly", function(value, element) {
        if ($.trim(value) == "" || !/^[a-z]+$/i.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredcharonly);

    //Add New Method for - optional + Albhabets only
    jQuery.validator.addMethod("optionalcharonly", function(value, element) {
        if ($.trim(value) != "") {
            if (!/^[a-z]+$/i.test(value)) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }

    }, messages.optionalcharonly);

    //Add New Method for - optional + No speical character + Minimum Length 2 + Maximum Length 255
    jQuery.validator.addMethod("barcode", function(value, element) {
        if ($.trim(value) != "") {
            if ($.trim(value).length < 2 || $.trim(value).length > 255) {
                return false;
            } else {
                if (/^[ A-Za-z0-9_+./#-]*$/.test(value)) {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return true;
        }
    }, messages.barcode);

    //Add New Method for - optional + No speical character + Minimum Length 2 + Maximum Length 255
    jQuery.validator.addMethod("ean", function(value, element) {
        if ($.trim(value) != "") {
            if ($.trim(value).length < 2 || $.trim(value).length > 14) {
                return false;
            } else {
                if (/^[ A-Za-z0-9_+./#-]*$/.test(value)) {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return true;
        }
    }, messages.ean);

    //Add New Method for - optional + No speical character +  Minimum Length 2 + Maximum Length 12
    jQuery.validator.addMethod("upc", function(value, element) {
        if ($.trim(value) != "") {
            if ($.trim(value).length < 2 || $.trim(value).length > 12) {
                return false;
            } else {
                if (/^[ A-Za-z0-9_+./#-]*$/.test(value)) {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return true;
        }
    }, messages.upc);

    //Add New Method for - optional + No speical character +  Minimum Length 1 + Maximum Length 10
    jQuery.validator.addMethod("size", function(value, element) {
        if ($.trim(value) != "") {
            if ($.trim(value).length < 1 || $.trim(value).length > 10) {
                return false;
            } else {
                if (/^[ A-Za-z0-9_+./#-]*$/.test(value)) {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return true;
        }
    }, messages.size);

    //Add New Method for - Mandatory + URL +  Minimum Length 5 + Maximum Length 2083
    jQuery.validator.addMethod("requiredurl", function(value, element) {
        if ($.trim(value) != "") {
            if ($.trim(value).length < 5 || $.trim(value).length > 2083) {
                return false;
            } else {
                var res = value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
                if (res == null)
                    return false;
                else
                    return true;
            }
        } else {
            return false;
        }
    }, messages.requiredurl);

    //Add New Method for - Optional + URL +  Minimum Length 5 + Maximum Length 2083
    jQuery.validator.addMethod("optionalurl", function(value, element) {
        if ($.trim(value) != "") {
            if ($.trim(value).length < 5 || $.trim(value).length > 2083) {
                return false;
            } else {
                var res = value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
                if (res == null)
                    return false;
                else
                    return true;
            }
        } else {
            return true;
        }
    }, messages.optionalurl);

    //Add New Method for - optional +  Minimum Length 2 + Maximum Length 255
    jQuery.validator.addMethod("carrier", function(value, element) {
        if ($.trim(value) != "") {
            if ($.trim(value).length < 2 || $.trim(value).length > 255) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }, messages.carrier);

    //Add New Method for - optional +  Minimum Length 2 + Maximum Length 64
    jQuery.validator.addMethod("brand", function(value, element) {
        if ($.trim(value) != "") {
            if ($.trim(value).length < 2 || $.trim(value).length > 64) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }, messages.brand);

    //Add New Method for - optional +  Minimum Length 2 + Maximum Length 32
    jQuery.validator.addMethod("optionalcompany", function(value, element) {
        if ($.trim(value) != "") {
            if ($.trim(value).length < 2 || $.trim(value).length > 32) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }, messages.optionalcompany);

    //Add New Method for - Mandatory +  Minimum Length 2 + Maximum Length 32
    jQuery.validator.addMethod("requiredcompany", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 32) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredcompany);

    //Add New Method for - optional + No speical character + Minimum Length 2 + Maximum Length 64
    jQuery.validator.addMethod("sku", function(value, element) {
        if ($.trim(value) != "") {
            if ($.trim(value).length < 2 || $.trim(value).length > 64) {
                return false;
            } else {
                if (/^[ A-Za-z0-9_+./#-]*$/.test(value)) {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return true;
        }
    }, messages.sku);

    //Add New Method for - Mandatory + date in mmddyy format
    jQuery.validator.addMethod("requiredmmddyy", function(value, element) {
        if ($.trim(value) != "") {
            var dateformat = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
            var val = $.trim(value);
            if (val != '') {
                if (val.match(dateformat)) {
                    var opera1 = val.split('/');
                    var opera2 = val.split('-');
                    var lopera1 = opera1.length;
                    var lopera2 = opera2.length;
                    // Extract the string into month, date and year  
                    if (lopera1 > 1) {
                        var pdate = val.split('/');
                    } else if (lopera2 > 1) {
                        var pdate = val.split('-');
                    }
                    var mm = parseInt(pdate[0]);
                    var dd = parseInt(pdate[1]);
                    var yy = parseInt(pdate[2]);
                    if (yy < 1970) {
                        return false;
                    }
                    // Create list of days of a month [assume there is no leap year by default]  
                    var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                    if (mm == 1 || mm > 2) {
                        if (dd > ListofDays[mm - 1]) {
                            return false;
                        }
                    }
                    if (mm == 2) {
                        var lyear = false;
                        if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                            lyear = true;
                        }
                        if ((lyear == false) && (dd >= 29)) {
                            return false;
                        }
                        if ((lyear == true) && (dd > 29)) {
                            return false;
                        }
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
            return true;
        } else {
            return false;
        }
    }, messages.requiredmmddyy);

    //Add New Method for - Optional + date in mmddyy format
    jQuery.validator.addMethod("optionalmmddyy", function(value, element) {
        if ($.trim(value) != "") {
            var dateformat = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
            var return_val = true;
            var val = $.trim(value);
            if (val != '') {
                if (val.match(dateformat)) {
                    var opera1 = val.split('/');
                    var opera2 = val.split('-');
                    var lopera1 = opera1.length;
                    var lopera2 = opera2.length;
                    // Extract the string into month, date and year  
                    if (lopera1 > 1) {
                        var pdate = val.split('/');
                    } else if (lopera2 > 1) {
                        var pdate = val.split('-');
                    }
                    var mm = parseInt(pdate[0]);
                    var dd = parseInt(pdate[1]);
                    var yy = parseInt(pdate[2]);
                    if (yy < 1970) {
                        return false;
                    }
                    // Create list of days of a month [assume there is no leap year by default]  
                    var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                    if (mm == 1 || mm > 2) {
                        if (dd > ListofDays[mm - 1]) {
                            return false;
                        }
                    }
                    if (mm == 2) {
                        var lyear = false;
                        if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                            lyear = true;
                        }
                        if ((lyear == false) && (dd >= 29)) {
                            return false;
                        }
                        if ((lyear == true) && (dd > 29)) {
                            return false;
                        }
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
            return true;
        } else {
            return true;
        }
    }, messages.optionalmmddyy);

    //Add New Method for - Mandatory + date in ddmmyy format
    jQuery.validator.addMethod("requiredddmmyy", function(value, element) {
        if ($.trim(value) != "") {

            var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
            var return_val = true;
            var val = $.trim(value);
            if (val != '') {
                if (val.match(dateformat)) {
                    var opera1 = val.split('/');
                    var opera2 = val.split('-');
                    var lopera1 = opera1.length;
                    var lopera2 = opera2.length;
                    if (lopera1 > 1) {
                        var pdate = val.split('/');
                    } else if (lopera2 > 1) {
                        var pdate = val.split('-');
                    }
                    var dd = parseInt(pdate[0]);
                    var mm = parseInt(pdate[1]);
                    var yy = parseInt(pdate[2]);
                    if (yy < 1970) {
                        return false;
                    }
                    var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                    if (mm == 1 || mm > 2) {
                        if (dd > ListofDays[mm - 1]) {
                            return false;
                        }
                    }
                    if (mm == 2) {
                        var lyear = false;
                        if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                            lyear = true;
                        }
                        if ((lyear == false) && (dd >= 29)) {
                            return_val = velovalidation.error('invalid_date');
                        }
                        if ((lyear == true) && (dd > 29)) {
                            return false;
                        }
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
            return true;;
        } else {
            return false;
        }
    }, messages.requiredddmmyy);

    //Add New Method for - Optional + date in ddmmyy format
    jQuery.validator.addMethod("optionalddmmyy", function(value, element) {
        if ($.trim(value) != "") {

            var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
            var return_val = true;
            var val = $.trim(value);
            if (val != '') {
                if (val.match(dateformat)) {
                    var opera1 = val.split('/');
                    var opera2 = val.split('-');
                    var lopera1 = opera1.length;
                    var lopera2 = opera2.length;
                    if (lopera1 > 1) {
                        var pdate = val.split('/');
                    } else if (lopera2 > 1) {
                        var pdate = val.split('-');
                    }
                    var dd = parseInt(pdate[0]);
                    var mm = parseInt(pdate[1]);
                    var yy = parseInt(pdate[2]);
                    if (yy < 1970) {
                        return false;
                    }
                    var ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                    if (mm == 1 || mm > 2) {
                        if (dd > ListofDays[mm - 1]) {
                            return false;
                        }
                    }
                    if (mm == 2) {
                        var lyear = false;
                        if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                            lyear = true;
                        }
                        if ((lyear == false) && (dd >= 29)) {
                            return_val = velovalidation.error('invalid_date');
                        }
                        if ((lyear == true) && (dd > 29)) {
                            return false;
                        }
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
            return true;;
        } else {
            return true;
        }
    }, messages.optionalddmmyy);

    //Add New Method for - Optioanl + number only + between 0 and 100
    jQuery.validator.addMethod("optionalpercentage", function(value, element) {
        if ($.trim(value) != "") {
            if (!value.match(/^-?\d*(\.\d+)?$/)) {
                return false;
            } else if (value < 0 || value > 100) {
                return false;
            }
            return true;
        } else {
            return true;
        }
    }, messages.optionalpercentage);

    //Add New Method for - Mandatory + number only + between 0 and 100
    jQuery.validator.addMethod("requiredpercentage", function(value, element) {
        if ($.trim(value) != "") {
            if (!value.match(/^-?\d*(\.\d+)?$/)) {
                return false;
            } else if (value < 0 || value > 100) {
                return false;
            }
            return true;
        } else {
            return false;
        }
    }, messages.requiredpercentage);

    //Add New Method for - No iframe tags + no script tags + no style tags
    jQuery.validator.addMethod("checktags", function(value, element) {
        if ($.trim(value) != "") {
            var script_regex = /(<script[\s\S]*?>[\s\S]*?<\/script>)|(<script[\s\S]*?>)|([\s\S]*?<\/script>)/i;
            var style_regex = /(<style[\s\S]*?>[\s\S]*?<\/style>)|(<style[\s\S]*?>)|([\s\S]*?<\/style>)/i;
            var iframe_regex = /(<iframe[\s\S]*?>[\s\S]*?<\/iframe>)|(<iframe[\s\S]*?>)|([\s\S]*?<\/iframe>)/i;
            if (script_regex.test($.trim(value))) {
                return false;
            } else if (style_regex.test($.trim(value))) {
                return false;
            } else if (iframe_regex.test($.trim(value))) {
                return false;
            }
            return true;
        } else {
            return true;
        }
    }, messages.checktags);

    //Add New Method for - No html tags
    jQuery.validator.addMethod("checkhtmltags", function(value, element) {
        if ($.trim(value) != "") {
            if (value.match(/([\<])([^\>]{1,})*([\>])/i)) {
                return false;
            }
            return true;
        } else {
            return true;
        }
    }, messages.checkhtmltags);

    //Add New Method for - Mandatory + docs(gif, png,jpeg,jpg, docx, ppt, xlsx etc) + Maximum size 2 MB
    jQuery.validator.addMethod("requireddocs", function(value, element) {
        if ($.trim(value) != "") {
            var jquery_object = jQuery(element);
            var Extension = value.substring(value.lastIndexOf('.') + 1).toLowerCase();
            if (Extension == "jpeg" || Extension == "JPEG" || Extension == "png" || Extension == "jpg" || Extension == "gif" ||
                Extension == "docx" || Extension == "ppt" || Extension == "xlsx") {
                if (jquery_object.prop("files")[0].size > 2097152) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }, messages.requireddocs);

    //Add New Method for - Optional + docs(gif, png,jpeg,jpg, docx, ppt, xlsx etc) + Maximum size 2 MB
    jQuery.validator.addMethod("optionaldocs", function(value, element) {
        if ($.trim(value) != "") {
            var Extension = value.substring(value.lastIndexOf('.') + 1).toLowerCase();
            var jquery_object = jQuery(element);
            if (Extension == "jpeg" || Extension == "JPEG" || Extension == "png" || Extension == "jpg" || Extension == "gif" ||
                Extension == "docx" || Extension == "ppt" || Extension == "xlsx") {
                if (jquery_object.prop("files")[0].size > 2097152) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        } else {
            return true;
        }
    }, messages.optionaldocs);

    //Add New Method for - Mandatory + color only
    jQuery.validator.addMethod("requiredcolor", function(value, element) {
        value = $.trim(value);
        if (value != '') {
            var firstchar = value.charAt(0);
            value = value.substr(1);
            if (firstchar != '#') {
                return false;
            }
            var myRegExp = /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i;
            if (!myRegExp.test(value)) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }, messages.requiredcolor);

    //Add New Method for - Optional + color only
    jQuery.validator.addMethod("optionalcolor", function(value, element) {
        value = $.trim(value);
        if (value != '') {
            var firstchar = value.charAt(0);
            value = value.substr(1);
            if (firstchar != '#') {
                return false;
            }
            var myRegExp = /(^[0-9A-F]{6}$)|(^[0-9A-F]{3}$)/i;
            if (!myRegExp.test(value)) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }, messages.optionalcolor);

    //Custom Validation Rules

    //Add New Method for - Mandatory + Minimum Length 1 + Maximum Length 2
    jQuery.validator.addMethod("requiredMin1Max2", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 1 || $.trim(value).length > 2) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin1Max2);

    //Add New Method for - Mandatory + Minimum Length 10 + Maximum Length 500
    jQuery.validator.addMethod("requiredMin10Max500", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 10 || $.trim(value).length > 500) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin10Max500);

    //Add New Method for - Optional + Minimum Length 10 + Maximum Length 500
    jQuery.validator.addMethod("notRequiredMin10Max500", function(value, element) {
        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && ($.trim(value).length < 10 || $.trim(value).length > 500)) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredMin10Max500);    

    //Add New Method for - Required + Minimum Length 2 + Maximum Length 3
    jQuery.validator.addMethod("requiredMin2Max3", function(value, element) {
        if ($.trim(value) != "" && ($.trim(value).length < 2 || $.trim(value).length > 3) || !/^[a-zA-Z]{2,3}$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin2Max3);   
    
    //Add New Method for - Required + Minimum Length 2 + Maximum Length 3
    jQuery.validator.addMethod("requiredMinName2Max50", function(value, element) {
        if ($.trim(value) != "" && ($.trim(value).length < 2 || $.trim(value).length > 50) || !/^[a-z A-Z]{2,50}$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMinName2Max50);  

    //Add New Method for - Mandatory + Minimum Length 2 + Maximum Length 555
    jQuery.validator.addMethod("requiredMin2Max555", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 555) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin2Max555);

    //Add New Method for - Optional + Minimum Length 2 + Maximum Length 555
    jQuery.validator.addMethod("notRequiredMin2Max555", function(value, element) {
        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && ($.trim(value).length < 2 || $.trim(value).length > 555)) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredMin2Max555);

    //Add New Method for - Mandatory + Minimum Length 2 + Maximum Length 100
    jQuery.validator.addMethod("requiredMin2Max100", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 100) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin2Max100);

    //Add New Method for - Mandatory + Minimum Length 2 + Maximum Length 255
    jQuery.validator.addMethod("requiredMin2Max255", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 255) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin2Max255);

    //Add New Method for - Optional + Minimum Length 2 + Maximum Length 255
    jQuery.validator.addMethod("notRequiredMin2Max255", function(value, element) {
        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && ($.trim(value).length < 2 || $.trim(value).length > 255)) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredMin2Max255);

    //Add New Method for - Mandatory + Minimum Length 1 + Maximum Length 255
    jQuery.validator.addMethod("requiredMin1Max255", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 1 || $.trim(value).length > 255) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin1Max255);

    //Add New Method for - Optional + Minimum Length 1 + Maximum Length 255
    jQuery.validator.addMethod("notRequiredMin1Max255", function(value, element) {
        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && ($.trim(value).length < 1 || $.trim(value).length > 255)) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredMin1Max255);

    //Add New Method for - Mandatory + Minimum Length 2 + Maximum Length 500
    jQuery.validator.addMethod("requiredMin2Max500", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 500) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin2Max500);

    //Add New Method for - Mandatory + Minimum Length 2 + Maximum Length 20
    jQuery.validator.addMethod("requiredMin2Max20", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 20) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin2Max20);

    //Add New Method for - Optional + Minimum Length 2 + Maximum Length 20
    jQuery.validator.addMethod("notRequiredMin2Max20", function(value, element) {
        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && ($.trim(value).length < 2 || $.trim(value).length > 20)) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredMin2Max20);

    //Add New Method for - Mandatory + Minimum Length 2 + Maximum Length 40
    jQuery.validator.addMethod("requiredMin2Max40", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 40) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin2Max40);

    //Add New Method for - Optional + Minimum Length 2 + Maximum Length 40
    jQuery.validator.addMethod("notRequiredMin2Max40", function(value, element) {
        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && ($.trim(value).length < 2 || $.trim(value).length > 40)) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredMin2Max40);

    //Add New Method for - Mandatory + Minimum Length 2 + Maximum Length 50
    jQuery.validator.addMethod("requiredMin2Max50", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 2 || $.trim(value).length > 50) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin2Max50);

    //Add New Method for - Mandatory + Minimum Length 3 + Maximum Length 50
    jQuery.validator.addMethod("requiredMin3Max50", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 3 || $.trim(value).length > 50) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin3Max50);

    //Add New Method for - Mandatory + Minimum Length 1 + Maximum Length 50
    jQuery.validator.addMethod("requiredMin1Max50", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 1 || $.trim(value).length > 50) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin1Max50);

    //Add New Method for - Optional + Minimum Length 1 + Maximum Length 50
    jQuery.validator.addMethod("notRequiredMin1Max50", function(value, element) {
        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value).length < 1 || $.trim(value).length > 50) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredMin1Max50);

    //Add New Method for - Mandatory + Minimum Length 5 + Maximum Length 50 + No Special Character
    jQuery.validator.addMethod("requiredMin5Max50NoSpecial", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 5 || $.trim(value).length > 50 || !/^[a-zA-Z0-9]+$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin5Max50NoSpecial);

    //Add New Method for - Mandatory + Minimum Length 1 + Maximum Length 10
    jQuery.validator.addMethod("requiredMin1Max10", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 1 || $.trim(value).length > 10) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin1Max10);

    //Add New Method for - Mandatory + Minimum Length 1 + Maximum Length 7 (Including Decimal Dot & 2 decimal values)
    jQuery.validator.addMethod("requiredMin1Max7Decimal2", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 1 || $.trim(value).length > 7 || !/^\d{0,4}(\.\d{0,2})?$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin1Max7Decimal2);

    //Add New Method for - Optional + Minimum Length 1 + Maximum Length 7 (Including Decimal Dot & 2 decimal values)
    jQuery.validator.addMethod("notRequiredMin1Max7Decimal2", function(value, element) {
        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value).length < 1 || $.trim(value).length > 7 || !/^\d{0,4}(\.\d{0,2})?$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredMin1Max7Decimal2);

    //Add New Method for - Price - Optional + Minimum Length 1 + Maximum Length 16 (Including Decimal Dot & 2 decimal values)
    jQuery.validator.addMethod("notRequiredPrice", function(value, element) {
        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value).length < 1 || $.trim(value).length > 16 || !/^\d{0,13}(\.\d{0,2})?$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredPrice);

    //Add New Method for - Mandatory + Minimum Value 0 + Maximum Value 100 + Decimal Dot & 2 Decimal Values (Optional)
    jQuery.validator.addMethod("requiredMinValue0MaxValue100Decimal2", function(value, element) {
        if ($.trim(value) == "" || $.trim(value) < 0 || $.trim(value) > 100 || !/^\d{0,3}(\.\d{0,2})?$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMinValue0MaxValue100Decimal2);

    //Add New Method for - Optional + Minimum Value 0 + Maximum Value 100 + Decimal Dot & 2 Decimal Values (Optional)
    jQuery.validator.addMethod("notRequiredMinValue0MaxValue100Decimal2", function(value, element) {
        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) < 0 || $.trim(value) > 100 || !/^\d{0,3}(\.\d{0,2})?$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredMinValue0MaxValue100Decimal2);

    //Add New Method for - Pincode - Mandatory + Only Numbers + Total Length 6
    jQuery.validator.addMethod("pincode", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length != 6 || !/^[1-9][0-9]{5}$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.pincode);

    //Add New Method for - Pincode - Optional + Only Numbers + Total Length 6
    jQuery.validator.addMethod("notRequiredPincode", function(value, element) {
        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value).length != 6 || !/^[1-9][0-9]{5}$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredPincode);

    //Add New Method for - GSTIN - Mandatory + Total Length 15 + Alphanumeric + No Special Character
    jQuery.validator.addMethod("requiredGSTIN", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length != 15 || !/^[a-zA-Z0-9]+$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredGSTIN);

    //Add New Method for - GSTIN - Optional + Total Length 15 + Alphanumeric + No Special Character
    jQuery.validator.addMethod("notRequiredGSTIN", function(value, element) {
        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && ($.trim(value).length != 15 || !/^[a-zA-Z0-9]+$/.test(value))) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredGSTIN);

    //Add New Method for - PANNo. - Mandatory + Total Length 10 + Alphanumeric + No Special Character
    jQuery.validator.addMethod("panNo", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length != 10 || !/^[a-zA-Z0-9]+$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.panNo);

    //Add New Method for - Password Match - Password = Confirm Password
    jQuery.validator.addMethod("confirmPasswd", function(value, element) {
        var password = $("#password").val();
        if ($.trim(value) != $.trim(password)) {
            return false;
        } else {
            return true;
        }
    }, messages.confirmPasswd);

    // Not Required Confirm Password : Only valid if password have some value
    //Add New Method for - Password - Mandatory + Minimum Length 5 + Maximum Length 50 + At least one Capital Letter + At least one Special Character + At least one Number
    jQuery.validator.addMethod("notRequiredConfirmPasswd", function(value, element) {
        var password = $("#password").val();
        console.log($.trim(value));
        console.log($.trim(password));
        if ($.trim(password) != '' && $.trim(value) != $.trim(password)) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredConfirmPasswd);

    //Add New Method for - Mobile No. - Optional + Number + Total Length 10
    jQuery.validator.addMethod("notRequiredMobile", function(value, element) {
        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value).length != 10 || !/^\d{10}?$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredMobile);

    //Add New Method for Multiple Contact Nos. - Mandatory + Minimum Length 2 + Maximum Length 255 + Comma Separated Contact Nos (Only contains numbers, +, - and space)
    jQuery.validator.addMethod("multipleContact", function(value, element) {
        if ($.trim(value) == "" || !/^([0-9-+]{1,15})(, [0-9-+]{1,15})*$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.multipleContact);

    //Add New Method for Multiple Contact Nos. - Optional + Minimum Length 2 + Maximum Length 255 + Comma Separated Contact Nos (Only contains numbers, +, - and space)
    jQuery.validator.addMethod("notRequiredMultipleContact", function(value, element) {
        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && (!/^([0-9-+]{1,15})(, [0-9-+]{1,15})*$/.test(value))) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredMultipleContact);

    //Add New Method for Single Contact Nos. - Mandatory + Minimum Length 2 + Maximum Length 255 + Comma Separated Contact Nos (Only contains numbers, +, - and space)
    jQuery.validator.addMethod("singleContact", function(value, element) {
        if ($.trim(value) == "" || !/^([0-9-+]{1,15})$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.singleContact);

    //Add New Method for Single Contact Nos. - Optional + Minimum Length 2 + Maximum Length 255 + Comma Separated Contact Nos (Only contains numbers, +, - and space)
    jQuery.validator.addMethod("notRequiredSingleContact", function(value, element) {
        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && (!/^([0-9-+]{1,15})$/.test(value))) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredSingleContact);

    //Add New Method for - Optional + docs(gif, png,jpeg,jpg, docx, ppt, xlsx etc) + Maximum size 2 MB
    jQuery.validator.addMethod("optionaldocsMax5MB", function(value, element) {
        if ($.trim(value) == "") {
            return true;
        } else {
            var Extension = value.substring(value.lastIndexOf('.') + 1).toLowerCase();
            var jquery_object = jQuery(element);
            if (Extension == "jpeg" || Extension == "JPEG" || Extension == "png" || Extension == "jpg" ||
                Extension == "docx" || Extension == "pdf" || Extension == "xlsx") {
                if (jquery_object.prop("files")[0].size > 5242880) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }
    }, messages.optionaldocsMax5MB);

    //Add New Method for Excel File Upload - Required + docs(xls, xlsx)
    jQuery.validator.addMethod("requiredExcel", function(value, element) {
        if ($.trim(value) == "") {
            return false;
        } else {
            var Extension = value.substring(value.lastIndexOf('.') + 1).toLowerCase();
            if (Extension == "xls" || Extension == "xlsx") {
                return true;
            } else {
                return false;
            }
        }
    }, messages.requiredExcel);

    //Custom Validation Rules
    //Add New Method for - Mandatory + Minimum Length 1 + Maximum Length 3
    jQuery.validator.addMethod("requiredMin1Max3", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 1 || $.trim(value).length > 3) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin1Max3);

    //Add New Method for - Email - Optional + Email Validation
    jQuery.validator.addMethod("notRequiredEmail", function(value, element) {
        if ($.trim(value) == "") {
            return true;
        } else if (!/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value)) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredEmail);

    //Add Custom Method for Multiple Emails - Mandatory + Comma Separated Emails
    jQuery.validator.addMethod("multipleEmail", function(value, element) {
        if ($.trim(value) == "") {
            return false;
        } else {
            var emailArray = value.split(",");
            for (var i = 0; i <= (emailArray.length - 1); i++) {
                if (!/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($.trim(emailArray[i]))) {
                    return false;
                }
            }
            return true;
        }
    }, messages.multipleEmail);

    //Add Custom Method for Multiple Emails - Optional + Comma Separated Emails
    jQuery.validator.addMethod("notRequiredMultipleEmail", function(value, element) {
        if ($.trim(value) == "") {
            return true;
        } else {
            var emailArray = value.split(",");
            for (var i = 0; i <= (emailArray.length - 1); i++) {
                if (!/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($.trim(emailArray[i]))) {
                    return false;
                }
            }
            return true;
        }
    }, messages.notRequiredMultipleEmail);

    //Add New Method for - Mandatory + Minimum Length 1 + Maximum Length 150
    jQuery.validator.addMethod("requiredMin1Max150", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 1 || $.trim(value).length > 150) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin1Max150);

    //Add New Method for - Mandatory + Minimum Length 1 + Maximum Length 150
    jQuery.validator.addMethod("requiredAge", function(value, element) {
        if ($.trim(value) == "" || !/^\d+$/.test(value) || $.trim(value) < 1 || $.trim(value) > 150) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredAge);

    //Add New Method for - Optional + Minimum Length 1 + Maximum Length 150
    jQuery.validator.addMethod("notRequiredMin1Max150", function(value, element) {
        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && ($.trim(value).length < 1 || $.trim(value).length > 150)) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredMin1Max150);

    //Add New Method for - Mandatory + Minimum Length 10 + Maximum Length 1500
    jQuery.validator.addMethod("requiredMin10Max1500", function(value, element) {
        if ($.trim(value) == "" || $.trim(value).length < 10 || $.trim(value).length > 1500) {
            return false;
        } else {
            return true;
        }
    }, messages.requiredMin10Max1500);

    //Add New Method for - Optional + Minimum Length 10 + Maximum Length 1500
    jQuery.validator.addMethod("notRequiredMin10Max1500", function(value, element) {
        if ($.trim(value) == "") {
            return true;
        } else if ($.trim(value) != "" && ($.trim(value).length < 10 || $.trim(value).length > 1500)) {
            return false;
        } else {
            return true;
        }
    }, messages.notRequiredMin10Max1500);

    //INLINE VALIDATION
    $(".form-validate").validate({
        errorClass: 'validation-error-label',
        successClass: 'validation-valid-label',
        highlight: function(label) {
            $(label).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        success: function(label) {
            $(label).closest('.form-group').removeClass('has-error');
            label.remove();
        }
    });

    //Validation (added hear because it was not working if added on above INLINE VALIDATION)
    $("#form-validate").validate({
        ignore: [],
        errorClass: 'validation-error-label',
        successClass: 'validation-valid-label',
        highlight: function(label) {
            $(label).closest('.form-group').removeClass('has-success').addClass('has-error');
        },
        success: function(label) {
            $(label).closest('.form-group').removeClass('has-error');
            label.remove();
        }
    });

});