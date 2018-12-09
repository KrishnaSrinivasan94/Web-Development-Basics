var colors = ["Black", "Green", "Yellow"];
var items=["Fries","Pizza","Dog","Wings"];
var formalNames=["French Fries", "Pizza slice" , "Hot Dog" , "Wings"];
var smallPrices=[2,4,1,5];
var mediumPrices=[4,6,3,8];
var largePrices=[5,9,4,10];
var numberName=[];
var sizeName=[];
var colorIndex = 0;
var formName="frm";
var maxQuantity=10;
var mayoCost = 0 ;
var ketchupCost = 0;
var seasoningCost = 0;
var p1 = "billingError";  // PAragraph to print out errors in billing input fields.
var p2 = "addressError";  // Paragraph to print out errors in address input fields.
var validQuantities = true; // All quantities valid by default.
var interval;
/*
 Validation Rules : 1. Item quantities must be between 0 and 10
                    2. First and Last Names must contain only alphabets and cannot be empty or contain spaces.
					3. Card number must be of the format xxxx-xxxx-xxxx-xxxx (hyphens needed)
					4. Expiry Date must be mm/dd/yyyy format. Any year after 2017 is ok.
					5. Cvv must have 3 numerical digits.
				    6. House number must contain only numerical digits and no spaces.
					7. Street name must contain only alphabets and may have spaces. Cannot be empty. Cannot have leading/trailing spaces.
					8. Zip code can be any 5 digit number.
					9. Phone number must be of the format (xxx)xxxxxxx brackets needed. 
					
*/

/**
 * Check if all input fields are valid. Called when order button is pressed.
 * Calls the individual validate functions. If there is an error in inputs, an alert displaying the errors is generated. 
 * If all fields are valid and there is a non zero total amount, the order is successful
 */ 
function submission() {
	validateHouseNumber();
	validateStreetName();
	validateZipCode();
	validatePhoneNumber();
	validateFirstName();
	validateLastName();
	validateCardNumber();
	validateExpiryDate();
	validateCvv();
	var errorString = document.getElementById(p1).innerHTML + document.getElementById(p2).innerHTML + quantityErrorString();
	errorString = errorString.replace(/<br>/g,"\n");
	if(errorString.length > 0 ) {
		window.alert("Please correct these errors\n" + errorString);
	} else if (calculateTotal() == 0) {
		window.alert("Choose atleast one item");
	}
	else {
		clearInterval(interval);
	    document.getElementById("bd").innerHTML="<p>Order Successfully placed</p>";
	}
}

/**
 * Called when the mayo checkbox is clicked.
 */ 
function selectMayo() {
	mayoCost = 1 - mayoCost ;
	calculateTotal();
}

/**
 * Called when the seasoning checkbox is clicked.
 */
function selectSeasoning() {
	seasoningCost = 1 - seasoningCost ;
	calculateTotal();
}

/**
 * Called when the ketchup checkbox is clicked.
 */
function selectKetchup() {
	ketchupCost = 1 - ketchupCost ;
	calculateTotal();
}

/**
 * Changes the heading background color every 5 seconds
 */
function changeHeadingColor() {
	document.getElementById("heading").style.backgroundColor = colors[colorIndex];
	colorIndex = (colorIndex + 1) % colors.length;  // Alternates the next heading background color. 
}	

/**
 * Validates the house number. Called when the house number field is blurred. 
 */
function validateHouseNumber(){
	var nameFormat = /^\d{1,}$/;  // Regex indicating at least one numerical digit and no other types of characters. 
	var errorFormat = /Invalid House Number<br>/;
	var houseNumber = document[formName]["houseNumber"].value;
	
	var errorString="";
	
	/* If invalid input field */
	if(!nameFormat.test(houseNumber)) {
		
		/* If an error message for this input field is not already displayed, display it now*/
		if(!errorFormat.test(document.getElementById(p2).innerHTML))
			errorString += "Invalid House Number<br>";
	}
	else if(errorFormat.test(document.getElementById(p2).innerHTML)) {
		
		/* If the input is now valid, remove the error message displayed for this field if any */
		var temp = document.getElementById(p2).innerHTML.split(errorFormat);
		var t = "";
		for (var i = 0 ; i < temp.length; i++) {
			t += temp[i];
		}
	    document.getElementById(p2).innerHTML = t;
	}
	document.getElementById(p2).innerHTML += errorString;
	
}

/**
 * Validates the street name. Called when the street name input field is blurred.
 */
function validateStreetName(){
	var nameFormat = /^([a-zA-Z]{1,}(\s*)){1,}$/; // Regex to indicate alphabets followed by any number of spaces. This pattern has to repeat atleast once.
	var nameFormat2=/\s{1,}$/; // Regex to indicate trailing spaces.
	var errorFormat = /Invalid Street Name<br>/;
	var streetName = document[formName]["streetName"].value;
	
	var errorString="";
	if(!nameFormat.test(streetName) || nameFormat2.test(streetName)) { // If there is no regex match for nameFormat or if there are trailing spaces.
		if(!errorFormat.test(document.getElementById(p2).innerHTML))
			errorString += "Invalid Street Name<br>";
	}
	else if(errorFormat.test(document.getElementById(p2).innerHTML)) {
		var temp = document.getElementById(p2).innerHTML.split(errorFormat);
		var t = "";
		for (var i = 0 ; i < temp.length; i++) {
			t += temp[i];
		}
	    document.getElementById(p2).innerHTML = t;
	}
	document.getElementById(p2).innerHTML += errorString;
	
}

/**
 * Validates the zip code. Called when the zip code field is blurred.
 */
function validateZipCode(){
	var nameFormat = /^\d{5}$/;               // Regex to indicate 5 numerical digits.
	var errorFormat = /Invalid Zip Code<br>/;
	var zipCode = document[formName]["zipCode"].value;
	
	var errorString="";
	if(!nameFormat.test(zipCode)) {
		if(!errorFormat.test(document.getElementById(p2).innerHTML))
			errorString += "Invalid Zip Code<br>";
	}
	else if(errorFormat.test(document.getElementById(p2).innerHTML)) {
		var temp = document.getElementById(p2).innerHTML.split(errorFormat);
		var t = "";
		for (var i = 0 ; i < temp.length; i++) {
			t += temp[i];
		}
	    document.getElementById(p2).innerHTML = t;
	}
	document.getElementById(p2).innerHTML += errorString;
	
}

/**
 * Validates the phone number. Called when the phone number field is blurred.
 */
function validatePhoneNumber(){
	var nameFormat = /^\(\d{3}\)\d{7}$/;   // Regex to indicate a phone number of the formn (xxx)xxxxxxx where x is a numerical digit.
	var errorFormat = /Invalid Phone Number<br>/;
	var phoneNumber = document[formName]["phoneNumber"].value;
	
	var errorString="";
	if(!nameFormat.test(phoneNumber)) {
		if(!errorFormat.test(document.getElementById(p2).innerHTML))
			errorString += "Invalid Phone Number<br>";
	}
	else if(errorFormat.test(document.getElementById(p2).innerHTML)) {
		var temp = document.getElementById(p2).innerHTML.split(errorFormat);
		var t = "";
		for (var i = 0 ; i < temp.length; i++) {
			t += temp[i];
		}
	    document.getElementById(p2).innerHTML = t;
	}
	document.getElementById(p2).innerHTML += errorString;
	
}

/**
 * Validates the First Name. Called when the first name field is blurred.
 */
function validateFirstName(){
	var nameFormat = /^[a-zA-z]{1,}$/; // Regex to indicate that the first name can contain only alphabets and no spaces.
	var errorFormat = /Invalid First Name<br>/;
	var firstName = document[formName]["firstName"].value;
	
	var errorString="";
	if(!nameFormat.test(firstName)) {
		if(!errorFormat.test(document.getElementById(p1).innerHTML))
			errorString += "Invalid First Name<br>";
	}
	else if(errorFormat.test(document.getElementById(p1).innerHTML)) {
		var temp = document.getElementById(p1).innerHTML.split(errorFormat);
		var t = "";
		for (var i = 0 ; i < temp.length; i++) {
			t += temp[i];
		}
	    document.getElementById(p1).innerHTML = t;
	}
	document.getElementById(p1).innerHTML += errorString;
	
}

/**
 * Validate the last name. Called when the last name field is blurred. 
 */
function validateLastName(){
	var nameFormat = /^[a-zA-z]{1,}$/; // Regex to indicate that last name should contain only alphabets and no spaces.
	var errorFormat = /Invalid Last Name<br>/;
	var lastName = document[formName]["lastName"].value;
	
	var errorString="";
	if(!nameFormat.test(lastName)) {
		if(!errorFormat.test(document.getElementById(p1).innerHTML))
			errorString += "Invalid Last Name<br>";
	}
	else if(errorFormat.test(document.getElementById(p1).innerHTML)) {
		var temp = document.getElementById(p1).innerHTML.split(errorFormat);
		var t = "";
		for (var i = 0 ; i < temp.length; i++)
			t += temp[i];
	    document.getElementById(p1).innerHTML = t;
	}
		
	document.getElementById(p1).innerHTML += errorString;
	
}

/**
 * Validate the card number. Called when the card number field is blurred. 
 */
function validateCardNumber(){
	var nameFormat = /^\d{4}-\d{4}-\d{4}-\d{4}$/;  // Regex to indicate that the card number should be of the form xxxx-xxxx-xxxx-xxxx where x is a numerical digit.
	var errorFormat = /Invalid Card Number<br>/;
	var cardNumber = document[formName]["cardNumber"].value;
	
	var errorString="";
	if(!nameFormat.test(cardNumber)) {
		if(!errorFormat.test(document.getElementById(p1).innerHTML))
			errorString += "Invalid Card Number<br>";
	}
	else if(errorFormat.test(document.getElementById(p1).innerHTML)) {
		var temp = document.getElementById(p1).innerHTML.split(errorFormat);
		var t = "";
		for (var i = 0 ; i < temp.length; i++)
			t += temp[i];
	    document.getElementById(p1).innerHTML = t;
	}
		
	document.getElementById(p1).innerHTML += errorString;
	
}

/**
 * Validate the Expiry date. Called when the expiry date field is blurred.
 */
function validateExpiryDate(){
	console.log("Expiry" );
	var nameFormat = /^\d{4}-\d{2}-\d{2}$/;  // Regex to indicate that the expiry date is of the form yyyy-mm-dd.
	var errorFormat = /Invalid Expiry Date<br>/;
	var expiryDate = document[formName]["expiryDate"].value;
	
	var errorString="";
	if(!nameFormat.test(expiryDate)) {		
		if(!errorFormat.test(document.getElementById(p1).innerHTML))
			errorString += "Invalid Expiry Date<br>";
	}
	else if (parseInt((expiryDate.split("-"))[0],10) < 2018) {      // MAke sure that the expiry year is later than 2017.
		if(!errorFormat.test(document.getElementById(p1).innerHTML))
			errorString += "Invalid Expiry Date<br>";
	}
		
	else if(errorFormat.test(document.getElementById(p1).innerHTML)) {
		var temp = document.getElementById(p1).innerHTML.split(errorFormat);
		var t = "";
		for (var i = 0 ; i < temp.length; i++)
			t += temp[i];
		document.getElementById(p1).innerHTML = t;
	}
		
	document.getElementById(p1).innerHTML += errorString;
	
}	

/**
 * Validate the CVV. Called when the Cvv field is blurred.
 */
function validateCvv(){
	var nameFormat = /^\d{3}$/;          // Cvv to contain only 3 numerical digits.
	var errorFormat = /Invalid Cvv<br>/;
	var cvv = document[formName]["cvv"].value;
	var errorString="";
	if(!nameFormat.test(cvv)) {
		if(!errorFormat.test(document.getElementById(p1).innerHTML))
			errorString += "Invalid Cvv<br>";
	}
	else if(errorFormat.test(document.getElementById(p1).innerHTML)) {
		var temp = document.getElementById(p1).innerHTML.split(errorFormat);
		var t = "";
		for (var i = 0 ; i < temp.length; i++) {
			t += temp[i];
		}
	    document.getElementById(p1).innerHTML = t;
	}
	document.getElementById(p1).innerHTML += errorString;
	
}	

/**
 * Produces a string containing all the items for which there is an invalid quantity
 * Called by the submission function.
 */
function quantityErrorString() {
	var error = "" ;
	for (var i = 0; i<items.length; i++) {
		var quantity = parseInt(document.forms[formName][numberName[i]].value,10);
		if(quantity < 0 || quantity > maxQuantity) {
			error +="Please enter between 0 and 10" + formalNames[i] + "<br>";
		}
	}
	return error;
}

/**
 * Validates if all the items have valid quantities.
 * Called when a quantity field is blurred. 
 * If a quantity is invalid an error message is displayed and the validquantities flag is set to false. 
 * If all quantities are valid the calidquantities flag is set to true and the calculate total field is called to update the total amount
 */
function validateQuantity() {
	for (var i = 0; i<items.length; i++) {
		var quantity = parseInt(document.forms[formName][numberName[i]].value, 10);
		if(quantity < 0 || quantity > maxQuantity) {
			document.getElementById("total").innerHTML = "Please enter a valid (between 0 and 10) " + formalNames[i];
			validQuantities = false;
			return ;
		}
    }
	validQuantities = true;
	calculateTotal();
}

/**
 * Calculates the total order amount based on the quantity and size of each item ordered as well as condiments selected. 
 * If a quantity is invalid this function has no effect and the total price is not displayed. 
 * If all quantities are valid, the total price is displayed and the price is returned. 
 * @retval the total order amount.
 */
function calculateTotal() {
	    if(validQuantities == false)
			return; 
	    var totalPrice = 0;
		for (var i = 0; i< items.length; i++){
			var size = document.forms[formName][sizeName[i]].value;
			var quantity= parseInt(document.forms[formName][numberName[i]].value, 10);
			var itemPrice = 0;
			console.log(size + "," + quantity.toString() +"," + i.toString());
			if(size=="small") {
				itemPrice = quantity * smallPrices[i];
			}
			if(size == "medium") {
				itemPrice = quantity * mediumPrices[i];
			}
			if(size == "large") {
				itemPrice = quantity * largePrices[i];
			}
			totalPrice += itemPrice;
		}
		totalPrice += mayoCost + seasoningCost + ketchupCost;
		document.getElementById("total").innerHTML = "<strong><u>Your Total is $" + totalPrice.toString() + "</strong></u>";
		return totalPrice;
}

/**
 * Called when the webpage is loaded.
 * initializes arrays used for computation. 
 * sets the function changeHeadingColor() to be called every 5s.
 */ 
function initialize() {
	interval = setInterval(changeHeadingColor, 5000);
	alert("Welcome to my restaurant");
	
	for(var i = 0; i<items.length; i++) {
		numberName.push("num"+items[i]);
		sizeName.push("size" + items[i]);
	}
}
	
	