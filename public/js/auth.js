// Group Project 2021 UG6

// The code in this file is based off the documentation at https://firebase.google.com/docs/auth/web/password-auth
// All code in this file was created for Cloud Computing.

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
  

//When the user logins in certain checks are completed to verify the user.
btnLogin.addEventListener("click", e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
  
    promise = firebase.auth().signInWithEmailAndPassword(email, pass)
    //alert("Logged In!");
  
    //Checks are listed below, if no errors occur user successfully logs in.
    promise.catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong/No password.');
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

//Similar with previous features, if the user signs up, certain checks are executed.
btnSignup.addEventListener('click', e=> {
    const email = txtEmail.value;
    const pass = txtPassword.value;

  
    firebase.auth().createUserWithEmailAndPassword(email, pass)
  
    //If the user does not enter one of the listed errors then the account is created.
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

  //If the user is signed in, the user logs out. The button is hidden if not signed in.
btnLogout.addEventListener('click', e => {
      //firebase.auth().signOut();
      firebase.auth().signOut().then(() => {
        alert("Signed Out")
      }).catch((error) => {
        console.log(e);
      });
      
  });

//When the authentication state changed the certain actions are executed. Certain tabs are hidden or shown, as can be seen below.
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