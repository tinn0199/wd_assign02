/* Register Validations */

function validateRegister() {
    var username = document.getElementById("username").value;
    var email    = document.getElementById("reg-email").value;
    var phone    = document.getElementById("reg-phone").value;
    var pwd1     = document.getElementById("pwd1").value;
    var pwd2     = document.getElementById("pwd2").value;
    var country  = document.getElementById("country").value;

    /* for radio buttons, use .checked to get true/false */
    var genm = document.getElementById("genm").checked;
    var genf = document.getElementById("genf").checked;
    var geno = document.getElementById("geno").checked;
    var genp = document.getElementById("genp").checked;

    /* for checkboxes, get all checked dietary options */
    var dietaryChecked = document.querySelectorAll("input[name='dietary']:checked");

    var errMsg = "";   /* stores all error descriptions */
    var result = true; /* assumes true until a check fails */

    /* Rule 1: check if required fields are empty */
    if (username == "") {
        errMsg += "Username cannot be empty.\n";
    }
    if (email == "") {
        errMsg += "Email address cannot be empty.\n";
    }
    if (phone == "") {
        errMsg += "Phone number cannot be empty.\n";
    }
    if (pwd1 == "") {
        errMsg += "Password cannot be empty.\n";
    }
    if (pwd2 == "") {
        errMsg += "Password doesn't match.\n";
    }
    if (country == "") {
        errMsg += "Please select your country.\n";
    }

    /* Rule 2: check if a gender option is selected */
    if (genm == false && genf == false && geno == false && genp == false) {
        errMsg += "You must select a gender.\n";
    }

    /* Rule 3: check if at least one dietary preference is selected */
    if (dietaryChecked.length == 0) {
        errMsg += "Please select at least one dietary preference.\n";
    }

    /* Rule 4: username must be at least 5 characters, letters/numbers/underscores only */
    var userPattern = /^[a-zA-Z0-9_]{5,}$/;
    if (username != "" && !username.match(userPattern)) {
        errMsg += "Username must be at least 5 characters and contain only letters, numbers, or underscores.\n";
    }

    /* Rule 5: email must contain an @ symbol */
    if (email != "" && email.indexOf("@") < 0) {
        errMsg += "Email address must contain an '@' symbol.\n";
    }

    /* Rule 6: phone must be digits only*/
    var phonePattern = /^[0-9]{10,10}$/;
    if (phone != "" && !phone.match(phonePattern)) {
        errMsg += "Phone number must contain only digits.\n";
    }
    
    /* Rule 7: password must be at least 10 characters with uppercase, lowercase, number and special character */
    var pwdPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.])(?=.{10,})/;
    if (pwd1 != "" && !pwd1.match(pwdPattern)) {
        errMsg += "Password must be at least 10 characters, including an uppercase letter, lowercase letter, number, and special character.\n";
    }

    /* Rule 8: confirm password must match password */
    if (pwd1 != pwd2) {
        errMsg += "Confirm password does not match password.\n";
    }

    /* display alert if any errors were found */
    if (errMsg != "") {
        alert(errMsg);
        result = false;
    } else {
        /* set a flag in sessionStorage so the reservation page knows the user has registered */
        sessionStorage.setItem("registered", "true");
    }

    return result;
}


/* Reservation Validations */

function validateReservation() {
    var fullname  = document.getElementById("fullname").value;
    var resEmail  = document.getElementById("res-email").value;
    var resPhone  = document.getElementById("res-phone").value;
    var resDate   = document.getElementById("res-date").value;
    var resTime   = document.getElementById("res-time").value;
    var numPeople = document.getElementById("num-people").value;
    var billingEmail = document.getElementById("billing-email").value;

    var payVoucher = document.getElementById("pay-voucher").checked;
    var payOnline  = document.getElementById("pay-online").checked;

    var errMsg = "";
    var result = true;

    /* Fields are not empty */
    if (fullname == "") {
        errMsg += "Full name cannot be empty.\n";
    }
    if (resEmail == "") {
        errMsg += "Email address cannot be empty.\n";
    }
    if (resPhone == "") {
        errMsg += "Phone number cannot be empty.\n";
    }
    if (resDate == "") {
        errMsg += "Reservation date must be selected.\n";
    }
    if (resTime == "") {
        errMsg += "Reservation time must be selected.\n";
    }
    if (billingEmail == "") {
        errMsg += "Billing email address cannot be empty.\n";
    }

    /* Email must contain an @ symbol */
    if (resEmail != "" && resEmail.indexOf("@") < 0) {
        errMsg += "Email address must contain an '@' symbol.\n";
    }

    /* Phone must be at least 10 digits */
    if (resPhone != "" && resPhone.length < 10) {
        errMsg += "Phone number must be at least 10 digits long.\n";
    }

    /* Number of people must be more than 0 */
    if (numPeople != "" && Number(numPeople) <= 0) {
        errMsg += "Number of people must be greater than 0.\n";
    }

    /* Date must not be in the past */
    if (resDate != "") {
        var inputDate = new Date(resDate);
        var today = new Date();
        today.setHours(0, 0, 0, 0); 
        if (inputDate < today) {
            errMsg += "Reservation date cannot be in the past.\n";
        }
    }

    /* Payment must be selected */
    if (payVoucher == false && payOnline == false) {
        errMsg += "Please select a payment method.\n";
    }

    /* Rule 7: if online payment is selected, validate card details */
     if (payOnline) {
        var cardType   = document.getElementById("card-type").value;
        var cardNumber = document.getElementById("card-number").value;
        var cardDigits = cardNumber.replace(/\D/g, ""); /* remove non-digit characters */
 
        if (cardType == "") {
            errMsg += "Please select a card type.\n";
        }
        if (cardNumber == "") {
            errMsg += "Card number cannot be empty.\n";
        } else if (cardType == "amex" && cardDigits.length != 15) {
            errMsg += "American Express card number must be 15 digits.\n";
        } else if ((cardType == "visa" || cardType == "mastercard") && cardDigits.length != 16) {
            errMsg += "Visa/Mastercard number must be 16 digits.\n";
        }
    }

    /* Rule 8: billing email must contain an @ symbol */
    if (billingEmail != "" && billingEmail.indexOf("@") < 0) {
        errMsg += "Billing email must contain an '@' symbol.\n";
    }

    /* display alert if any errors were found */
    if (errMsg != "") {
        alert(errMsg);
        result = false;
    }

    return result;
}

/* shows voucher or card fields depending on the payment method chosen */
function updatePaymentFields() {
    var voucherSection = document.getElementById("voucher-section");
    var cardSection    = document.getElementById("card-section");
    var payVoucher     = document.getElementById("pay-voucher");
    var payOnline      = document.getElementById("pay-online");
 
    if (payVoucher.checked) {
        voucherSection.style.display = "block";
        cardSection.style.display    = "none";
    }
 
    if (payOnline.checked) {
        voucherSection.style.display = "none";
        cardSection.style.display    = "block";
    }
}

function checkRegistered() {
    var registered = sessionStorage.getItem("registered");
    if (registered != "true") {
        alert("You need to sign up first before making a reservation.");
        window.location.href = "register.html";
    }
}

/* copies the email address into the billing email field when checkbox is ticked */
function handleBillingEmail() {
    var sameEmail    = document.getElementById("same-email");
    var resEmail     = document.getElementById("res-email");
    var billingEmail = document.getElementById("billing-email");

    if (sameEmail.checked) {
        billingEmail.value    = resEmail.value;
        billingEmail.disabled = true;
    } else {
        billingEmail.value    = "";
        billingEmail.disabled = false;
    }
}

/* pre-fills the restaurant dropdown if the user came from the recommendations page */
function prefillRestaurant() {
    var urlParams        = new URLSearchParams(window.location.search);
    var preselected      = urlParams.get("restaurant");
    var restaurantSelect = document.getElementById("restaurant");

    if (preselected && restaurantSelect) {
        restaurantSelect.value = preselected;
        updateDeposit();
    }
}


/* Recommendations page */


/* restaurant data used for matching */
var restaurants = [
    { id: "bella-ciao",      name: "Bella Ciao",      cuisine: "Italian",      dietary: ["none"],                   budget: "mid",  purpose: ["date", "family"],                desc: "Reservation deposit: $20"},
    { id: "fuji-kasa",       name: "Fuji Kasa",       cuisine: "Japanese",     dietary: ["none", "vegan"],          budget: "high", purpose: ["date", "business"],              desc: "Reservation deposit: $30"},              
    { id: "cava-monsieur",   name: "Cava Monsieur",   cuisine: "French",       dietary: ["none"],                   budget: "high", purpose: ["date", "business"],              desc: "Reservation deposit: $25"},
    { id: "br-br-biryani",   name: "Br Br Biryani",   cuisine: "Indian",       dietary: ["vegan", "halal", "none"], budget: "low",  purpose: ["family", "casual"],              desc: "Reservation deposit: $15"},
    { id: "kinsa",           name: "Kinsa",           cuisine: "Thai",         dietary: ["none", "halal"],          budget: "mid",  purpose: ["family", "casual"],              desc: "Reservation deposit: $20"},
    { id: "beijing-city",    name: "Beijing City",    cuisine: "Chinese",      dietary: ["vegan", "none"],          budget: "low",  purpose: ["family", "casual", "business"],  desc: "Reservation deposit: $15"}
];

/* restaurants that match user's preferences */
function getRecommendations(dietary, budget, purpose) {
    var results = [];
    for (var i = 0; i < restaurants.length; i++) {
        var r = restaurants[i];
        var matchDietary = (dietary == "none") || (r.dietary.indexOf(dietary) >= 0);
        var matchBudget  = (r.budget == budget);
        var matchPurpose = (r.purpose.indexOf(purpose) >= 0);
        if (matchDietary && matchBudget && matchPurpose) {
            results.push(r);
        }
    }
    return results;
}

/* matching restaurants */
function handleRecommendForm() {
    var dietary     = document.getElementById("dietary-pref").value;
    var budget      = document.getElementById("budget-range").value;
    var purpose     = document.getElementById("dining-purpose").value;
    var resultsDiv  = document.getElementById("recommendation-results");
    var placeholder = document.querySelector(".results-placeholder");

    /* clear previous results */
    resultsDiv.innerHTML = "";

    var matches = getRecommendations(dietary, budget, purpose);

    /* hide the placeholder text once results appear */
    if (placeholder) {
        placeholder.style.display = "none";
    }

    if (matches.length == 0) {
        resultsDiv.innerHTML = "<p class='no-results'>No restaurants match your preferences. Try adjusting your selections!</p>";
    } else {
        /* create a card for each matching restaurant */
        for (var i = 0; i < matches.length; i++) {
            var r    = matches[i];
            var card = document.createElement("div");
            card.className = "rec-card";
            card.innerHTML = "<h3>" + r.name + "</h3>"
                           + "<p class='rec-cuisine'>" + r.cuisine + "</p>"
                           + "<p class='rec-desc'>" + r.desc + "</p>"
                           + "<a href='reservation.html?restaurant=" + r.id + "' class='btn-primary'>Reserve This Table</a>";
            resultsDiv.appendChild(card);
        }
    }

    return false; 
}

/* updates the deposit amount when the restaurant selection changes */
function updateDeposit() {
    var restaurantSelect = document.getElementById("restaurant");
    var depositDisplay   = document.getElementById("deposit-amount");

    var selectedOption = restaurantSelect.options[restaurantSelect.selectedIndex];
    var depositAmount  = selectedOption.getAttribute("data-deposit");

    if (depositAmount) {
        depositDisplay.textContent = "$" + depositAmount;
    } else {
        depositDisplay.textContent = "--";
    }
}

function init() {

    /* registration page */
    var regForm = document.getElementById("regform");
    if (regForm != null) {
        regForm.onsubmit = validateRegister;
    }

    /* reservation page */
    var resForm = document.getElementById("resform");
    if (resForm != null) {
        checkRegistered(); /* redirect to register if not signed up yet */
        resForm.onsubmit = validateReservation;

        var restaurantSelect = document.getElementById("restaurant");
        if (restaurantSelect != null) {
            restaurantSelect.onchange = updateDeposit;
        }

        var payVoucher = document.getElementById("pay-voucher");
        var payOnline  = document.getElementById("pay-online");
        if (payVoucher != null) { payVoucher.onchange = updatePaymentFields; }
        if (payOnline != null)  { payOnline.onchange  = updatePaymentFields; }

        var sameEmail = document.getElementById("same-email");
        if (sameEmail != null) { sameEmail.onchange = handleBillingEmail; }

        prefillRestaurant();
    }

    /* recommendations page */
    var recommendForm = document.getElementById("recommend-form");
    if (recommendForm != null) {
        recommendForm.onsubmit = handleRecommendForm;
    }
}

window.onload = init;