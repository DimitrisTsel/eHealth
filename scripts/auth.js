// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        currentUser = auth.currentUser;
        db.collection('eHealth').doc(currentUser.uid).collection('medicalRecords').onSnapshot(snapshot => {
            setupGuides(snapshot.docs);
            setupUI(user);
        }, err => console.log(err.message));
    } else {
        setupUI();
        setupGuides([]);
    }
});

// const medicalList = document.querySelector('#medicalTitle');
// function renderMedical(doc){
//     let li = document.createElement('li');
//     let cross = document.createElement('div');
//     cross.textContent = 'x';
//     li.setAttribute('data-id', doc.id);
//     li.appendChild(cross);
//     medicalList.appendChild(li);
//      // deleting data
//      cross.addEventListener('click', (e) => {
//         e.stopPropagation();
//         let id = e.target.parentElement.parentElement.getAttribute('data-id');
//         db.collection('eHealth').doc(currentUser.uid).collection('medicalRecords').doc(id).delete();
//     });
// }
   

  

// create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
     db.collection('eHealth').doc(currentUser.uid).collection('medicalRecords').add({
        title: createForm.title.value,
        medicalHistoryDate: createForm.medicalHistoryDate.value,
        diagnosis: createForm.diagnosis.value,
        content: createForm.content.value,
        fileButton: createForm.fileButton.value,
        drName: createForm.drName.value
    }).then(() => {
        // close the create modal & reset form
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }).catch(err => {
        console.log(err.message);
    });
});

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    const confirmPassword = signupForm['signup-confirmPassword'].value;
    if(password===confirmPassword){
       // sign up the user & add firestore data
        auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            fullname: signupForm['signup-fullname'].value
            });
        }).then(() => {
        // close the signup modal & reset form
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
        }); 
    }else{
        alert('Confirm password must be the same with the password')
    }
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    // log the user in
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        // close the signup modal & reset form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    });

});