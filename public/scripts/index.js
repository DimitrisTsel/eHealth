// DOM elements
const eHealthList = document.querySelector('.eHealth');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => {
  if (user) {
    // account info
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
        <div><strong>Email: </strong> ${user.email}</div>
        <div><strong>Ονοματεπώνυμο: </strong> ${doc.data().fullname}</div>
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
const setupMedical = (data, id) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
      console.log(doc.id);
      const ehealth =doc.data();
      const li = `
      <ul data-id="${doc.id}">
      <li><h5><a href="#" id="medicalTitle">${ehealth.title} </a></h5></li>
      <li><div class="collapsible-header grey lighten-4"  id="medicalDate">Ημερομηνία: ${ehealth.medicalHistoryDate} </div></li>
      <li><div class="collapsible-header grey lighten-4" id="medicalDiagnosis">Δάγνωση: ${ehealth.diagnosis} </div></li>
      <li><div class="collapsible-header grey lighten-4" id="medicalPrescription">Περιγραφή: ${ehealth.content} </div></li>
      <li><div class="collapsible-header grey lighten-4" id="medicalDrName">Ιατρός: ${ehealth.drName} </div></li>
      <button class="btn btn-danger btn-sm my-2 ">Διαγραφή</button>
      <br><br>
      </ul>
      
      `;
      html += li;
    });
    eHealthList.innerHTML = html
  } else {
    eHealthList.innerHTML = '<h5 class="center-align"></h5>';
  }
  

};



//deleting documents
eHealthList.addEventListener('click', e => {
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
