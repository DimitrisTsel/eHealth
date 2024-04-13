const btn = document.querySelector('button')
const inputs = document.querySelector('form')

btn.addEventListener('click',()=>{
    Email.send({
        Host: "smtp.mailtrap.io",
        Username: "0998f593aee2c3",
        Password: "07ff2abe9fa74f",
        To: "eHealthSupport@mail.com",
        From: inputs.elements["email"].value,
        Subject: "Contact",
        Body: inputs.elements["message"].value + "<br>" + inputs.elements["name"].value + "<br>" + inputs.elements["phone"].value

    }).then(function (msg) {
        if ((inputs.elements["email"].value)==="" || inputs.elements["message"].value==="" || inputs.elements["name"].value==="" || inputs.elements["phone"].value===""){
            alert("Παρακαλώ συμπληρώστε όλα τα πεδία!")
        }else {
            alert("Το email στάλθηκε επιτυχώς!")
        }
    })  
})
