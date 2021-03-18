// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyAMsKu6VYYxDgwcyRwfKIj3BlucGCzyijA",
//     authDomain: "cloud-website-306521.firebaseapp.com",
//     projectId: "cloud-website-306521",
//     storageBucket: "cloud-website-306521.appspot.com",
//     messagingSenderId: "130796106359",
//     appId: "1:130796106359:web:43bde9b7708bdeb6d24c72",
//     measurementId: "G-1KZE58BZTE"
//   };

// import firebase from 'firebase'
// require('firebase/auth')
  
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
  
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
  
    promise.catch(e => console.log(e.message));
  });

  btnSignup.addEventListener('click', e=> {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
  
    const promise = auth.createUserWithEmailAndPassword(email, pass);
  
    promise.catch(e => console.log(e.message));
  });

  btnLogout.addEventListener('click', e => {
      firebase.auth().signOut();
  })

  firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
          console.log(firebaseUser);
          btnLogout.classList.remove('btn-logout');
      } else {
          console.log("Not Logged In");
          btnLogout.classList.add('btn-logout');
      }

  });
  