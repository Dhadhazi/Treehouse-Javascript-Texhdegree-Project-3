/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/

//Jobrole part, other field hide/reveal
const jobrole = document.getElementById('title');
const jobroleOther = document.getElementById('other-title');
jobroleOther.type ='hidden';

jobrole.addEventListener('change', (e) => {
  if (e.target.value === 'other'){
    jobroleOther.type = "text";
  } else {
    jobroleOther.type = "hidden";
  }
});


//T-Shirt section
const tshirtDesign = document.getElementById('design');


//Handling color choosing from tshirtDesign event listener
function ColorChoice(choice) {
  const tshirtColor = document.getElementById('color');
  const tshirtColorOptions = document.querySelectorAll('#color option');

  if (choice === 'Select Theme') { 
    for (let i=0; i<tshirtColorOptions.length; i++) {
      tshirtColorOptions[i].hidden = 'true';
      tshirtColorOptions[i].removeAttribute('selected');
    }
    let tshirtNoDesign = document.createElement('option');
    tshirtNoDesign.appendChild(document.createTextNode('Please select a T-shirt theme'));
    tshirtNoDesign.value = 'nodesign';
    tshirtNoDesign.selected = 'true';
    tshirtColor.appendChild(tshirtNoDesign);
  } else if (choice === 'js puns') {
  	tshirtDesign[0].hidden = true;
    for (let i=0; i<tshirtColorOptions.length; i++) {
      if (i>2) {
        tshirtColorOptions[i].hidden = 'true';
        tshirtColorOptions[i].removeAttribute('selected');
      } else {
        tshirtColorOptions[i].hidden = '';
        tshirtColorOptions[i].removeAttribute('selected');
      }
    tshirtColorOptions[0].selected = 'true';
    }

  } else if (choice === 'heart js') {
  	tshirtDesign[0].hidden = true;
    for (let i=0; i<tshirtColorOptions.length; i++) {
      if (i<3 || i>5) {
        tshirtColorOptions[i].hidden = 'true';
        tshirtColorOptions[i].removeAttribute('selected');
      } else {
        tshirtColorOptions[i].hidden = '';
        tshirtColorOptions[i].removeAttribute('selected');
      }
    tshirtColorOptions[3].selected = 'true';
    }
  }
}

//Event listener for design choice
tshirtDesign.addEventListener('change', (e) => {
    ColorChoice(e.target.value); 
})

//Checkbox appointments, total cost handling
const checkboxes = document.querySelectorAll('input[type=checkbox]');

//Creating the running tab
const totalBox = document.createElement('SPAN');
const totalText = document.createTextNode("Total Payable: $0");
totalBox.appendChild(totalText);
document.querySelector('.activities').appendChild(totalBox);
let totalCost = 0;

//adding event listener to checkboxes
for (let i=0; i<checkboxes.length;i++) {
  checkboxes[i].addEventListener('change', (e) => {
    const clicked = e.target;
    const clickedTime = clicked.getAttribute('data-day-and-time');
    const clickedCost = parseInt(clicked.getAttribute('data-cost'));

    for (let i=0; i<checkboxes.length;i++) {
      const checkboxTime = checkboxes[i].getAttribute('data-day-and-time');
      if (clickedTime === checkboxTime && checkboxes[i] !== clicked) {
        if (clicked.checked) {
          checkboxes[i].disabled = 'true';
          let parent = checkboxes[i].parentNode;
          parent.style.color = 'grey';
        } else {
          checkboxes[i].disabled = ''; 
          let parent = checkboxes[i].parentNode;
          parent.style.color = '';
        }
      }
    }
    if (clicked.checked){
      totalCost += clickedCost;
      totalBox.textContent ='Total: $'+ totalCost;
    } else {
      totalCost -= clickedCost;
      totalBox.textContent ='Total: $'+ totalCost;
    }
  })
}


//Payment section 
const paymentOptions = document.getElementById('payment');

function pay (paymentMethod) {
  const creditcard = document.getElementById('credit-card');
  const paypal = document.getElementById('paypal');
  const bitcoin = document.getElementById('bitcoin');

  //Deletiing the select option
  const selectPayment = document.querySelector('option[value="select method"]');
  if (selectPayment) {paymentOptions.removeChild(selectPayment)}

  if (paymentMethod === 'credit card') {
    creditcard.style.display = '';
    paypal.style.display = 'none';
    bitcoin.style.display = 'none';
  } else if (paymentMethod === 'paypal') {
    creditcard.style.display = 'none';
    paypal.style.display = '';
    bitcoin.style.display = 'none';
  } else if (paymentMethod === 'bitcoin') {
    creditcard.style.display = 'none';
    paypal.style.display = 'none';
    bitcoin.style.display = '';
  }

}

//Event listener for Payment options
paymentOptions.addEventListener('change', (e) => {
  pay(e.target.value);
});

//Form validation functions
function nameValidator() {
  const name = document.getElementById('name');
  if (name.value.length > 0) {
    name.style.borderColor ='';
    return(true);
  } else {
    name.style.borderColor ='red';
    return(false);
  }
}

function emailValidator() {
  const email = document.getElementById('mail');
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email.value)){
    email.style.borderColor ='';
    return(true);
  } else {
    email.style.borderColor ='red';
    return(false);
  }
}

function activitiValidator(){
  let status = false;
  const errorBox = document.getElementById('checkbox error');
  for (let i=0; i<checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      status = true;
    }
  }
  if (status){
    errorBox.style.display = 'none';
    return(true);
  } else {
    errorBox.style.display = '';
    return(false);
  }
}

function ccNumberValidator(){
  const ccNumber = document.getElementById('cc-num');
  const re = /^(\d){13,16}$/;
  if (re.test(ccNumber.value)){
    ccNumber.style.borderColor ='';
    return(true);
  } else {
    ccNumber.style.borderColor ='red';
    return(false);
  }
}

function ccZipValidator(){
  const zip = document.getElementById('zip');
  const re = /^(\d){5}$/;
  if (re.test(zip.value)){
    zip.style.borderColor ='';
    return(true);
  } else {
    zip.style.borderColor ='red';
    return(false);
  }

}

function ccCvvValidator(){
  const cvv = document.getElementById('cvv');
  const re = /^(\d){3}$/;
  if (re.test(cvv.value)){
    cvv.style.borderColor ='';
    return(true);
  } else {
    cvv.style.borderColor ='red';
    return(false);
  }
}

//Form validation event listener
const form = document.querySelector("form");
form.addEventListener('submit', (e) => {
  nameValidator();
  if (!nameValidator()) {
    e.preventDefault();
    console.log("Name validator prevented submission");
  } 
  if (!emailValidator()) {
    e.preventDefault();
    console.log("Email validator prevented submission");
  } 
  if (!activitiValidator()) {
    e.preventDefault();
    console.log("Activity validator prevented submission");
  } 
  if (paymentOptions.value === 'credit card') {
    if (!ccNumberValidator()) {
      e.preventDefault();
      console.log("CC validator prevented submission");
    } 
    if (!ccZipValidator()) {
      e.preventDefault();
      console.log("ZIP validator prevented submission");
    } 
    if (!ccCvvValidator()) {
      e.preventDefault();
      console.log("CVV validator prevented submission");
    } 
  }
});


//Default color choice so it resets the field
ColorChoice('Select Theme');

//Default payment option choice
pay('credit card');










