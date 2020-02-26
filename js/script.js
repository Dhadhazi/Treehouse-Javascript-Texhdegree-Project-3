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
      tshirtColorOptions[i].selected = '';
    }
    let tshirtNoDesign = document.createElement('option');
    tshirtNoDesign.appendChild(document.createTextNode('Please select a T-shirt theme'));
    tshirtNoDesign.value = 'nodesign';
    tshirtNoDesign.selected = 'true';
    tshirtColor.appendChild(tshirtNoDesign);
  } else if (choice === 'js puns') {
    tshirtColorOptions[0].selected = 'true';
    for (let i=0; i<tshirtColorOptions.length; i++) {
      if (i>2) {
        tshirtColorOptions[i].hidden = 'true';
        tshirtColorOptions[i].selected = '';
      } else {
        tshirtColorOptions[i].hidden = '';
        tshirtColorOptions[i].selected = '';
      }
    }

  } else if (choice === 'heart js') {
    tshirtColorOptions[3].selected = 'true';
    for (let i=0; i<tshirtColorOptions.length; i++) {
      if (i<3 || i>5) {
        tshirtColorOptions[i].hidden = 'true';
        tshirtColorOptions[i].selected = '';
      } else {
        tshirtColorOptions[i].hidden = '';
        tshirtColorOptions[i].selected = '';
      }
    }
  }
}

//Event listener for design choice
tshirtDesign.addEventListener('change', (e) => {
    ColorChoice(e.target.value); 
})

//Checkbox appointments handling
const checkboxes = document.querySelectorAll('input[type=checkbox]');
for (let i=0; i<checkboxes.length;i++) {
  checkboxes[i].addEventListener('change', (e) => {
    const clicked = e.target;
    const clickedTime = clicked.getAttribute('data-day-and-time');
    for (let i=0; i<checkboxes.length;i++) {
      checkboxTime = checkboxes[i].getAttribute('data-day-and-time');
      if (clickedTime === checkboxTime && checkboxes[i] !== clicked) {
        if (clicked.checked) {
          checkboxes[i].disabled = 'true';  
        } else {
          checkboxes[i].disabled = ''; 
        }
      }
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
  if (selectPayment) {paymentOptions.removeChild(selectPayment)};

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
  };

}

//Event listener for Payment options
paymentOptions.addEventListener('change', (e) => {
  pay(e.target.value);
})

//Default color choice so it resets the field
ColorChoice('Select Theme');

//Default payment option choice
pay('credit card');









