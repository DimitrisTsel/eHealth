// DOM elements
const guideList = document.querySelector('.eHealth');
const allergyList = document.querySelector('.allergies');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => {
  if (user) {
    // account info
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
        <div>Logged in as ${user.email}</div>
        <div>${doc.data().fullname}</div>
      `;
      accountDetails.innerHTML = html;
    });
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // clear account info
    accountDetails.innerHTML = '';
    // toggle user elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};

// setup guides
const setupGuides = (data, id) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
      console.log(doc.id);
      const ehealth =doc.data();
      const li = `
      <ul data-id="${doc.id}">
      <li><a href="#" id="medicalTitle">${ehealth.title} </a></li>
      <li><div class="collapsible-header grey lighten-4"  id="medicalDate">ΗΜΕΡΟΜΗΝΙΑ: ${ehealth.medicalHistoryDate} </div></li>
      <li><div class="collapsible-header grey lighten-4" id="medicalDiagnosis">ΔΙΑΓΝΩΣΗ: ${ehealth.diagnosis} </div></li>
      <li><div class="collapsible-header grey lighten-4" id="medicalPrescription">ΠΕΡΙΓΡΑΦΗ: ${ehealth.content} </div></li>
      <li><div class="collapsible-header grey lighten-4" id="medicalFile"> ${ehealth.fileButton} </div></li>
      <li><div class="collapsible-header grey lighten-4" id="medicalDrName">ΙΑΤΡΟΣ: ${ehealth.drName} </div></li>
      <button class="btn btn-danger btn-sm my-2 ">Delete</button>
      <br><br>
      </ul>
      
      `;
      html += li;
    });
    guideList.innerHTML = html
  } else {
    guideList.innerHTML = '<h5 class="center-align"></h5>';
  }
  

};



//deleting documents
guideList.addEventListener('click', e => {
  console.log(e);
  if(e.target.tagName==='BUTTON'){
    const id = e.target.parentElement.getAttribute('data-id');
    console.log(id);
    db.collection('eHealth').doc(currentUser.uid).collection('medicalRecords').doc(id).delete();

  }
});



// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});



//Get elements
var fileButton = document.getElementById('fileButton');
storage = customApp.storage("gs://e-health-8dfcf.appspot.com");

//Listen for file selection
fileButton.addEventListener('change',function(e){
  //Get file
  var file = e.target.files[0];

  //create storage ref
  var spaceRef = storageRef.child('Medical_Files/'+ file.name);
  //upload file
  var task = storageRef.put(file);

});