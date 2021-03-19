const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");
const btnLogin = document.getElementById("btnLogin");
const btnLogout = document.getElementById("btnLogout");
const btnSignup = document.getElementById("btnSignup");
const join = document.getElementById("join");
const joinA = document.getElementById("joinAbout");
const joinI = document.getElementById("joinIndex");
  
btnLogin.addEventListener("click", e => {

    const email = txtEmail.value;
    const pass = txtPassword.value;
  
    promise = firebase.auth().signInWithEmailAndPassword(email, pass)
    alert("Logged In!");
  
    promise.catch(e => console.log(e.message));
  });

btnSignup.addEventListener('click', e=> {
    const email = txtEmail.value;
    const pass = txtPassword.value;
  
    const promise = firebase.auth().createUserWithEmailAndPassword(email, pass);
    //firebase.auth().createUserWithEmailAndPassword(email, password)
    alert("User Created!")
  
    promise.catch(e => console.log(e.message));
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
          console.log(user);
          btnLogout.classList.remove('hidden');
          //window.location.href = "join.html";
          join.classList.remove('hidden');
          joinA.classList.remove('hidden');
          joinI.classList.remove('hidden');

      } else {
          console.log("Not Logged In");
          btnLogout.classList.add('hidden');
          join.classList.add('hidden');
          joinA.classList.add('hidden');
          joinI.classList.add('hidden');

      }

});

  