const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");
const btnLogin = document.getElementById("btnLogin");
const btnLogout = document.getElementById("btnLogout");
const btnSignup = document.getElementById("btnSignup");
const join = document.getElementById("join");
const joinA = document.getElementById("joinAbout");
const joinI = document.getElementById("joinIndex");


var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;
var firstTimeLogin = true;

if (user != null) {
  email = user.email;
  emailVerified = user.emailVerified;
}

console.log(email);
console.log(emailVerified);
  

  
btnLogin.addEventListener("click", e => {

    const email = txtEmail.value;
    const pass = txtPassword.value;
  
    promise = firebase.auth().signInWithEmailAndPassword(email, pass)
    alert("Logged In!");
  
    promise.catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      }
      if (errorCode == 'auth/user-not-found') {
        alert("User does not exist")
      }
      if (errorCode == 'auth/user-disabled') {
        alert("Account has been disabled")
      }
      if (errorCode == 'auth/invalid-email') {
        alert("Invalid Email") 
      }
      console.log(error);
  });
});

btnSignup.addEventListener('click', e=> {
    const email = txtEmail.value;
    const pass = txtPassword.value;

    if (pass.length > 4) {
      alert("User Created")
      firebase.auth().createUserWithEmailAndPassword(email, pass)
    } else {
      alert("Password to Short!")
    }
    firebase.auth().createUserWithEmailAndPassword(email, pass).catch(e => {
      switch (e.code) {
        case 'auth/email-already-in-use':
          alert(`Email address already in use.`);
          break;
        case 'auth/invalid-email':
          alert(`Email address is invalid.`);
          break;
        case 'auth/operation-not-allowed':
          alert(`Error during sign up.`);
          break;
        case 'auth/weak-password':
          alert('Password is not strong enough. Add additional characters including special characters and numbers.');
          break;
      }
    });
  });

btnLogout.addEventListener('click', e => {
      //firebase.auth().signOut();
      firebase.auth().signOut().then(() => {
        alert("Signed Out")
      }).catch((error) => {
        console.log(e);
      });
      
  });

firebase.auth().onAuthStateChanged(user => {
      if (user) {

        //User logged in
          console.log(user);

          btnLogin.classList.add('hidden');
          btnSignup.classList.add('hidden');
        
          btnLogout.classList.remove('hidden');
          join.classList.remove('hidden');
          joinA.classList.remove('hidden');
          joinI.classList.remove('hidden');
          
        } else {
          console.log("Not Logged In");

          btnLogin.classList.remove('hidden');
          btnSignup.classList.remove('hidden');

          btnLogout.classList.add('hidden');
          join.classList.add('hidden');
          joinA.classList.add('hidden');
          joinI.classList.add('hidden');
      }
});