const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");
const btnLogin = document.getElementById("btnLogin");
const btnLogout = document.getElementById("btnLogout");
const btnSignup = document.getElementById("btnSignup");
  
btnLogin.addEventListener("click", e => {

    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
  
    const promise = auth.signInWithEmailAndPassword(email, pass);
    alert("Logged In!");
  
    promise.catch(e => console.log(e.message));
  });

btnSignup.addEventListener('click', e=> {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
  
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    alert("User Created!")
  
    promise.catch(e => console.log(e.message));
  });

btnLogout.addEventListener('click', e => {
      firebase.auth().signOut();
  })

// firebase.auth().onAuthStateChanged(firebaseUser => {
//       if (firebaseUser) {
//           console.log(firebaseUser);
//           btnLogout.classList.remove('btn-logout');
//       } else {
//           console.log("Not Logged In");
//           btnLogout.classList.add('btn-logout');
//       }

// });

  